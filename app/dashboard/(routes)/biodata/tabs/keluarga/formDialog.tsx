"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { addKeluarga } from '@/actions/mutations/keluarga/addKeluarga';
import axios from 'axios';
import { DatePicker } from '@/app/dashboard/components/DatePicker';
import { useLoadingContext } from '@/lib/providers/loadingStateProvider';

export const FormDialog = ({ username }: { username: string }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [isSudahMenikah, setIsSudahMenikah] = useState<boolean | null>(false);
    const { loading, setLoading } = useLoadingContext();

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
            if (statusPernikahan === 'Belum Menikah') {
                setIsSudahMenikah(false)
            } else if (statusPernikahan === 'Sudah Menikah') {
                setIsSudahMenikah(true)
            } else {
                setIsSudahMenikah(null)
            }

            console.log(response.data)
            return response.data
        } catch (error: any) {
            if (error) {
                toast({
                    title: error.message,
                    variant: 'destructive'
                })
            }
        }
    }

    useEffect(() => {
        getBiodata();
    });

    const handleSelectedDate = (date: any) => {
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
                        setLoading(true)
                        const result = await addKeluarga(formdata);
                        setLoading(false)
                        if(result.status !== 200) {
                            setOpenDialog(true)
                            toast({
                                title: result?.message,
                                variant: "destructive"
                            });
                        } else {
                            setOpenDialog(false)
                            toast({
                                title: result?.message,
                            });
                        }
                    }}>
                        <div className='mt-5'>
                            <div>
                                <Label>Nama Lengkap</Label>
                                <Input type='text' name='nama_lengkap' />
                            </div>


                            <div className='grid grid-cols-2 gap-2'>
                                {isSudahMenikah ? (
                                    <div>
                                        <Label>Hubungan</Label>
                                        <Select required name='hubungan'>
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
                                )}

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
                                    <Label>Pekerjaan</Label>
                                    <Input name='pekerjaan' type='text' required />
                                </div>
                                <div>
                                    <Label>Pendidikan</Label>
                                    <Input name='pendidikan' type='text' required />
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
                                    <Label>Tempat Lahir</Label>
                                    <Input name='tempat_lahir' type='text' required />
                                </div>
                                <div>
                                    <Label>Tanggal Lahir</Label>
                                    <DatePicker disabled={false} selectedDate={handleSelectedDate} />
                                    <Input type='hidden' name='tanggal_lahir' value={selectedDate} readOnly />
                                </div>
                            </div>
                        </div>
                        <input type='hidden' name='username' value={username} />
                        <AlertDialogFooter className='mt-5'>
                            <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
                            <AlertDialogAction disabled={loading} type='submit'>
                                { loading ? (
                                    <Loader2 className='w-5 h-5 mx-4 animate-spin' />
                                ) : "Simpan" }
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog >
        </>
    )
}