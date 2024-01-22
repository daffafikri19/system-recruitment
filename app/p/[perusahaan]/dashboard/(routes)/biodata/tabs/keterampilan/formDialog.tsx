"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { addKeterampilan } from '@/actions/mutations/keterampilan/addKeterampilan';
import { Textarea } from '@/components/ui/textarea';

export const FormDialog = ({ username }: { username: string }) => {
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
                        <AlertDialogTitle>Tambah Data Keterampilan</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form ref={ref} action={async (formdata) => {
                        const result = await addKeterampilan(formdata);
                        setOpenDialog(false)
                        toast({
                            title: result?.message,
                            variant: result?.status === 200 ? "default" : "destructive"
                        });

                    }}>
                        <div className='mt-5'>
                            <div>   
                                <Label>Nama Keterampilan</Label>
                                <Input type='text' name='nama_keterampilan' />
                            </div>

                            <div className='grid grid-cols-1'>
                                <div>
                                    <Label>Tipe Keterampilan</Label>
                                    <Select name='tipe_keterampilan'>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Soft Skill">
                                                Soft Skill
                                            </SelectItem>
                                            <SelectItem value="Hard Skill">
                                                Hard Skill
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Keterangan</Label>
                                    <Textarea name='keterangan' />
                                </div>
                                
                                <Input type='hidden' name='username' value={username} />
                            </div>
                        </div>
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