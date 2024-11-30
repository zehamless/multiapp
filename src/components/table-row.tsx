'use client'
import {TableCell, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";

export default function TableRowCom({item}){
    const router = useRouter();
    return(
        <TableRow onClick={() => router.push(`/uml/${item.id}`)} className="cursor-pointer">
            <TableCell>
                {new Intl.DateTimeFormat('id-id', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).format(item.lastEdited)}
            </TableCell>
            <TableCell>{item.title}</TableCell>
        </TableRow>
    )
}