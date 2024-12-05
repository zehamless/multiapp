'use client'
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {getUML} from "@/lib/actions/uml-actions";
import TableRowCom from "@/components/table-row";
import {useEffect, useState} from "react";

export default function Page() {
    const [data, setData] = useState<UML[]>([]);

    useEffect(() => {
        (async () => {
            const fetchedUML = await getUML();
            setData(fetchedUML);
        })();
    }, []);
    return (
        <section className="p-5">
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