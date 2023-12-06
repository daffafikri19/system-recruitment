"use client"
import { Button } from "@/components/ui/button"
import { Plus, PlusIcon, RefreshCw } from "lucide-react"
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
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { CategoryType, QuestionType } from "@/types"
import axios from "axios"

export const Actions = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [qustions, setQuestions] = useState<QuestionType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [popOpen, setPopOpen] = useState(false);


    useEffect(() => {
        const getQuestion = async () => {
            const response = await fetch('/api/question/get', {
                cache: 'no-cache',
            });
            const data = await response.json();
            console.log(data)
            return data
        }

        const getCategory = async () => {
            const response = await fetch('/api/category/get', {
                cache: 'no-cache'
            });
            const data = await response.json();
            console.log(data)
            setCategories(data)
            return data
        }

        getQuestion();
        getCategory();
    }, [popOpen, openDialog]);


    const createNewCategory = async (formdata: FormData) => {
        const cateogory = formdata.get('categoryName') as string

        try {
            await axios.post('/api/category/create', {
                name: cateogory
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            toast({
                title: 'berhasil membuat kategori baru'
            });
            return
        } catch (error : any) {
            if (error) {
                toast({
                    title: error.response.data.message,
                    description: error.message,
                    variant: "destructive"
                })
                return;
            }
        }
    }

    // create new question
    const createNewQuestion = async (formdata: FormData) => {
        const question = formdata.get('question') as string
        const type = formdata.get('type') as any
        const required = formdata.get('required') as string
        const category = formdata.get('category') as string
        try {
            await axios.post('/api/question/create', {
                question: question,
                type: type,
                required: Boolean(required),
                category: category
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            toast({
                title: 'berhasil membuat pertanyaan baru'
            });
            return;
        } catch (error : any) {
            if (error) {
                toast({
                    title: error.response.data.message,
                    description: error.message,
                    variant: "destructive"
                })
                return;
            }
        }
    }


    return (
        <div className="flex items-center justify-between">
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className="dark:bg-boxdark">Tambah Soal <Plus className='w-4 h-4 ml-4' /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tambah Bank Soal</AlertDialogTitle>
                        <AlertDialogDescription>
                            Buat pertanyaan bertipe text atau gambar, dengan kategori yang sudah disediakan
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form action={async formdata => {
                        await createNewQuestion(formdata)
                        setOpenDialog(false)
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
                                <div className="w-1/2 flex items-center space-x-1">
                                    <Select required name="category">
                                        <SelectTrigger className="w-full text-start">
                                            <SelectValue placeholder="pilih kategori pertanyaan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.length === 0 ? (
                                                <>
                                                    <p className="text-center text-muted-foreground text-xs">tidak ada kategori</p>
                                                </>
                                            ) : (
                                                <>
                                                    {categories.map((data) => (
                                                        <SelectItem key={data.id} value={data.name}>{data.name}</SelectItem>
                                                    ))}
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <Popover open={popOpen} onOpenChange={setPopOpen}>
                                        <PopoverTrigger asChild>
                                            <Button className="text-white px-1 w-10" size="sm"><PlusIcon className="w-4 h-4" /></Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Card>
                                                <CardContent className="flex items-center pb-2">
                                                    <form action={async formdata => {
                                                       await createNewCategory(formdata)
                                                       setPopOpen(false)
                                                    }} className="w-full space-y-3">
                                                        <div>
                                                            <Label>Pertanyaan untuk :</Label>
                                                            <Input type="text" required name="categoryName" placeholder="misal: Tenaga Ahli" />
                                                        </div>
                                                        <Button size="sm" type="submit" className="text-white float-right mt-4 text-sm">Simpan</Button>
                                                    </form>
                                                </CardContent>
                                            </Card>
                                        </PopoverContent>
                                    </Popover>
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

            <Button size="icon" variant="outline" className="cursor-pointer dark:bg-boxdark" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4" />
            </Button>
        </div>
    )
}