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


const Step3 = () => {
    const [openDialog, setOpenDialog] = useState(false);

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
                            <div className='w-full'>
                                <Label>Nama Lengkap</Label>
                                <Input type='text' />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <Label>Hubungan</Label>
                                    <Select required>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ayah">Ayah</SelectItem>
                                            <SelectItem value="Ibu">Ibu</SelectItem>
                                            <SelectItem value="Kakak">Kakak</SelectItem>
                                            <SelectItem value="Adik">Adik</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>


                                <div>
                                    <Label>Jenis Kelamin</Label>
                                    <Select required>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Tempat Lahir</Label>
                                    <Input type='text' />
                                </div>
                                <div>
                                    <Label>Tanggal Lahir</Label>
                                    <Input type='date' />
                                </div>
                                <div>
                                    <Label>No Kartu Keluarga</Label>
                                    <Input type='number' />
                                </div>
                                <div>
                                    <Label>NIK</Label>
                                    <Input type='number' />
                                </div>
                                <div>
                                    <Label>Pekerjaan</Label>
                                    <Input type='text' />
                                </div>
                                <div>
                                    <Label>Pendidikan</Label>
                                    <Input type='text' />
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button className='text-white'>Simpan</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>

            <div className='my-4 w-full flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    <Label className='text-xl whitespace-nowrap'>No. KK</Label>
                    <Input className='text-xl' readOnly placeholder='98903397' />
                </div>
                <div className='flex items-center space-x-3'>
                    <Input className='w-[200px]' type='search' />
                    <Button size="icon" className='text-white'><Search className='w-4 h-4' /></Button>
                </div>
            </div>

            <Card>
                <CardContent className='p-0'>
                    <Table>
                        <TableHeader className='bg-primary w-full '>
                            <TableRow className='!text-white'>
                                <TableHead className='!text-white'>No</TableHead>
                                <TableHead className='!text-white'>Hubungan</TableHead>
                                <TableHead className='!text-white'>Nama Orang Tua</TableHead>
                                <TableHead className='!text-white'>Pendidikan Terakhir</TableHead>
                                <TableHead className='!text-white'>Tipe Pekerjaan</TableHead>
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

export default Step3