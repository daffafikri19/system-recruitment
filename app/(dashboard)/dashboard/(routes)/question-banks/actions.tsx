"use client"
import prisma from "@/lib/utils/prisma"
import { Button } from "@/components/ui/button"
import { Dice1, Plus, RefreshCw } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import useSWR, { useSWRConfig } from "swr"
import { useState } from "react"
import { createNewQuestion } from "@/actions/question-banks/createNewQuestion"
import { getAllQuestion } from "@/actions/question-banks/getAllQuestions"

export const Actions = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const { mutate } = useSWRConfig();

    const fetcher = async () => {
        const response = await fetch('/api/question/get', {
            cache: 'no-cache'
        });
        const data = await response.json();
        console.log(data)
        return data
    }

    const { data: QuestionsData, error, isLoading } = useSWR('/api/question/get', fetcher);

    if(isLoading) {
        return (
            <div>
                loading....
            </div>
        )
    }

    if(error) {
        return (
            <div>
                error
            </div>
        )
    }

    const revalidateData = () => {
        console.log("data was revalidate")
        mutate('/dashboard/question-banks')
    }

    return (
        <div className="flex items-center justify-between">
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogTrigger asChild>
                    <Button className='text-white'>Tambah Soal <Plus className='w-4 h-4 text-white ml-3' /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tambah Bank Soal</AlertDialogTitle>
                        <AlertDialogDescription>
                            Buat pertanyaan bertipe text atau gambar, dengan kategori yang sudah disediakan
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form action={async formdata => {
                        await createNewQuestion(formdata);
                        setOpenDialog(false)
                        await fetcher();
                        toast({
                            title: 'berhasil membuat soal baru'
                        });
                        revalidateData();
                    }}>
                        <div className="w-full">
                            <div className="flex items-center space-x-4">
                                <div className="w-1/2">
                                    <Select name="type" required>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="tipe pertanyaan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="text">text</SelectItem>
                                            <SelectItem value="image">image</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-1/2">
                                    <Select required name="category">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="kategori pertanyaan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {QuestionsData.filter((data : any, index: number, self : any) =>
                                                index === self.findIndex((d : any) => d.category === data.category)
                                            ).map((data : any) => (
                                                <SelectItem key={data.id} value={data.category}>{data.category}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Label>Pertanyaan : </Label>
                                <Textarea required placeholder="misal: Jabatan Anda Saat Ini ?" name="question" />
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                                <Input className="w-4 h-4" type="checkbox" name="required" />
                                <Label>pertanyaan ini wajib di isi ?</Label>
                            </div>
                        </div>
                        <AlertDialogFooter className="mt-10">
                            <AlertDialogCancel type="button">Batal</AlertDialogCancel>
                            <AlertDialogAction type="submit" className="text-white">
                                Simpan
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>

            <Button size="icon" variant="outline" className="cursor-pointer" onClick={revalidateData}>
                <RefreshCw className="w-4 h-4" />
            </Button>
        </div>
    )
}