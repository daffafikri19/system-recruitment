"use client"
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { KeterampilanProps } from '@/types';
import { editKeterampilan } from '@/actions/mutations/keterampilan/editKeterampilan';
import { Textarea } from '@/components/ui/textarea';

interface EditFormProps {
    selectedData: KeterampilanProps,
    openDialog: boolean,
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

export const EditForm = ({ selectedData, openDialog, setOpenDialog } : EditFormProps) => {

    const [keterampilanUser, setKeterampilanUser] = useState<KeterampilanProps>(selectedData)
    useEffect(() => {   
        setKeterampilanUser(selectedData);
    }, [selectedData]);

    return (    
        <>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Edit Data Keterampilan</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form action={async (formdata) => {
                        const result = await editKeterampilan(formdata);
                        setOpenDialog(false)
                        toast({
                            title: result?.message,
                            variant: result?.status === 200 ? "default" : "destructive"
                        });

                    }}>
                        <div className='mt-5'>
                            <div>
                                <Label>Nama Keterampilan</Label>
                                <Input type='text' name='nama_keterampilan'
                                value={keterampilanUser.nama_keterampilan}
                                onChange={(e) => {
                                    setKeterampilanUser((prev) => ({
                                        ...prev,
                                        nama_keterampilan: e.target.value
                                    }))
                                }}
                                />
                            </div>

                            <div className='grid grid-cols-1 gap-2'>
                                <div>
                                    <Label>Tipe Keterampilan</Label>
                                    <Select required name='tipe_keterampilan' 
                                    value={keterampilanUser.tipe_keterampilan}
                                    onValueChange={(e) => {
                                        setKeterampilanUser((prev) => ({
                                            ...prev,
                                            tipe_keterampilan: e
                                        }))
                                    }} >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Soft Skill">Soft Skill</SelectItem>
                                            <SelectItem value="Hard Skill">Hard Skill</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Keterangan</Label>
                                    <Textarea required name='keterangan'
                                    value={keterampilanUser.keterangan}
                                    onChange={(e) => {
                                        setKeterampilanUser((prev) => ({
                                            ...prev,
                                            keterangan: e.target.value
                                        }))
                                    }} />
                                </div>
                            </div>
                        </div>
                        <Input type='hidden' name='id' value={keterampilanUser.id} />
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