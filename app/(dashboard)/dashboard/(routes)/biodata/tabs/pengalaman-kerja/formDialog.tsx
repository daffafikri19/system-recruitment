"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { addPengalamanKerja } from '@/actions/mutations/pengalaman-kerja/addPengalamanKerja';

export const FormDialog = ({ username }: { username: string }) => {
    const [openDialog, setOpenDialog] = useState(false);

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
                        <AlertDialogTitle>Tambah Data Pengalaman Kerja</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form action={async (formdata) => {
                        const result = await addPengalamanKerja(formdata);
                        setOpenDialog(false)
                        toast({
                            title: result.message,
                            variant: result.status === 200 ? "default" : "destructive"
                        });

                    }}>
                        <div className='mt-5'>
                            <div>
                                <Label>Nama Perusahaan</Label>
                                <Input type='text' name='nama_perusahaan' />
                            </div>

                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <Label>Posisi</Label>
                                    <Input type='text' name='posisi' />
                                </div>

                                <div>
                                    <Label>Range Gaji</Label>
                                    <Select required name='gaji'>
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
                                    <Input name='awal_masuk' type='number' required placeholder='' />
                                </div>
                                <div>
                                    <Label>Tahun Keluar Kerja</Label>
                                    <Input name='keluar' type='number' required />
                                </div>
                                <div>
                                    <Label>Uraian / Detail Pekerjaan</Label>
                                    <Textarea name='uraian_pekerjaan' required />
                                </div>
                                <div>
                                    <Label>Alasan Pindah / Keluar</Label>
                                    <Textarea name='alasan_pindah' />
                                </div>
                            </div>
                        </div>
                        <Input type='hidden' name='username' value={username} />

                        <div className='w-full flex items-center justify-end space-x-4 mt-10'>
                            <Button type='button' variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button type='submit' className='text-white'>Simpan</Button>
                        </div>
                       
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
