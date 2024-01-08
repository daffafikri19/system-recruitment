import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { User, biodataUser } from "@prisma/client"
import { EyeIcon, SettingsIcon } from "lucide-react"

interface DataTableProps {
    listData: User[],
    listBio: biodataUser
}

export const DataTable = ({ listData, listBio }: DataTableProps) => {
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
                        <TableHead className="text-white">Biodata</TableHead>
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
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-7 h-7" size="icon" variant="outline">
                                                <EyeIcon className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>

                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    )
}