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
import { pendidikanUser } from '@prisma/client';
import { useDataDiriStepContext } from '.';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { getDataUser } from '@/lib/providers/getDataUser';


const Step2 = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const { sessionUserId } = useDataDiriStepContext();
    const { username } = useDataDiriStepContext();
    const { setSubmittedStep2 } = useDataDiriStepContext();
    const [loading, setLoading] = useState(false);
    const [formdata, setFormdata] = useState<pendidikanUser>({
        id: "",
        ipk: "",
        kota: "",
        luar_negeri: "",
        nama_institusi: "",
        no_ijazah: "",
        nama_jurusan: "",
        pendidikan_terakhir: "",
        provinsi: "",
        tahun_lulus: "",
        tahun_masuk: "",
        tgl_terbit: "",
        tipe_pendidikan: "",
        createdAt: "",
        updatedAt: ""
    });

    const [dataPendidikan, setDataPendidikan] = useState<pendidikanUser[]>([])

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await axios.post('/api/pendidikan/create', {
                id_user: sessionUserId,
                luar_negeri: formdata.luar_negeri,
                tipe_pendidikan: formdata.tipe_pendidikan,
                pendidikan_terakhir: formdata.pendidikan_terakhir,
                provinsi: formdata.provinsi,
                kota: formdata.kota,
                nama_institusi: formdata.nama_institusi,
                nama_jurusan: formdata.nama_jurusan,
                no_ijazah: formdata.no_ijazah,
                tgl_terbit: formdata.tgl_terbit,
                tahun_masuk: formdata.tahun_masuk,
                tahun_lulus: formdata.tahun_lulus,
                ipk: formdata.ipk,
                username: username
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            toast({
                title: "Berhasil menyimpan data!"
            });
            setOpenDialog(false)
            setSubmittedStep2(false);

        } catch (error: any) {
            if (error) {
                toast({
                    title: error.message,
                    description: error.response.data.message,
                    variant: 'destructive'
                });
            }
        } finally {
            setLoading(false)
        }
    }

    const getCurrentUser = async () => {
        try {
            const user = await axios.post('/api/biodata/get', {
                id: sessionUserId
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            console.log(user.data.biodata[0].pendidikan);

            setDataPendidikan(user.data.biodata[0].pendidikan);
        } catch (error: any) {
            toast({
                title: error.message,
                description: error.response.data.message,
                variant: 'destructive'
            })
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, [])


    return (
        <div className='w-full mb-20'>
            <div className='my-5 w-full flex items-center justify-end'>
                <Button onClick={() => setOpenDialog(true)}
                    className='flex items-center text-white' variant="default">Tambah Data <Plus className='w-4 h-4 ml-4' />
                </Button>
            </div>
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
                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <Label>Dalam / Luar Negeri ?</Label>
                                    <Select required value={formdata.luar_negeri}
                                        onValueChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                luar_negeri: e
                                            }))
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
                                    <Label>Tipe Pendidikan</Label>
                                    <Select required value={formdata.tipe_pendidikan}
                                        onValueChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                tipe_pendidikan: e
                                            }))
                                        }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Formal">Formal / sederajat</SelectItem>
                                            <SelectItem value="Non-formal">Non-formal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Jenjang Pendidikan</Label>
                                    <Select required value={formdata.pendidikan_terakhir}
                                        onValueChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                pendidikan_terakhir: e
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

                                <div>
                                    <Label>Nama Sekolah / Institusi</Label>
                                    <Input type='text' required placeholder='' value={formdata.nama_institusi} onChange={(e) => {
                                        setFormdata((prev) => ({
                                            ...prev,
                                            nama_institusi: e.target.value
                                        }))
                                    }} />
                                </div>

                                <div>
                                    <Label>Provinsi Sekolah</Label>
                                    <Input type='text' required value={formdata.provinsi} onChange={(e) => {
                                        setFormdata((prev) => ({
                                            ...prev,
                                            provinsi: e.target.value
                                        }))
                                    }} />
                                </div>

                                <div>
                                    <Label>Kota Sekolah</Label>
                                    <Input type='text' required value={formdata.kota} onChange={(e) => {
                                        setFormdata((prev) => ({
                                            ...prev,
                                            kota: e.target.value
                                        }))
                                    }} />
                                </div>



                                <div>
                                    <Label>Nama Jurusan</Label>
                                    <Input type='text' value={formdata.nama_jurusan} onChange={(e) => {
                                        setFormdata((prev) => ({
                                            ...prev,
                                            nama_jurusan: e.target.value
                                        }))
                                    }} />
                                </div>
                                <div>
                                    <Label>Tahun Masuk</Label>
                                    <Input type='number' required value={formdata.tahun_masuk} onChange={(e) => {
                                        setFormdata((prev) => ({
                                            ...prev,
                                            tahun_masuk: e.target.value.toString()
                                        }))
                                    }} />
                                </div>
                                <div>
                                    <Label>Tahun Lulus</Label>
                                    <Input type='number' required value={formdata.tahun_lulus} onChange={(e) => {
                                        setFormdata((prev) => ({
                                            ...prev,
                                            tahun_lulus: e.target.value.toString()
                                        }))
                                    }} />
                                </div>

                                <div>
                                    <Label>No Ijazah</Label>
                                    <Input required type='text' value={formdata.no_ijazah} onChange={(e) => {
                                        setFormdata((prev) => ({
                                            ...prev,
                                            no_ijazah: e.target.value
                                        }))
                                    }} />
                                </div>

                                <div>
                                    <Label>Tanggal Terbit</Label>
                                    <Input type='tel' value={formdata.tgl_terbit} onChange={(e) => {
                                        console.log(e.target.value)
                                        setFormdata((prev) => ({
                                            ...prev,
                                            tgl_terbit: e.target.value.toString()
                                        }))
                                    }} />
                                </div>

                                <div>
                                    <Label>IPK</Label>
                                    <Input required type='number' value={formdata.ipk!} onChange={(e) => {
                                        setFormdata((prev) => ({
                                            ...prev,
                                            ipk: e.target.value.toString()
                                        }))
                                    }} />
                                </div>
                            </div>
                        </div>

                        <DialogFooter className='mt-5'>
                            <Button className='text-white'>Simpan</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>

            <div className='my-4 w-full flex items-center justify-end space-x-3'>
                <Input className='w-full sm:w-[200px]' type='search' placeholder='' />
                <Button size="icon" className='text-white'><Search className='w-4 h-4' /></Button>
            </div>

            <Card>
                <CardContent className='p-0'>
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
                            {dataPendidikan.map((data, index: number) => (
                                <TableRow key={data.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data.pendidikan_terakhir}</TableCell>
                                    <TableCell>{data.nama_institusi}</TableCell>
                                    <TableCell>{data.nama_jurusan}</TableCell>
                                    <TableCell className='text-center text-sm truncate'>{data.tahun_masuk} - {data.tahun_lulus}</TableCell>

                                    <TableCell className="text-center">
                                        <div className='flex items-center justify-center space-x-2'>
                                            <Eye className='w-4 h-4 cursor-pointer' />
                                            <Edit2Icon className='w-4 h-4 cursor-pointer' />
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

export default Step2