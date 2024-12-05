'use client'
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {addUML, getUML} from "@/lib/actions/uml-actions";
import TableRowCom from "@/components/table-row";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export default function Page() {
    const [data, setData] = useState<UML[]>([]);
    const [title, setTitle] = useState('');
    useEffect(() => {
        (async () => {
            const fetchedUML = await getUML();
            setData(fetchedUML);
        })();
    }, []);
    const handleAdd = async () => {
        if (title) {
            await addUML(title);
            setData([...await getUML()]);
            setTitle('');
        }
    }

    return (
        <section className="p-5">
            <div className="flex gap-4">
                <Input id="title" className="w-1/4" onChange={(e) => setTitle(e.target.value)}/>
                <Button className="shadow-amber-400" onClick={handleAdd}>Add</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Last Edited</TableHead>
                        <TableHead>Title</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item: UML, index: number) => (
                        <TableRowCom key={index} item={item}/>
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}