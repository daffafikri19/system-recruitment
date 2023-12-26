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
            <div>
                <h1 className="text-base md:text-xl font-semibold py-2 text-center">Kemampuan Bahasa</h1>
                <Table>
                    <TableHeader className='bg-primary w-full '>
                        <TableRow className='!text-white text-center truncate'>
                            <TableHead className='!text-white text-center'>No</TableHead>
                            <TableHead className='!text-white'>Bahasa</TableHead>
                            <TableHead className='!text-white'>Lisan</TableHead>
                            <TableHead className='!text-white'>Tulisan</TableHead>
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
                                        <Edit2Icon className='w-4 h-4 cursor-pointer' />
                                        <Trash2Icon className='w-4 h-4 cursor-pointer' />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div>
                <h1 className="text-base md:text-xl font-semibold py-2 text-center">Kemampuan Perangkat Lunak</h1>
                <Table>
                    <TableHeader className='bg-primary w-full '>
                        <TableRow className='!text-white text-center truncate'>
                            <TableHead className='!text-white text-center'>No</TableHead>
                            <TableHead className='!text-white'>Nama Program</TableHead>
                            <TableHead className='!text-white'>Kemampuan</TableHead>
                            <TableHead className='!text-white'>Keterangan</TableHead>
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
                                        <Edit2Icon className='w-4 h-4 cursor-pointer' />
                                        <Trash2Icon className='w-4 h-4 cursor-pointer' />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}