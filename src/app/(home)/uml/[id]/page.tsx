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
import {getUMLById} from "@/lib/actions/uml-actions";

export default async function Page({params}: { params: Promise<{id: string}> }) {
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
    const id = (await params).id
    const data = await  getUMLById(parseInt(id));
    const content = data?.content || '';
    return <EditorSection initialChart={content} allChartsWithNames={allChartsWithNames} />;
}
