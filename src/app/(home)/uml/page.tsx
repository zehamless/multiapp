'use client'
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import Mermaid from "@/components/mermaid-chart";
import React, {useState} from "react";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {
    classchart,
    defaultchart,
    erdchart,
    flowchart,
    ganttchart,
    kanbanchart,
    mindmapchart,
    sequencechart,
    statechart,
    timechart,
    userjourneychart
} from "@/lib/chart-samples";
import {Button} from "@/components/ui/button";

export default function Page() {
    const allChartsWithNames = [
        {name: 'pie', chart: defaultchart},
        {name: 'sequence', chart: sequencechart},
        {name: 'flow', chart: flowchart},
        {name: 'class', chart: classchart},
        {name: 'state', chart: statechart},
        {name: 'erd', chart: erdchart},
        {name: 'userjourney', chart: userjourneychart},
        {name: 'mindmap', chart: mindmapchart},
        {name: 'gantt', chart: ganttchart},
        {name: 'time', chart: timechart},
        {name: 'kanban', chart: kanbanchart}
    ];

    const [mermaidChart, setMermaidChart] = useState(defaultchart)
    const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMermaidChart(e.target.value)
    }
    return (
        <section className="relative flex h-full gap-4">
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex items-center justify-center p-6">
                        {/*<Textarea className="bg-white h-full" placeholder="type" onChange={onTextareaChange} value={mermaidChart}/>*/}
                        <CodeMirror
                            value={mermaidChart}
                            className="w-full h-full"
                            minHeight="500px"
                            theme="dark"
                            basicSetup={{autocompletion: false}}
                            extensions={[javascript({jsx: true})]}
                            onChange={(value) => onTextareaChange({target: {value}} as React.ChangeEvent<HTMLTextAreaElement>)}
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
                                        <Button size={"sm"} key={name} onClick={() => setMermaidChart(chart)} className="m-2">
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
                                {/*<span className="font-semibold">Three</span>*/}
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </section>
    )
}