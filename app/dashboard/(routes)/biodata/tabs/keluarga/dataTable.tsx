"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataKeluargaProps } from "@/types"
import { useState } from "react"
import { EditForm } from "./editForm"
import { deleteKeluarga } from "@/actions/mutations/keluarga/deleteKeluarga"
import { toast } from "@/components/ui/use-toast"
import { ActionsButton } from "../../actions-button"

interface DataTableProps {
    contentData: DataKeluargaProps[]
}

export const DataTable = ({ contentData }: DataTableProps) => {
    const [openDetail, setOpenDetail] = useState(false);
    const [detailContent, setDetailContent] = useState<DataKeluargaProps>({
        id: "",
        hubungan: "",
        nama_lengkap: "",
        jenis_kelamin: "",
        no_nik: "",
        pekerjaan: "",
        no_kk: "",
        tanggal_lahir: "",
        pendidikan: "",
        tempat_lahir: "",
        createdAt: "",
        updatedAt: ""
    });

    const [editData, setEditData] = useState<DataKeluargaProps>({
        id: "",
        hubungan: "",
        nama_lengkap: "",
        jenis_kelamin: "",
        no_nik: "",
        pekerjaan: "",
        no_kk: "",
        tanggal_lahir: "",
        pendidikan: "",
        tempat_lahir: "",
        createdAt: "",
        updatedAt: ""
    })

    const getDetailContent = (data: any) => {
        setOpenDetail(true);
        setDetailContent(data)
    }

    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleEditData = (data: DataKeluargaProps) => {
        setOpenEditDialog(true);
        setEditData(data)
    }

    const [openValidation, setOpenValidation] = useState(false);

    return (
        <>
            <Table>
                {contentData.length <=0 && (
                    <TableCaption className="mb-5">Tidak ada data yang ditampilkan</TableCaption>
                )}
                <TableHeader className='bg-primary w-full'>
                    <TableRow className='!text-white truncate'>
                        <TableHead className='!text-white'>No</TableHead>
                        <TableHead className='!text-white'>Nama</TableHead>
                        <TableHead className='!text-white'>Hubungan</TableHead>
                        <TableHead className='!text-white'>Pendidikan</TableHead>
                        <TableHead className='!text-white'>Tipe Pekerjaan</TableHead>
                        <TableHead className="text-center !text-white">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contentData.map((data, index: number) => (
                        <TableRow key={data.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{data.nama_lengkap}</TableCell>
                            <TableCell>{data.hubungan}</TableCell>
                            <TableCell>{data.pendidikan}</TableCell>
                            <TableCell>{data.pekerjaan}</TableCell>
                            <TableCell className="text-center">
                                <ActionsButton 
                                    onPreview={() => getDetailContent(data)}
                                    onEdit={() => handleEditData(data)}
                                    openDialog={openValidation}
                                    onOpenDialog={setOpenValidation}
                                    alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                    alertLabelCancel="Batal"
                                    alertLabelAction="Hapus"
                                    onDelete={() => {
                                        deleteKeluarga(data.id).then(response => {
                                            toast({
                                                title: response.message,
                                                variant: response.status === 200 ? "default" : "destructive"
                                            })
                                        })
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <EditForm selectedData={editData} openDialog={openEditDialog} setOpenDialog={setOpenEditDialog} />

            <Dialog open={openDetail} onOpenChange={setOpenDetail}>
                <DialogContent className="w-fit mr-8">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Detail</h4>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Nama Lengkap</Label>
                                <Input value={detailContent.nama_lengkap} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Hubungan</Label>
                                <Input value={detailContent.hubungan} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Jenis Kelamin</Label>
                                <Input value={detailContent.jenis_kelamin} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Tanggal Lahir</Label>
                                <Input value={detailContent.tanggal_lahir} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Tempat Lahir</Label>
                                <Input value={detailContent.tempat_lahir} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Pekerjaan</Label>
                                <Input value={detailContent.pekerjaan} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Pendidikan</Label>
                                <Input value={detailContent.pendidikan} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>No KK</Label>
                                <Input value={detailContent.no_kk} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>No NIK</Label>
                                <Input value={detailContent.no_nik} className="col-span-2 h-8" readOnly />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}