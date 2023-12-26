"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { addPengalamanKerja } from '@/actions/mutations/pengalaman-kerja/addPengalamanKerja';
import { addSertifikat } from '@/actions/mutations/sertifikat/addSertifikat';
import { DatePicker } from '@/app/(dashboard)/dashboard/components/DatePicker';

export const FormDialog = ({ username }: { username: string }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const ref = useRef<HTMLFormElement>(null);

    const [dateSertifikat, setDateSertifikat] = useState({
        tanggal_terbit: "",
        tanggal_exp: "",
    });

    const handleSelectTanggalTerbit = (date: string) => {
        setDateSertifikat((prev) => ({
            ...prev,
            tanggal_terbit: date
        }))
    }

    const handleSelectTanggalEXP = (date: string) => {
        setDateSertifikat((prev) => ({
            ...prev,
            tanggal_exp: date
        }))
    }


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
                        <AlertDialogTitle>Tambah Data Sertifikat</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form ref={ref} action={async (formdata) => {
                        const result = await addSertifikat(formdata);
                        setOpenDialog(false)
                        toast({
                            title: result?.message,
                            variant: result?.status === 200 ? "default" : "destructive"
                        });

                    }}>
                        <div className='mt-5'>
                            <div>
                                <Label>Nama Sertifikat</Label>
                                <Input type='text' name='nama_sertifikat' />
                            </div>

                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <Label>Jenis Sertifikat</Label>
                                    <Select name='jenis_sertifikat'>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Nasional">
                                                Nasional (Dalam Negeri)
                                            </SelectItem>
                                            <SelectItem value="Internasional">
                                                Internasional (Luar Negeri)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Nama Organisasi / Lembaga</Label>
                                    <Input type='text' name='nama_org' />
                                </div>
                                <div>
                                    <Label>No. Sertifikat</Label>
                                    <Input name='no_serfifikat' type='text' />
                                </div>
                                <div>
                                    <Label>Negara Penerbit</Label>
                                    <Input name='negara_terbit' type='text' />
                                </div>
                                <div>
                                    <Label>Tanggal Terbit</Label>
                                    <DatePicker disabled={false} selectedDate={handleSelectTanggalTerbit} />
                                    <Input type='hidden' value={dateSertifikat.tanggal_terbit} name='tanggal_terbit' />
                                </div>
                                <div>
                                    <Label>Tanggal Expired / Masa Berlaku</Label>
                                    <DatePicker disabled={false} selectedDate={handleSelectTanggalEXP} />
                                    <Input type='hidden' value={dateSertifikat.tanggal_exp} name='tanggal_exp' />
                                </div>
                                <Input type='hidden' name='username' value={username} />
                            </div>
                        </div>
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