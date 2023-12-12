"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Edit2Icon, Eye, Plus, Search, Trash2Icon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';


const Step2 = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isLuarNegeri, setIsLuarNegeri] = useState("");
    const [openComponent, setOpenComponent] = useState(false);

    useEffect(() => {
        if (isLuarNegeri === "Tidak") {

        } else {
            setOpenComponent(true)
        }

    }, [isLuarNegeri, openComponent])

    return (
        <div className='w-full mb-20'>

            <div className='my-5 w-full flex items-center justify-end'>
                <Button onClick={() => setOpenDialog(!openDialog)}
                    className='flex items-center text-white' variant="default">Tambah Data <Plus className='w-4 h-4 ml-4' />
                </Button>
            </div>

            <>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Tambah Data Pendidikan</DialogTitle>
                        </DialogHeader>

                        <div className='mt-5'>
                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <Label>Dalam / Luar Negeri ?</Label>
                                    <Select required onValueChange={(e) => {
                                        console.log(e)
                                        setIsLuarNegeri(e)
                                    }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Luar Negeri">Luar Negeri</SelectItem>
                                            <SelectItem value="Dalam Negeri">Dalam Negeri</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Pendidikan Terakhir</Label>
                                    <Select required>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SMK">SMK</SelectItem>
                                            <SelectItem value="SMA">SMA</SelectItem>
                                            <SelectItem value="D1">Diploma 1</SelectItem>
                                            <SelectItem value="D2">Diploma 2</SelectItem>
                                            <SelectItem value="D3">Diploma 3</SelectItem>
                                            <SelectItem value="S1">Sarjana 1</SelectItem>
                                            <SelectItem value="S2">Sarjana 2</SelectItem>
                                            <SelectItem value="S3">Sarjana 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Provinsi Sekolah</Label>
                                    <Select required>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ya">Ya</SelectItem>
                                            <SelectItem value="Tidak">Tidak</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Kota Sekolah</Label>
                                    <Select required>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ya">Ya</SelectItem>
                                            <SelectItem value="Tidak">Tidak</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Nama Jurusan</Label>
                                    <Input type='text' placeholder='nama jurusan' />
                                </div>
                                <div>
                                    <Label>Tahun Lulus</Label>
                                    <Input type='number' placeholder='tahun lulus' />
                                </div>

                                <div>
                                    <Label>No Ijazah</Label>
                                    <Input required type='text' placeholder='no ijazah' />
                                </div>

                                <div>
                                    <Label>Tanggal Terbit</Label>
                                    <Input type='date' placeholder='tanggal terbit' />
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button className='text-white'>Simpan</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>

            <div className='my-4 w-full flex items-center justify-end space-x-3'>
                <Input className='w-[200px]' type='search' placeholder='' />
                <Button size="icon" className='text-white'><Search className='w-4 h-4' /></Button>
            </div>

            <Card>
                <CardContent className='p-0'>
                    <Table>
                        <TableHeader className='bg-primary w-full '>
                            <TableRow className='!text-white'>
                                <TableHead className='!text-white'>No</TableHead>
                                <TableHead className='!text-white'>Jenjang Pendidikan</TableHead>
                                <TableHead className='!text-white'>Nama Institusi</TableHead>
                                <TableHead className='!text-white'>Nama Jurusan</TableHead>
                                <TableHead className='!text-white'>Tahun Lulus</TableHead>
                                <TableHead className="text-center !text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>graduate s2</TableCell>
                                <TableCell>universitas pamulang</TableCell>
                                <TableCell>teknik informatika</TableCell>
                                <TableCell>2022</TableCell>
                                <TableCell className="text-center">
                                    <div className='flex items-center justify-center space-x-2'>
                                        <Eye size="icon" className='w-4 h-4 cursor-pointer' />
                                        <Edit2Icon size="icon" className='w-4 h-4 cursor-pointer' />
                                        <Trash2Icon className='w-4 h-4 cursor-pointer' />
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>
    )
}

export default Step2