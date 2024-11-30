import React, {useEffect, useRef, useCallback, useState} from "react";
import mermaid from "mermaid";
import {toPng} from "html-to-image";
import {Button} from "@/components/ui/button";

interface MermaidProps {
    chart: string;
    className?: string;
    onRenderSuccess?: (svg: string) => void;
    onRenderError?: (error: Error) => void;
    delay?: number;
}

const generateUniqueId = () => `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const Mermaid: React.FC<MermaidProps> = ({
                                             chart,
                                             className = "",
                                             onRenderSuccess,
                                             onRenderError,
                                             delay = 1000
                                         }) => {
    const mermaidRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const renderChart = useCallback(async () => {
        if (!mermaidRef.current) return;

        try {
            mermaid.initialize({suppressErrorRendering: true});
            mermaidRef.current.innerHTML = '';
            const uniqueId = generateUniqueId();
            const {svg} = await mermaid.render(uniqueId, chart);
            onRenderSuccess?.(svg);
            mermaidRef.current.innerHTML = svg;
        } catch (error) {
            console.warn('Mermaid syntax warning');
            if (mermaidRef.current) {
                mermaidRef.current.innerHTML = chart;
            }
            onRenderError?.(error instanceof Error ? error : new Error(String(error)));
        }
    }, [chart, onRenderSuccess, onRenderError]);

    useEffect(() => {
        if (!isClient) return;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            renderChart();
        }, delay);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [renderChart, isClient, delay]);

    const exportToPng = async () => {
        if (!mermaidRef.current) return;
        try {
            const dataUrl = await toPng(mermaidRef.current, {quality: 1, pixelRatio: 2});
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'mermaid-chart.png';
            link.click();
        } catch (error) {
            console.error('Failed to export chart to PNG', error);
        }
    };

    if (!isClient) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Button variant="secondary" size="sm" onClick={exportToPng}>Export to PNG</Button>
            <pre
                className={`mermaid ${className}`}
                ref={mermaidRef}
                style={{background: 'transparent'}}
            >
        </pre>
        </>
    );
};

export default Mermaid;