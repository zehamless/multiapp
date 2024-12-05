'use client'
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import React, {useState, useEffect, useCallback} from "react";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {Button} from "@/components/ui/button";
import Mermaid from "@/components/mermaid-chart";
import {debounce} from "lodash";
import {updateUML} from "@/lib/actions/uml-actions";

interface EditorSectionProps {
  initialChart: string;
    id: number|undefined;
  allChartsWithNames: Array<{name: string, chart: string}>;
}

export default function EditorSection({ initialChart, allChartsWithNames , id}: EditorSectionProps) {
    const [mermaidChart, setMermaidChart] = useState(initialChart);

    useEffect(() => {
        setMermaidChart(initialChart);
    }, [initialChart]);


    const onTextareaChange = useCallback(debounce(async (value: string) => {
        setMermaidChart(value);
        await updateUML(id as number, {content: value});
    }, 1000), []);

    return (
        <section className="relative flex h-full gap-4">
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full border md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex flex-col items-center justify-center p-6">
                        {/*<Button>ss</Button>*/}
                        <CodeMirror
                            value={mermaidChart}
                            className="w-full h-full"
                            minHeight="500px"
                            theme="dark"
                            basicSetup={{autocompletion: false}}
                            extensions={[javascript({jsx: true})]}
                            onChange={(value) => onTextareaChange(value)}
                        />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={20}>
                            <div className="p-6 w-full">
                                <div className="items-center justify-center">
                                    <h1>Example</h1>
                                    {allChartsWithNames.map(({name, chart}) => (
                                        <Button size={"sm"} key={name} onClick={() => setMermaidChart(chart)}
                                                className="m-2">
                                            {name}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle/>
                        <ResizablePanel defaultSize={80}>
                            <div className=" h-full items-center justify-center p-6">
                                <Mermaid chart={mermaidChart} className="overflow-y-auto h-full w-full"/>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </section>
    )
}