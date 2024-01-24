"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PengalamanKerjaProps } from "@/types"
import { Edit2Icon, Eye, Search, Trash2Icon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { EditForm } from "./editForm"
import { revalidatePath } from "next/cache"
import { deletePengalamanKerja } from "@/actions/mutations/pengalaman-kerja/deletePengalamanKerja"
import { toast } from "@/components/ui/use-toast"


interface tableDataProps {
    contentData: PengalamanKerjaProps[]
}

export const TableData = ({ contentData }: tableDataProps) => {
    const [openDetail, setOpenDetail] = useState(false);

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [detailData, setDetailData] = useState<PengalamanKerjaProps>({
        id: "",
        nama_perusahaan: "",
        posisi: "",
        gaji: "",
        awal_masuk: "",
        keluar: "",
        uraian_pekerjaan: "",
        alasan_pindah: "",
        createdAt: "",
        updatedAt: ""
    });

    const [editData, setEditData] = useState<PengalamanKerjaProps>({
        id: "",
        nama_perusahaan: "",
        posisi: "",
        gaji: "",
        awal_masuk: "",
        keluar: "",
        uraian_pekerjaan: "",
        alasan_pindah: "",
        createdAt: "",
        updatedAt: ""
    });

    const openDetailModal = (data: PengalamanKerjaProps) => {
        setOpenDetail(true);
        console.log("Data", data)
        setDetailData(data)
    }

    const handleSelectedData = (data: PengalamanKerjaProps) => {
        setEditData(data)
        setOpenEditDialog(true);
    };

    const [openValidation, setOpenValidation] = useState(false);

    return (
        <>
            <Table>
                {contentData.length <= 0 && (
                    <TableCaption className="mb-5">Tidak ada data yang ditampilkan</TableCaption>
                )}
                <TableHeader className='bg-primary w-full '>
                    <TableRow className='!text-white text-center truncate'>
                        <TableHead className='!text-white text-center'>No</TableHead>
                        <TableHead className='!text-white'>Nama Perusahaan</TableHead>
                        <TableHead className='!text-white'>Posisi</TableHead>
                        <TableHead className='!text-white'>Range Gaji</TableHead>
                        <TableHead className='!text-white text-center'>Durasi Bekerja</TableHead>
                        <TableHead className="!text-white text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contentData.map((data, index: number) => (
                        <TableRow key={data.id}>
                            <TableCell className="text-center">{index + 1}</TableCell>
                            <TableCell>{data.nama_perusahaan}</TableCell>
                            <TableCell>{data.posisi}</TableCell>
                            <TableCell>{data.gaji}</TableCell>
                            <TableCell className="text-center">{data.awal_masuk} - {data.keluar}</TableCell>

                            <TableCell className="text-center">
                                <div className='flex items-center justify-center space-x-2'>
                                    <Eye className='w-4 h-4 cursor-pointer' onClick={() => openDetailModal(data)} />
                                    <Edit2Icon className='w-4 h-4 cursor-pointer' onClick={() => handleSelectedData(data)} />
                                    <AlertDialog open={openValidation} onOpenChange={setOpenValidation}>
                                        <AlertDialogTrigger>
                                            <Trash2Icon className='w-4 h-4 cursor-pointer' />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Apakah anda yakin menghapus data ini ?</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <div className="grid grid-cols-2 gap-2">
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction className="text-white" onClick={() => {
                                                    deletePengalamanKerja(data.id).then(response => {
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

            <EditForm selectedData={editData} openDialog={openEditDialog} setOpenDialog={setOpenEditDialog} />

            <Dialog open={openDetail} onOpenChange={setOpenDetail}>
                <DialogContent className="w-full min-w-75 max-h-full overflow-y-scroll">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Detail</h4>
                        </div>
                        <div className="grid gap-2" key={detailData.id}>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Nama Perusahaan</Label>
                                <Input value={detailData.nama_perusahaan} className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Posisi</Label>
                                <Input value={detailData.posisi} className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Range Gaji</Label>
                                <Input value={detailData.gaji} className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Awal Bekerja</Label>
                                <Input value={detailData.awal_masuk} className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Terakhir Bekerja</Label>
                                <Input value={detailData.keluar} className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Alasan Pindah</Label>
                                <Textarea value={detailData.alasan_pindah} className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Uraian Pekerjaan</Label>
                                <Textarea value={detailData.uraian_pekerjaan} className="col-span-2 h-8" />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}