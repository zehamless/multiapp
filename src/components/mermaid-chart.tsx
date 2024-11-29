'use client'
import React, { useEffect, useRef, useCallback, useState } from "react";
import mermaid from "mermaid";

interface MermaidProps {
    chart: string;
    className?: string;
    onRenderSuccess?: (svg: string) => void;
    onRenderError?: (error: Error) => void;
}

const generateUniqueId = () => `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const Mermaid: React.FC<MermaidProps> = ({ chart, className = "mermaid", onRenderSuccess, onRenderError }) => {
    const mermaidRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const renderChart = useCallback(async () => {
        if (!mermaidRef.current) return;

        try {
            mermaid.contentLoaded();
            mermaidRef.current.innerHTML = '';
            const uniqueId = generateUniqueId();
            const { svg } = await mermaid.render(uniqueId, chart);
            mermaidRef.current.innerHTML = svg;
            onRenderSuccess?.(svg);
        } catch (error) {
            const typedError = error instanceof Error ? error : new Error(String(error));
            console.error('Mermaid rendering failed:', typedError);
            mermaidRef.current.innerHTML = chart;
            onRenderError?.(typedError);
        }
    }, [chart, onRenderSuccess, onRenderError]);

    useEffect(() => {
        if (isClient) {
            renderChart();
        }
    }, [renderChart, isClient]);

    if (!isClient) {
        return <div>Loading...</div>;
    }

    return (
        <pre ref={mermaidRef} className={className} style={{ background: 'transparent' }}>
            {chart}
        </pre>
    );
};

export default Mermaid;