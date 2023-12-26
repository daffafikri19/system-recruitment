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
import { CircleDashed, Edit2Icon, Eye, Plus, Search, Trash2Icon } from 'lucide-react';
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
import { useDataDiriStepContext } from '.';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { pengalamanKerja } from '@prisma/client';
import { Textarea } from '@/components/ui/textarea';
import { revalidatePath } from 'next/cache';


const Step4 = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const { username, sessionUserId, setSubmittedStep3 } = useDataDiriStepContext();
    const [loading, setLoading] = useState(false);

    const [formdata, setFormdata] = useState<pengalamanKerja>({
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

    const [dataPekerjaan, setDataPekerjaan] = useState<pengalamanKerja[]>([])

    const getCurrentUser = async () => {
        try {
            const user = await axios.post('/api/biodata/get', {
                id: sessionUserId
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            console.log(user.data.biodata[0].status_pernikahan)

        } catch (error: any) {
            toast({
                title: error.message,
                description: error.response.data.message,
                variant: 'destructive'
            })
        }
    }

    const getData = async () => {
        try {
            const response = await axios.post('/api/pekerjaan/get', {
                username: username
            });
            console.log(response);
            setDataPekerjaan(response.data)
        } catch (error: any) {
            if (error) {
                toast({
                    title: error.message,
                    description: error.response.data.message,
                    variant: 'destructive'
                })
            }
        }
    }

    useEffect(() => {
        getData();
        getCurrentUser();
    }, [openDialog]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/pekerjaan/create', {
                username: username,
                nama_perusahaan: formdata.nama_perusahaan,
                posisi: formdata.posisi,
                gaji: formdata.gaji,
                awal_masuk: formdata.awal_masuk,
                keluar: formdata.keluar,
                uraian_pekerjaan: formdata.uraian_pekerjaan,
                alasan_pindah: formdata.alasan_pindah
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setOpenDialog(false);
            setSubmittedStep3(false);
            toast({
                title: "Berhasil menambahkan data pekerjaan"
            });
            revalidatePath('/dashboard/biodata')
        } catch (error: any) {
            if (error) {
                toast({
                    title: error.message,
                    description: error.response.data.message,
                    variant: 'destructive'
                })
            }
        }
    }


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
                            <DialogTitle>Tambah Data Pekerjaan</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                            <div className='mt-5'>
                                <div className='w-full'>
                                    <Label>Nama Perusahaan</Label>
                                    <Input required type='text' value={formdata.nama_perusahaan}
                                        onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                nama_perusahaan: e.target.value
                                            }))
                                        }} />
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <Label>Posisi</Label>
                                        <Input required type='text' value={formdata.posisi} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                posisi: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <div>
                                        <Label>Gaji</Label>
                                        <Select required value={formdata.gaji}
                                            onValueChange={(e) => {
                                                setFormdata((prev) => ({
                                                    ...prev,
                                                    gaji: e
                                                }))
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="pilih" />
                                            </SelectTrigger>
                                            <SelectContent className='text-left'>
                                                <SelectItem className='text-left' value="< 1.000.000">{"<"} 1.000.000</SelectItem>
                                                <SelectItem className='text-left' value="1.000.000 - 3.000.000">1.000.000 - 3.000.000</SelectItem>
                                                <SelectItem className='text-left' value="3.000.000 - 5.000.000">3.000.000 - 5.000.000</SelectItem>
                                                <SelectItem className='text-left' value="5.000.000 - 7.000.000">5.000.000 - 7.000.000</SelectItem>
                                                <SelectItem className='text-left' value="7.000.000 - 10.000.000">7.000.000 - 10.000.000</SelectItem>
                                                <SelectItem className='text-left' value="> 10.000.000">{">"} 10.000.000</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Tahun Awal Masuk</Label>
                                        <Input required type='number' value={formdata.awal_masuk} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                awal_masuk: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <div>
                                        <Label>Tahun Keluar Kerja</Label>
                                        <Input required type='number' value={formdata.keluar} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                keluar: e.target.value
                                            }))
                                        }} />
                                    </div>


                                </div>

                                <div>
                                    <Label>Detail Pekerjaan</Label>
                                    <Textarea value={formdata.uraian_pekerjaan} onChange={(e) => {
                                        setFormdata((prev) => ({
                                            ...prev,
                                            uraian_pekerjaan: e.target.value
                                        }))
                                    }} />
                                </div>

                                <div>
                                    <Label>Alasan Pindah / Keluar</Label>
                                    <Textarea value={formdata.alasan_pindah} onChange={(e) => {
                                        setFormdata((prev) => ({
                                            ...prev,
                                            alasan_pindah: e.target.value
                                        }))
                                    }} />
                                </div>

                            </div>

                            <DialogFooter className='mt-5'>
                                <Button disabled={loading} type='submit' className='text-white'>
                                    {loading ? (
                                        <CircleDashed className='animate-spin text-white w-4 h-4' />
                                    ) : "Simpan"}
                                </Button>
                            </DialogFooter>
                        </form>


                    </DialogContent>
                </Dialog>
            </>

            <div className='my-4 w-full flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    <Input className='w-[200px]' type='search' />
                    <Button size="icon" className='text-white'><Search className='w-4 h-4' /></Button>
                </div>
            </div>

            <Card>
                <CardContent className='p-0'>
                    <Table>
                        <TableHeader className='bg-primary w-full '>
                            <TableRow className='!text-white truncate'>
                                <TableHead className='!text-white'>No</TableHead>
                                <TableHead className='!text-white'>Nama Perusahaan</TableHead>
                                <TableHead className='!text-white'>Posisi</TableHead>
                                <TableHead className='!text-white'>Gaji</TableHead>
                                <TableHead className='!text-white'>Lama Bekerja</TableHead>
                                <TableHead className='!text-white'>Detail Pekerjaan</TableHead>
                                <TableHead className='!text-white'>Alasan Pindah / Keluar</TableHead>
                                <TableHead className="text-center !text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataPekerjaan.map((data, index: number) => (
                                <TableRow key={data.id} className='truncate'>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data.nama_perusahaan}</TableCell>
                                    <TableCell>{data.posisi}</TableCell>
                                    <TableCell>{data.gaji}</TableCell>
                                    <TableCell>{data.awal_masuk} - {data.keluar}</TableCell>
                                    <TableCell>{data.uraian_pekerjaan}</TableCell>
                                    <TableCell>{data.alasan_pindah}</TableCell>
                                    <TableCell className="text-center">
                                        <div className='flex items-center justify-center space-x-2'>
                                            <Eye size="icon" className='w-4 h-4 cursor-pointer' />
                                            <Edit2Icon size="icon" className='w-4 h-4 cursor-pointer' />
                                            <Trash2Icon className='w-4 h-4 cursor-pointer' />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>
    )
}

export default Step4