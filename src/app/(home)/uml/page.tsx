'use client'
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import Mermaid from "@/components/mermaid-chart";
import {Textarea} from "@/components/ui/textarea";
import React, {useCallback, useState} from "react";


export default function Page() {
    const mermaidCharta = `
    graph LR
      A[Start] --> B[mid]
      B --> C[End]
  `;
    const [mermaidChart, setMermaidChart] = useState(mermaidCharta)
    const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMermaidChart(e.target.value)
    }

    return (
        <section className="relative flex h-full bg-gray-100 gap-4">
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                        <Textarea className="bg-white h-full" placeholder="type" onChange={onTextareaChange} value={mermaidChart}/>
                    </div>
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={25}>
                            <div className="flex h-full items-center justify-center p-6">
                                <Mermaid chart={mermaidChart}/>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle/>
                        <ResizablePanel defaultSize={75}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Three</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </section>
    )
}