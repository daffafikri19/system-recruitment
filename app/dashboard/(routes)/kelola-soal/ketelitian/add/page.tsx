"use client"

import { addSingleSoal } from '@/actions/mutations/soal/ketelitian/addSingleSoal'
import { Filemanager } from '@/app/dashboard/components/FileManager'
import { TextEditor } from '@/app/dashboard/components/TextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const AddSoalKetelitianPage = () => {
    const [media, setMedia] = useState<string | null>("");
    const [soal, setSoal] = useState("");
    const router = useRouter();

    const handleFileSelected = (mediaUrl: string) => {
        console.log(mediaUrl);
        setMedia(mediaUrl)
    }

    const handleTextEditorChange = (content: any, editor: any) => {
        setSoal(content)
    }

    return (
        <div className='w-full'>
            <Card>
                <CardContent className='py-4'>
                    <form action={async formdata => {
                        const result = await addSingleSoal(formdata);
                        if (result.status === 200) {
                            toast({
                                title: result.message,
                                variant: "default"
                            });
                            return router.push('/dashboard/kelola-soal/ketelitian')
                        } else {
                            toast({
                                title: result.message,
                                variant: "destructive"
                            });
                            console.log(result.error)
                        }
                    }}>
                        <div>
                            <Label>Gambar (opsional)</Label>
                            <div className='border-dashed border-2 rounded-lg dark:border-white w-full'>
                                {media ? (
                                    <div className='w-full flex items-center justify-center py-4 relative'>
                                        <Image src={`https://filemanager-e-recruitment.teinsolutions.com${media}`} alt='Preview' width={200} height={200} />
                                        <Input type='hidden' name='gambar' value={media?.toString() ? media?.toString() : "null"} readOnly />
                                        <div title='delete' className='w-8 h-8 rounded-bl-full flex items-center justify-center cursor-pointer border-2 border-dashed absolute top-0 right-0' onClick={() => setMedia(null)}>
                                            <X className='w-5 h-5 text-red-700  ml-2 mb-2 ' />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <Filemanager onFileSelected={handleFileSelected} />
                                        <Input type='hidden' name='gambar' value={media?.toString() ? media?.toString() : "null"} readOnly />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='mt-5 w-full'>
                            <Label>Soal / Pertanyaan</Label>
                            <TextEditor handleEditorChange={handleTextEditorChange} />
                            <Input type='hidden' name='soal' value={soal} readOnly />
                        </div>

                        <div className='mt-5'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                <div>
                                    <Label>Kunci Jawaban</Label>
                                    <Select required name='kunci_jawaban'>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="S">Sama</SelectItem>
                                            <SelectItem value="T">Tidak Sama</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Bahasa</Label>
                                    <Select required defaultValue='Bahasa_Indonesia' name='tipe_soal'>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Bahasa_Indonesia">Bahasa Indonesia</SelectItem>
                                            <SelectItem value="Bahasa_Inggris">Bahasa Inggris</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Status Soal</Label>
                                    <Select required defaultValue='true' name='aktif'>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">Aktif</SelectItem>
                                            <SelectItem value="false">Tidak Aktif</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className='mt-10 w-full flex items-center justify-end space-x-4'>
                            <Button type='button' variant="destructive" onClick={() => router.push('/dashboard/kelola-soal/ketelitian')}>Batal</Button>
                            <Button className='text-white' type='submit' disabled={!soal}>Simpan</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddSoalKetelitianPage