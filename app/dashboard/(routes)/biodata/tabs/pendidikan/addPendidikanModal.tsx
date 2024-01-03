
"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { addPendidikan } from "@/actions/mutations/pendidikan/addPendidikan";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { PendidikanUserProps } from '@/types';

interface AddPendidikanModalProps {
    username: string,
}

export const AddPendidikanModal = ({ username }: AddPendidikanModalProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const ref = useRef<HTMLFormElement>(null);

    return (
        <>
            <div className='my-5 px-4 flex items-center justify-between'>
                <div>
                    <Button onClick={() => setOpenDialog(true)} className='flex items-center text-white' variant="default">Tambah Data <Plus className='w-4 h-4 ml-4' />
                    </Button>
                </div>
            </div>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tambah Data Pendidikan</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form ref={ref} action={async (formdata) => {
                        const result = await addPendidikan(formdata);
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
                                    <Select required name='luar_negeri'>
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
                                    <Select required name='tipe_pendidikan'>
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
                                    <Select required name='pendidikan_terakhir'>
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
                                    <Input name='nama_institusi' type='text' required placeholder='' />
                                </div>

                                <div>
                                    <Label>Provinsi Sekolah</Label>
                                    <Input name='provinsi' type='text' required />
                                </div>

                                <div>
                                    <Label>Kota Sekolah</Label>
                                    <Input name='kota' type='text' required />
                                </div>
                                <div>
                                    <Label>Nama Jurusan</Label>
                                    <Input name='nama_jurusan' type='text' />
                                </div>
                                <div>
                                    <Label>Tahun Masuk</Label>
                                    <Input name='tahun_masuk' type='number' required />
                                </div>
                                <div>
                                    <Label>Tahun Lulus</Label>
                                    <Input name='tahun_lulus' type='number' required />
                                </div>

                                <div>
                                    <Label>No Ijazah</Label>
                                    <Input type='text' name='no_ijazah' required />
                                </div>

                                <div>
                                    <Label>Tanggal Terbit</Label>
                                    <Input type='tel' name='tgl_terbit' required />
                                </div>

                                <div>
                                    <Label>IPK / Nilai</Label>
                                    <Input name='ipk' type='number' />
                                </div>
                            </div>
                        </div>
                        <Input type='hidden' name='username' value={username} />

                        <AlertDialogFooter className='mt-5'>
                            <AlertDialogCancel type='button'>Batal</AlertDialogCancel>
                            <AlertDialogAction type='submit' className='text-white'>Simpan</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog >
        </>
    )
}