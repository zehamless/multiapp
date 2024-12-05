'use client'
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
import EditorSection from "@/components/editor-section";
import { getUMLById } from "@/lib/actions/uml-actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {useParams} from "next/navigation";
interface UMLContent {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_id: number;
}
export default function Page() {
    const [content, setContent] = useState<UMLContent | undefined>(undefined);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (id) {
            (async () => {
                const res = await getUMLById(parseInt(id as string));
                // console.log(res)
                setContent(res);
            })();
        }
    }, [id]);
    const allChartsWithNames = [
        { name: 'pie', chart: defaultchart },
        { name: 'sequence', chart: sequencechart },
        { name: 'flow', chart: flowchart },
        { name: 'class', chart: classchart },
        { name: 'state', chart: statechart },
        { name: 'erd', chart: erdchart },
        { name: 'userjourney', chart: userjourneychart },
        { name: 'mindmap', chart: mindmapchart },
        { name: 'gantt', chart: ganttchart },
        { name: 'time', chart: timechart },
        { name: 'kanban', chart: kanbanchart }
    ];
    // console.log(content?.content)
    const initialChart = content?.content||'';
    // console.log(initialChart)
    return <EditorSection initialChart={initialChart} allChartsWithNames={allChartsWithNames} id={content?.id} />;
}