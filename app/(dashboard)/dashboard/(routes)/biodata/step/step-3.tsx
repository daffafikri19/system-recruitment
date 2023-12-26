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
import { dataKeluarga } from '@prisma/client';


const Step3 = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const { username, sessionUserId, setSubmittedStep3 } = useDataDiriStepContext();
    const [isSudahMenikah, setIsSudahMenikah] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formdata, setFormdata] = useState<dataKeluarga>({
        id: "",
        hubungan: "",
        nama_lengkap: "",
        jenis_kelamin: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        no_nik: "",
        pekerjaan: "",
        pendidikan: "",
        createdAt: "",
        updatedAt: "",
        no_kk: "",
    });

    const [dataKeluarga, setDataKeluarga] = useState<dataKeluarga[]>([]);

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

            if (user.data.biodata[0].status_pernikahan === "Belum Menikah") {
                setIsSudahMenikah(false)
            } else {
                setIsSudahMenikah(true)
            }

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
            const response = await axios.post('/api/keluarga/get', {
                username: username
            });
            console.log(response);
            setDataKeluarga(response.data)
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
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/keluarga/create', {
                username: username,
                hubungan: formdata.hubungan,
                nama_lengkap: formdata.nama_lengkap,
                jenis_kelamin: formdata.jenis_kelamin,
                tempat_lahir: formdata.tempat_lahir,
                tanggal_lahir: formdata.tanggal_lahir,
                no_kk: formdata.no_kk,
                no_nik: formdata.no_nik,
                pekerjaan: formdata.pekerjaan,
                pendidikan: formdata.pendidikan
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setOpenDialog(false);
            setSubmittedStep3(false);
            toast({
                title: "Berhasil menambahkan data keluarga"
            });

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
                            <DialogTitle>Tambah Data Pendidikan</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                            <div className='mt-5'>
                                <div className='w-full'>
                                    <Label>Nama Lengkap</Label>
                                    <Input required type='text' value={formdata.nama_lengkap}
                                        onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                nama_lengkap: e.target.value
                                            }))
                                        }} />
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    {isSudahMenikah === true ? (
                                        <div>
                                            <Label>Hubungan</Label>
                                            <Select required value={formdata.hubungan}
                                                onValueChange={(e) => {
                                                    setFormdata((prev) => ({
                                                        ...prev,
                                                        hubungan: e
                                                    }))
                                                }}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="pilih" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Suami">Suami</SelectItem>
                                                    <SelectItem value="Istri">Istri</SelectItem>
                                                    <SelectItem value="Anak 1">Anak 1</SelectItem>
                                                    <SelectItem value="Anak 2">Anak 2</SelectItem>
                                                    <SelectItem value="Anak 3">Anak 3</SelectItem>
                                                    <SelectItem value="Anak 4">Anak 4</SelectItem>
                                                    <SelectItem value="Anak 5">Anak 5</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ) : (
                                        <div>
                                            <Label>Hubungan</Label>
                                            <Select required value={formdata.hubungan}
                                                onValueChange={(e) => {
                                                    setFormdata((prev) => ({
                                                        ...prev,
                                                        hubungan: e
                                                    }))
                                                }}>
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

                                    )}


                                    <div>
                                        <Label>Jenis Kelamin</Label>
                                        <Select required value={formdata.jenis_kelamin}
                                            onValueChange={(e) => {
                                                setFormdata((prev) => ({
                                                    ...prev,
                                                    jenis_kelamin: e
                                                }))
                                            }}>
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
                                        <Input type='text' value={formdata.tempat_lahir} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                tempat_lahir: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <div>
                                        <Label>Tanggal Lahir</Label>
                                        <Input required type='text' value={formdata.tanggal_lahir} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                tanggal_lahir: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <div>
                                        <Label>No Kartu Keluarga</Label>
                                        <Input required type='number' value={formdata.no_kk} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                no_kk: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <div>
                                        <Label>NIK</Label>
                                        <Input required type='number' value={formdata.no_nik} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                no_nik: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <div>
                                        <Label>Pekerjaan</Label>
                                        <Input type='text' value={formdata.pekerjaan} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                pekerjaan: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <div>
                                        <Label>Pendidikan</Label>
                                        <Select required value={formdata.pendidikan}
                                            onValueChange={(e) => {
                                                setFormdata((prev) => ({
                                                    ...prev,
                                                    pendidikan: e
                                                }))
                                            }}
                                        >
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

            <div className='my-4 w-full flex items-center justify-end space-x-3'>
                <Input className='w-full sm:w-[200px]' type='search' placeholder='' />
                <Button size="icon" className='text-white'><Search className='w-4 h-4' /></Button>
            </div>

            <p className='text-sm text-muted-foreground'>No. kk: {dataKeluarga.map((item) => item.no_kk)}</p>

            <Card>
                <CardContent className='p-0'>
                    <Table>
                        <TableHeader className='bg-primary w-full '>
                            <TableRow className='!text-white truncate'>
                                <TableHead className='!text-white'>No</TableHead>
                                <TableHead className='!text-white'>Nama Orang Tua</TableHead>
                                <TableHead className='!text-white'>Hubungan</TableHead>
                                <TableHead className='!text-white'>Pendidikan</TableHead>
                                <TableHead className='!text-white'>Tipe Pekerjaan</TableHead>
                                <TableHead className="text-center !text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataKeluarga.map((data, index: number) => (
                                <TableRow key={data.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data.nama_lengkap}</TableCell>
                                    <TableCell>{data.hubungan}</TableCell>
                                    <TableCell>{data.pendidikan}</TableCell>
                                    <TableCell>{data.pekerjaan}</TableCell>
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

export default Step3