"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PendidikanUserProps, PengalamanKerjaProps } from "@/types"
import { Edit2Icon, Eye, Search, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { EditPendidikanModal } from "./editPendidikanModal"
import { deletePendidikan } from "@/actions/mutations/pendidikan/deletePendidikan"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { revalidatePath } from "next/cache"

interface dataTableProps {
    contentData: PendidikanUserProps[]
}

export const DataTable = ({ contentData }: dataTableProps) => {

    const [selectedData, setSelectedData] = useState<PendidikanUserProps>({
        id: "",
        luar_negeri: "",
        tipe_pendidikan: "",
        pendidikan_terakhir: "",
        provinsi: "",
        kota: "",
        nama_institusi: "",
        nama_jurusan: "",
        no_ijazah: "",
        tgl_terbit: "",
        tahun_masuk: "",
        tahun_lulus: "",
        ipk: "",
        createdAt: "",
        updatedAt: "",
        biodata: []
    });

    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleSelectedData = (data: PendidikanUserProps) => {
        setSelectedData(data);
        setOpenEditDialog(true);
    };

    const [openValidation, setOpenValidation] = useState(false);
   
    return (
        <>
            <Table>
                <TableHeader className='bg-primary w-full '>
                    <TableRow className='!text-white text-center truncate'>
                        <TableHead className='!text-white'>No</TableHead>
                        <TableHead className='!text-white'>Jenjang Pendidikan</TableHead>
                        <TableHead className='!text-white'>Nama Institusi</TableHead>
                        <TableHead className='!text-white'>Nama Jurusan</TableHead>
                        <TableHead className='!text-white'>Tahun Lulus</TableHead>
                        <TableHead className="text-center !text-white">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contentData.map((data, index: number) => (
                        <TableRow key={data.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{data.pendidikan_terakhir}</TableCell>
                            <TableCell>{data.nama_institusi}</TableCell>
                            <TableCell>{data.nama_jurusan}</TableCell>
                            <TableCell className='text-center text-sm truncate'>{data.tahun_masuk} - {data.tahun_lulus}</TableCell>

                            <TableCell className="text-center">
                                <div className='flex items-center justify-center space-x-2'>
                                    <Eye className='w-4 h-4 cursor-pointer' />
                                    <Edit2Icon className="w-4 h-4 cursor-pointer" onClick={() => handleSelectedData(data)} />
                                    <AlertDialog open={openValidation} onOpenChange={setOpenValidation}>
                                        <AlertDialogTrigger>
                                            <Trash2Icon className='w-4 h-4 cursor-pointer' />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Apakah anda yakin menghapus data ini ?</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <div className="grid grid-cols-2">
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction className="text-white" onClick={() => {
                                                    deletePendidikan(data.id).then(response => {
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

            {/* edit modal */}
            <EditPendidikanModal openDialog={openEditDialog} setOpenDialog={setOpenEditDialog} selectedData={selectedData} />
        </>
    )
}