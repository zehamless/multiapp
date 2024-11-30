import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {getUML} from "@/lib/actions/uml-actions";
import TableRowCom from "@/components/table-row";

export default async function Page() {
    const data = await getUML();
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
                    {data.map((item, index) => (
                        <TableRowCom key={index} item={item}/>
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}