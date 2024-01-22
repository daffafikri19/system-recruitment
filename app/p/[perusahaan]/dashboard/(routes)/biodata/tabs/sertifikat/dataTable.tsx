"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PengalamanKerjaProps, SerfitikatUserProps } from "@/types"
import { Edit2Icon, Eye, Trash2Icon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


interface tableDataProps {
    contentData: SerfitikatUserProps[]
}

export const TableData = ({ contentData }: tableDataProps) => {
    const [openDetail, setOpenDetail] = useState(false);
    const [detailContent, setDetailContent] = useState<SerfitikatUserProps>({
        id: "",
        nama_sertifikat: "",
        jenis_sertifikat: "",
        nama_org: "",
        negara_terbit: "",
        no_sertifikat: "",
        tanggal_exp: "",
        tanggal_terbit: "",
        createdAt: "",
        updatedAt: ""
    });

    const getDetailContent = (value: any) => {
        console.log(value)
        setOpenDetail(true)
        setDetailContent(value)
    }

    return (
        <div>
            <Table>
                <TableHeader className='bg-primary w-full '>
                    <TableRow className='!text-white text-center truncate'>
                        <TableHead className='!text-white text-center'>No</TableHead>
                        <TableHead className='!text-white'>Nama Sertifikat</TableHead>
                        <TableHead className='!text-white'>Jenis Sertifikat</TableHead>
                        <TableHead className='!text-white'>Nama Instansi / Lembaga</TableHead>
                        <TableHead className="!text-white text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contentData.map((data, index: number) => (
                        <TableRow key={data.id}>
                            <TableCell className="text-center">{index + 1}</TableCell>
                            <TableCell>{data.nama_sertifikat}</TableCell>
                            <TableCell>{data.jenis_sertifikat}</TableCell>
                            <TableCell>{data.nama_org}</TableCell>
                            <TableCell className="text-center">
                                <div className='flex items-center justify-center space-x-2'>
                                    <Button className="w-7 h-7" variant="outline">
                                        <Eye className="w-4 h-4 cursor-pointer"
                                            onClick={() => getDetailContent(data)} />
                                    </Button>
                                    <Button className="w-7 h-7" variant="outline">
                                        <Edit2Icon className='w-4 h-4 cursor-pointer' />
                                    </Button>
                                    <Button className="w-7 h-7" variant="outline">
                                        <Trash2Icon className='w-4 h-4 cursor-pointer' />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openDetail} onOpenChange={setOpenDetail}>
                <DialogContent className="w-fit mr-8">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Detail</h4>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="nama_sertifikat">Nama Sertifikat</Label>
                                <Input value={detailContent.nama_sertifikat} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="jenis_sertifikat">Jenis Sertifikat</Label>
                                <Input value={detailContent.jenis_sertifikat} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="nama_org">Nama Instansi / Lembaga</Label>
                                <Input value={detailContent.nama_org} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="no_sertifikat">No. Sertifikat</Label>
                                <Input value={detailContent.no_sertifikat} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="negara_terbit">Negara Penerbit</Label>
                                <Input value={detailContent.negara_terbit} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="tanggal_terbit">Tanggal Terbit</Label>
                                <Input value={detailContent.tanggal_terbit} className="col-span-2 h-8" readOnly />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="tanggal_exp">Tanggal Expired</Label>
                                <Input value={detailContent.tanggal_exp} className="col-span-2 h-8" readOnly />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}