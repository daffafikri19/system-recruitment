
"use client"
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { DataKeluargaProps } from '@/types';
import { DatePicker } from '../../../../components/DatePicker';
import { editKeluarga } from '@/actions/mutations/keluarga/editKeluarga';
import { useLoadingContext } from '@/lib/providers/loadingStateProvider';
import { Loader2 } from 'lucide-react';

interface EditFormProps {
    selectedData: DataKeluargaProps,
    openDialog: boolean,
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

export const EditForm = ({ selectedData, openDialog, setOpenDialog } : EditFormProps) => {
    const [keluarga, setKeluarga] = useState<DataKeluargaProps>(selectedData);
    const [selectedDate, setSelectedDate] = useState("");
    const { loading, setLoading } = useLoadingContext();

    useEffect(() => {   
        setKeluarga(selectedData);
    }, [selectedData]);

    const handleSelectedDate = (date: any) => {
        console.log("selected Date", date);
        setSelectedDate(date)
    }

    return (
        <>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Edit Data Keluarga</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form action={async (formdata) => {
                        setLoading(true)
                        const result = await editKeluarga(formdata);
                        setLoading(false)
                        setOpenDialog(false)
                        toast({
                            title: result?.message,
                            variant: result?.status === 200 ? "default" : "destructive"
                        });

                    }}>
                        <div className='mt-5'>
                            <div>
                                <Label>Nama Lengkap</Label>
                                <Input type='text' name='nama_lengkap'
                                value={keluarga.nama_lengkap}
                                onChange={(e) => {
                                    setKeluarga((prev) => ({
                                        ...prev,
                                        nama_lengkap: e.target.value
                                    }))
                                }}
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <Label>Hubungan</Label>
                                    <Select required name='hubungan' 
                                    value={keluarga.hubungan}
                                    onValueChange={(e) => {
                                        setKeluarga((prev) => ({
                                            ...prev,
                                            hubungan: e
                                        }))
                                    }}
                                    >
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
                                    <Select required name='jenis_kelamin'
                                    value={keluarga.jenis_kelamin}
                                    onValueChange={(e) => {
                                        setKeluarga((prev) => ({
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
                                    <Label>Pekerjaan</Label>
                                    <Input name='pekerjaan' type='text' required 
                                        value={keluarga.pekerjaan}
                                        onChange={(e) => {
                                            setKeluarga((prev) => ({
                                                ...prev,
                                                pekerjaan: e.target.value
                                            }))
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label>Pendidikan</Label>
                                    <Input name='pendidikan' type='text' required 
                                        value={keluarga.pendidikan}
                                        onChange={(e) => {
                                            setKeluarga((prev) => ({
                                                ...prev,
                                                pendidikan: e.target.value
                                            }))
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label>Tempat Lahir</Label>
                                    <Input name='tempat_lahir' type='text' required
                                         value={keluarga.tempat_lahir}
                                         onChange={(e) => {
                                             setKeluarga((prev) => ({
                                                 ...prev,
                                                 tempat_lahir: e.target.value
                                             }))
                                         }}
                                    />
                                </div>
                                
                                <div>
                                    <Label>No. NIK</Label>
                                    <Input name='no_nik' type='number' required 
                                     value={keluarga.no_nik}
                                     onChange={(e) => {
                                         setKeluarga((prev) => ({
                                             ...prev,
                                             no_nik: e.target.value
                                         }))
                                     }}
                                    />
                                </div>
                                
                                <div>
                                    <Label>Tanggal Lahir</Label>
                                    <DatePicker disabled={false} selectedDate={handleSelectedDate} />
                                    <Input type='hidden' name='tanggal_lahir' value={selectedDate} readOnly />
                                </div>
                               
                                <div>
                                    <Label>No. Kartu Keluarga</Label>
                                    <Input name='no_kk' type='number' required 
                                     value={keluarga.no_kk}
                                     onChange={(e) => {
                                         setKeluarga((prev) => ({
                                             ...prev,
                                             no_kk: e.target.value
                                         }))
                                     }}
                                    />
                                </div>
                            </div>
                        </div>
                        <input type='hidden' name='id' value={keluarga.id} />
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