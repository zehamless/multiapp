'use client'
import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

export default function TableRowCom({ item }: { item: UML }) {
    const router = useRouter();
    console.log(item)
    return (
        <TableRow onClick={() => router.push(`/uml/${item.id}`)} className="cursor-pointer">
            <TableCell>
                {new Intl.DateTimeFormat('id-ID', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).format(new Date(item.updated_at))}
            </TableCell>
            <TableCell>{item.title}</TableCell>
        </TableRow>
    )
}