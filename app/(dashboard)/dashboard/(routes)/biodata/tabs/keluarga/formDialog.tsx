"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { addKeluarga } from '@/actions/mutations/keluarga/addKeluarga';
import axios from 'axios';
import { DatePicker } from '@/app/(dashboard)/dashboard/components/DatePicker';

export const FormDialog = ({ username }: { username: string }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [isSudahMenikah, setIsSudahMenikah] = useState<boolean | null>(false);

    const getBiodata = async () => {
        try {
            const response = await axios.post('/api/biodata/get', {
                username: username
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            const statusPernikahan = response.data.status_pernikahan;
            if(statusPernikahan === 'Belum Menikah') {
                setIsSudahMenikah(false)
            } else if(statusPernikahan === 'Sudah Menikah') {
                setIsSudahMenikah(true)
            } else {
                setIsSudahMenikah(null)
            }

            console.log(response.data)
            return response.data
        } catch (error : any) {
            if(error) {
                toast({
                    title: error.message,
                    variant: 'destructive'
                })
            }
        }
    }

    useEffect(() => {
        getBiodata();
    }, []);

    const handleSelectedDate = (date: any) => {
        console.log("selected Date", date);
        setSelectedDate(date)
    }

    return (
        <>
            <div className='my-5 px-4 flex items-center justify-between'>
                <div>
                    <Button onClick={() => setOpenDialog(true)} className='flex items-center text-white' variant="default">
                        Tambah Data <Plus className='w-4 h-4 ml-4' />
                    </Button>
                </div>
            </div>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tambah Data Keluarga</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form ref={ref} action={async (formdata) => {
                        const result = await addKeluarga(formdata);
                        setOpenDialog(false)
                        toast({
                            title: result?.message,
                            variant: result?.status === 200 ? "default" : "destructive"
                        });

                    }}>
                        <div className='mt-5'>
                            <div>
                                <Label>Nama Lengkap</Label>
                                <Input type='text' name='nama_lengkap' />
                            </div>

                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <Label>Hubungan</Label>
                                    <Select required name='hubungan'>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ibu">Ibu</SelectItem>
                                            <SelectItem value="Ayah">Ayah</SelectItem>
                                            <SelectItem value="Kakak">Kakak</SelectItem>
                                            <SelectItem value="Adik">Adik</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Jenis Kelamin</Label>
                                    <Select required name='jenis_kelamin'>
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
                                    <Input name='tempat_lahir' type='text' required />
                                </div>
                                <div>
                                    <Label>Tanggal Lahir</Label>
                                    <DatePicker disabled={false} selectedDate={handleSelectedDate} />
                                    <Input type='hidden' name='tanggal_lahir' value={selectedDate} readOnly />
                                </div>
                               
                                <div>
                                    <Label>No. Kartu Keluarga</Label>
                                    <Input name='no_kk' type='number' required />
                                </div>
                                <div>
                                    <Label>No. NIK</Label>
                                    <Input name='no_nik' type='number' required />
                                </div>
                                <div>
                                    <Label>Pekerjaan</Label>
                                    <Input name='pekerjaan' type='text' required />
                                </div>
                                <div>
                                    <Label>Pendidikan</Label>
                                    <Input name='pendidikan' type='text' required />
                                </div>
                            </div>
                        </div>
                        <Input type='hidden' name='username' value={username} />
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