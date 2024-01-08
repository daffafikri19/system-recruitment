import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { User } from "@prisma/client"
import { SettingsIcon } from "lucide-react"

interface DataTableProps {
    listData: User[]
}

export const DataTable = ({ listData }: DataTableProps) => {
    return (
        <>
            <Table>
                {listData.length <= 0 && (
                    <TableCaption>Tidak ada data yang ditampilkan</TableCaption>
                )}
                <TableHeader className="bg-primary">
                    <TableRow>
                        <TableHead className="text-white text-center">No</TableHead>
                        {/* <TableHead className="text-white">Profile</TableHead> */}
                        <TableHead className="text-white">Nama</TableHead>
                        <TableHead className="text-white">Email</TableHead>
                        <TableHead className="text-white">Role</TableHead>
                        <TableHead className="text-white text-center">Settings</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listData.length > 0 && (
                        listData.map((data, index: number) => (
                            <TableRow key={data.id}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                {/* <TableCell>{data.foto_profile}</TableCell> */}
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.role}</TableCell>
                                <TableCell className="text-center">
                                    <Button className="w-7 h-7" size="icon" variant="outline">
                                        <SettingsIcon className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    )
}