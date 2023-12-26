"use client"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { PengalamanKerjaProps } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { editPengalamanKerja } from '@/actions/mutations/pengalaman-kerja/editPengalamanKerja';

interface EditFormProps {
    selectedData: PengalamanKerjaProps,
    openDialog: boolean,
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

export const EditForm = ({ selectedData, openDialog, setOpenDialog }: EditFormProps) => {
    const [pengalamanKerjaUser, setPengalamanKerjaUser] = useState<PengalamanKerjaProps>(selectedData);
    useEffect(() => {
        setPengalamanKerjaUser(selectedData);
    }, [selectedData]);

    return (
        <>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tambah Data Pengalaman Kerja</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form action={async (formdata) => {
                        const result = await editPengalamanKerja(formdata);
                        setOpenDialog(false)
                        toast({
                            title: result.message,
                            variant: result.status === 200 ? "default" : "destructive"
                        });

                    }}>
                        <div className='mt-5'>
                            <div>
                                <Label>Nama Perusahaan</Label>
                                <Input type='text' name='nama_perusahaan'
                                value={pengalamanKerjaUser.nama_perusahaan}
                                onChange={(e) => {
                                    setPengalamanKerjaUser((prev) => ({
                                        ...prev,
                                        nama_perusahaan: e.target.value
                                    }))
                                }}
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <Label>Posisi</Label>
                                    <Input type='text' name='posisi' 
                                    value={pengalamanKerjaUser.posisi}
                                    onChange={(e) => {
                                        setPengalamanKerjaUser((prev) => ({
                                            ...prev,
                                            posisi: e.target.value
                                        }))
                                    }}
                                    />
                                </div>

                                <div>
                                    <Label>Range Gaji</Label>
                                    <Select required name='gaji'
                                        value={pengalamanKerjaUser.gaji}
                                        onValueChange={(e) => {
                                            setPengalamanKerjaUser((prev) => ({
                                                ...prev,
                                                gaji: e
                                            }))
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="< 1.000.000">{"<"} 1.000.000</SelectItem>
                                            <SelectItem value="1.000.000 - 3.000.000">1.000.000 - 3.000.000</SelectItem>
                                            <SelectItem value="3.000.000 - 5.000.000">3.000.000 - 5.000.000</SelectItem>
                                            <SelectItem value="5.000.000 - 7.000.000">5.000.000 - 7.000.000</SelectItem>
                                            <SelectItem value="7.000.000 - 10.000.000">7.000.000 - 10.000.000</SelectItem>
                                            <SelectItem value="> 10.000.000">{">"} 10.000.000</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Tahun Masuk Bekerja</Label>
                                    <Input name='awal_masuk' type='number' required 
                                    value={pengalamanKerjaUser.awal_masuk}
                                    onChange={(e) => {
                                        setPengalamanKerjaUser((prev) => ({
                                            ...prev,
                                            awal_masuk: e.target.value
                                        }))
                                    }} />
                                </div>
                                <div>
                                    <Label>Tahun Keluar Kerja</Label>
                                    <Input name='keluar' type='number' required 
                                    value={pengalamanKerjaUser.keluar}
                                    onChange={(e) => {
                                        setPengalamanKerjaUser((prev) => ({
                                            ...prev,
                                            keluar: e.target.value
                                        }))
                                    }}
                                    />
                                </div>
                                <div>
                                    <Label>Uraian / Detail Pekerjaan</Label>
                                    <Textarea name='uraian_pekerjaan' required 
                                    value={pengalamanKerjaUser.uraian_pekerjaan}
                                    onChange={(e) => {
                                        setPengalamanKerjaUser((prev) => ({
                                            ...prev,
                                            uraian_pekerjaan: e.target.value
                                        }))
                                    }}/>
                                </div>
                                <div>
                                    <Label>Alasan Pindah / Keluar</Label>
                                    <Textarea name='alasan_pindah'
                                    value={pengalamanKerjaUser.alasan_pindah}
                                    onChange={(e) => {
                                        setPengalamanKerjaUser((prev) => ({
                                            ...prev,
                                            alasan_pindah: e.target.value
                                        }))
                                    }} />
                                </div>
                            </div>
                        </div>
                        <Input type='hidden' name='id' value={pengalamanKerjaUser.id} />
                        <AlertDialogFooter className='mt-5'>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction type='submit' className='text-white'>Simpan</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}