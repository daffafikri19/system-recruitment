"use client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit2Icon, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { keterampilanUser } from "@prisma/client"
import { EditForm } from "./editForm"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { deleteKeterampilan } from "@/actions/mutations/keterampilan/deleteKeterampilan"
import { toast } from "@/components/ui/use-toast"


interface tableDataProps {
    contentData: keterampilanUser[]
}

export const TableData = ({ contentData }: tableDataProps) => {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openValidationDialog, setOpenValidationDialog] = useState(false);

    const [editData, setEditData] = useState<keterampilanUser>({
        id: "",
        nama_keterampilan: "",
        tipe_keterampilan: "",
        keterangan: "",
        createdAt: "",
        updatedAt: ""
    })

    const handleEditData = (data: keterampilanUser) => {
        setOpenEditDialog(true);
        setEditData(data)
    }

    return (
        <div>
            <div>
                <Table>
                    {contentData.length <= 0 && (
                        <TableCaption className="mb-5">Tidak ada data yang ditampilkan</TableCaption>
                    )}
                    <TableHeader className='bg-primary w-full '>
                        <TableRow className='!text-white text-center truncate'>
                            <TableHead className='!text-white text-center'>No</TableHead>
                            <TableHead className='!text-white'>Nama Keterampilan</TableHead>
                            <TableHead className='!text-white'>Tipe Keterampilan</TableHead>
                            <TableHead className='!text-white'>Keterangan</TableHead>
                            <TableHead className="!text-white text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contentData.map((data, index: number) => (
                            <TableRow key={data.id}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell>{data.nama_keterampilan}</TableCell>
                                <TableCell>{data.tipe_keterampilan}</TableCell>
                                <TableCell>{data.keterangan}</TableCell>
                                <TableCell className="text-center">
                                    <div className='flex items-center justify-center space-x-2'>
                                        <Edit2Icon className='w-4 h-4 cursor-pointer'
                                            onClick={() => handleEditData(data)}
                                        />
                                        <AlertDialog open={openValidationDialog} onOpenChange={setOpenValidationDialog}>
                                            <AlertDialogTrigger>
                                                <Trash2Icon className='w-4 h-4 cursor-pointer' />
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Apakah anda yakin menghapus data ini ?
                                                    </AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                    <AlertDialogAction className="text-white" onClick={() => {
                                                        deleteKeterampilan(data.id).then(response => {
                                                            toast({
                                                                title: response.message,
                                                                variant: response.status === 200 ? "default" : "destructive"
                                                            })
                                                        })
                                                    }}>Hapus</AlertDialogAction>
                                                </div>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <EditForm selectedData={editData} openDialog={openEditDialog} setOpenDialog={setOpenEditDialog} />


        </div>
    )
}