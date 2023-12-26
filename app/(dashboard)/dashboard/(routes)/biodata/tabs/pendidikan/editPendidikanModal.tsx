"use client"
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { PendidikanUserProps } from '@/types';
import { editPendidikan } from '@/actions/mutations/pendidikan/editPendidikan';

interface EditPendidikanProps {
    selectedData: PendidikanUserProps,
    openDialog: boolean,
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

export const EditPendidikanModal = ({ selectedData, openDialog, setOpenDialog }: EditPendidikanProps) => {

    const [pendidikanUser, setPendidikanUser] = useState<PendidikanUserProps>(selectedData);
    useEffect(() => {
        setPendidikanUser(selectedData);
    }, [selectedData]);

    return (
        <>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Edit Data Pendidikan</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form action={async (formdata) => {
                        const result = await editPendidikan(formdata);
                        setOpenDialog(false)
                        toast({
                            title: result.message,
                            variant: result.status === 200 ? "default" : "destructive"
                        });

                    }}>
                        <div className='mt-5'>
                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <Label>Dalam / Luar Negeri ?</Label>
                                    <Select required name='luar_negeri'
                                        value={pendidikanUser.luar_negeri}
                                        onValueChange={(e) => {
                                            setPendidikanUser((prev) => ({
                                                ...prev,
                                                luar_negeri: e
                                            }))
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Dalam Negeri">Dalam Negeri</SelectItem>
                                            <SelectItem value="Luar Negeri">Luar Negeri</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Tipe Pendidikan</Label>
                                    <Select required name='tipe_pendidikan' 
                                    value={pendidikanUser.tipe_pendidikan}
                                    onValueChange={(e) => {
                                        setPendidikanUser((prev) => ({
                                            ...prev,
                                            tipe_pendidikan: e
                                        }))
                                    }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Formal">Formal</SelectItem>
                                            <SelectItem value="Non-formal">Non-formal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Jenjang Pendidikan</Label>
                                    <Select required name='pendidikan_terakhir'
                                    value={pendidikanUser.pendidikan_terakhir}
                                    onValueChange={(e) => {
                                        setPendidikanUser((prev) => ({
                                            ...prev,
                                            pendidikan_terakhir: e
                                        }))
                                    }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SMP">SMP</SelectItem>
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
                                    <Input name='nama_institusi' type='text' required
                                        value={pendidikanUser.nama_institusi}
                                        onChange={(e) => {
                                            setPendidikanUser((prev) => ({
                                                ...prev,
                                                nama_institusi: e.target.value
                                            }))
                                        }}
                                    />
                                </div>

                                <div>
                                    <Label>Provinsi Sekolah</Label>
                                    <Input name='provinsi' type='text' required 
                                        value={pendidikanUser.provinsi}
                                        onChange={(e) => {
                                            setPendidikanUser((prev) => ({
                                                ...prev,
                                                provinsi: e.target.value
                                            }))
                                        }}
                                    />
                                </div>

                                <div>
                                    <Label>Kota Sekolah</Label>
                                    <Input name='kota' type='text' required 
                                    value={pendidikanUser.kota}
                                    onChange={(e) => {
                                        setPendidikanUser((prev) => ({
                                            ...prev,
                                            kota: e.target.value
                                        }))
                                    }}
                                    />
                                </div>
                                <div>
                                    <Label>Nama Jurusan</Label>
                                    <Input name='nama_jurusan' type='text'
                                    value={pendidikanUser.nama_jurusan}
                                    onChange={(e) => {
                                        setPendidikanUser((prev) => ({
                                            ...prev,
                                            nama_jurusan: e.target.value
                                        }))
                                    }}
                                    />
                                </div>
                                <div>
                                    <Label>Tahun Masuk</Label>
                                    <Input name='tahun_masuk' type='number' required
                                    value={pendidikanUser.tahun_masuk}
                                    onChange={(e) => {
                                        setPendidikanUser((prev) => ({
                                            ...prev,
                                            tahun_masuk: e.target.value
                                        }))
                                    }}
                                    />
                                </div>
                                <div>
                                    <Label>Tahun Lulus</Label>
                                    <Input name='tahun_lulus' type='number' required
                                    value={pendidikanUser.tahun_lulus}
                                    onChange={(e) => {
                                        setPendidikanUser((prev) => ({
                                            ...prev,
                                            tahun_lulus: e.target.value
                                        }))
                                    }}
                                    />
                                </div>

                                <div>
                                    <Label>No Ijazah</Label>
                                    <Input type='text' name='no_ijazah' required
                                    value={pendidikanUser.no_ijazah}
                                    onChange={(e) => {
                                        setPendidikanUser((prev) => ({
                                            ...prev,
                                            no_ijazah: e.target.value
                                        }))
                                    }}
                                    />
                                </div>

                                <div>
                                    <Label>Tanggal Terbit</Label>
                                    <Input type='tel' name='tgl_terbit' required
                                    value={pendidikanUser.tgl_terbit}
                                    onChange={(e) => {
                                        setPendidikanUser((prev) => ({
                                            ...prev,
                                            
                                            tgl_terbit: e.target.value
                                        }))
                                    }}
                                    />
                                </div>

                                <div>
                                    <Label>IPK / Nilai</Label>
                                    <Input name='ipk' type='number'
                                    value={pendidikanUser.ipk}
                                    onChange={(e) => {
                                        setPendidikanUser((prev) => ({
                                            ...prev,
                                            ipk: e.target.value
                                        }))
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                        <Input type='hidden' name='id' value={pendidikanUser.id} />

                        <AlertDialogFooter className='mt-5'>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction type='submit' className='text-white'>Simpan</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog >
        </>
    )
}