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
import { serfitikatUser } from '@prisma/client';
import { Textarea } from '@/components/ui/textarea';


const Step5 = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const { username, sessionUserId, setSubmittedStep5 } = useDataDiriStepContext();
    const [loading, setLoading] = useState(false);

    const [formdata, setFormdata] = useState<serfitikatUser>({
        id: "",
        jenis_sertifikat: "",
        nama_sertifikat: "",
        nama_org: "",
        no_sertifikat: "",
        negara_terbit: "",
        tanggal_exp: "",
        tanggal_terbit: "",
        createdAt: "",
        updatedAt: ""
    });

    const [dataSertifikat, setdataSertifikat] = useState<serfitikatUser[]>([])

    const getCurrentUser = async () => {
        try {
            const user = await axios.post('/api/biodata/get', {
                id: sessionUserId
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            console.log(user.data)

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
            const response = await axios.post('/api/sertifikat/get', {
                username: username
            });
            console.log(response);
            setdataSertifikat(response.data)
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
        setLoading(true)
        try {
            const response = await axios.post('/api/sertifikat/create', {
                username: username,
                jenis_sertifikat: formdata.jenis_sertifikat,
                nama_sertifikat: formdata.nama_sertifikat,
                nama_org: formdata.nama_org,
                no_sertifikat: formdata.no_sertifikat,
                negara_terbit: formdata.negara_terbit,
                tanggal_terbit: formdata.tanggal_terbit,
                tanggal_exp: formdata.tanggal_exp
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setOpenDialog(false);
            setSubmittedStep5(false);
            toast({
                title: "Berhasil menambahkan data sertifikat"
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
                            <DialogTitle>Tambah Data Sertifikat</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                            <div className='mt-5'>
                                <div className='w-full'>
                                    <Label>Nama Sertifikat</Label>
                                    <Input required type='text' value={formdata.nama_sertifikat}
                                        onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                nama_sertifikat: e.target.value
                                            }))
                                        }} />
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <Label>Jenis Sertifikat</Label>
                                        <Select required value={formdata.jenis_sertifikat}
                                            onValueChange={(e) => {
                                                setFormdata((prev) => ({
                                                    ...prev,
                                                    jenis_sertifikat: e
                                                }))
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="pilih" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Nasional">Nasional</SelectItem>
                                                <SelectItem value="Internasional">Internasional</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Nama Organisasi / Lembaga</Label>
                                        <Input type='text' value={formdata.nama_org} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                nama_org: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <div>
                                        <Label>No. Sertifikat</Label>
                                        <Input required type='text' value={formdata.no_sertifikat} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                no_sertifikat: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <div>
                                        <Label>Negara Terbit</Label>
                                        <Input required type='text' value={formdata.negara_terbit} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                negara_terbit: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <div>
                                        <Label>Tanggal Terbit</Label>
                                        <Input value={formdata.tanggal_terbit} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                tanggal_terbit: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <div>
                                        <Label>Tanggal Expired</Label>
                                        <Input value={formdata.tanggal_exp} onChange={(e) => {
                                            setFormdata((prev) => ({
                                                ...prev,
                                                tanggal_exp: e.target.value
                                            }))
                                        }} />
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
                                <TableHead className='!text-white'>Jenis Sertifikat</TableHead>
                                <TableHead className='!text-white'>Nama Sertifikat</TableHead>
                                <TableHead className='!text-white'>Nama Organisasi / Lembaga</TableHead>
                                <TableHead className='!text-white'>No. Sertifikat</TableHead>
                                <TableHead className='!text-white'>Tanggal Exp</TableHead>
                                <TableHead className="text-center !text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataSertifikat.map((data, index: number) => (
                                <TableRow key={data.id} className='truncate'>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data.jenis_sertifikat}</TableCell>
                                    <TableCell>{data.nama_sertifikat}</TableCell>
                                    <TableCell>{data.nama_org}</TableCell>
                                    <TableCell>{data.no_sertifikat}</TableCell>
                                    <TableCell>{data.tanggal_exp}</TableCell>
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

export default Step5