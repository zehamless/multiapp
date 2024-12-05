"use client"

import React, {useEffect, useRef, useState} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {PlusIcon} from 'lucide-react'
import mermaid from "mermaid";

export function UMLTreeDemo() {
    const umlText = '---\n' +
        'title: Order example\n' +
        '---\n' +
        'erDiagram\n' +
        '    CUSTOMER ||--o{ ORDER : places\n' +
        '    ORDER ||--|{ LINE-ITEM : contains\n' +
        '    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses'
    const mermaidRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        async function renderMermaid() {
            mermaid.initialize({suppressErrorRendering: true});
            const {svg} = await mermaid.render('mermaid', umlText);
            if (mermaidRef.current) {
                mermaidRef.current.innerHTML = svg;
            }
        }
        renderMermaid();
    }, []);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Text-based UML</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2">
                <pre
                    className="whitespace-pre-wrap break-words text-sm font-mono bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
          {umlText}
        </pre>
                <pre className='mermaid'
                ref={mermaidRef}
                style={{background: 'transparent'}}>

                </pre>
            </CardContent>
        </Card>
    )
}

