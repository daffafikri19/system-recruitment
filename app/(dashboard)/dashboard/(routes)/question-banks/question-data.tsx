"use client"
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast";
import { CategoryType, QuestionType } from "@/types";
import { Skeleton } from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const revalidate = true;

export function QuestionDataTable() {
    const [dataQuestions, setdataQuestions] = useState<QuestionType[]>([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [loading, setloading] = useState(false)
    const [questions, setQuestions] = useState({
        id: "",
        question: "",
        type: "",
        category: "",
        required: false,
        createdAt: "",
        updatedAt: "",
        createdBy: "",
    });
    const questionRefId = useRef<string>("");

    useEffect(() => {
        const getQuestions = async () => {
            setloading(true)
            try {
                const response = await fetch('/api/question/get', {
                    cache: 'no-cache'
                });
                const data = await response.json();
                console.log(data)
                setdataQuestions(data)
                return data
            } catch (error: any) {
                toast({
                    title: 'terjadi kesalahan saat mendapatkan data pertanyaan',
                    description: error.message
                })
                return;
            } finally {
                setloading(false)
            }
        }

        getQuestions();
    }, [openEditDialog, openDeleteDialog])

    // update question
    const updateQuestion = async (formdata: FormData, id: string) => {

        const question = formdata.get('question') as string
        const type = formdata.get('type') as any
        const category = formdata.get('category') as string
        const required = formdata.get('required') as string

        try {
            await axios.post('/api/question/update', {
                id: id,
                question: question,
                type: type,
                category: category,
                required: Boolean(required)
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
        } catch (error: any) {
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

    // delete question
    const deleteQuestion = async (id: string) => {
        try {
            await axios.post('/api/question/delete', {
                id: id
            });
            toast({
                title: 'berhasil delete pertanyaan'
            })
            return
        } catch (error: any) {
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


    const getQuestionById = async (id: string) => {
        try {
            const response = await axios.post('/api/question/getById', {
                id: id
            });
            setOpenEditDialog(true)
            setQuestions(response.data)
            return response.data
        } catch (error: any) {
            toast({
                title: 'terjadi kesalahan saat mendapatkan data',
                description: error.message,
                variant: 'destructive'
            })
        }
    }


    // delete question
    const opendialogDelete = (id: string) => {
        questionRefId.current = id
        setOpenDeleteDialog(true)
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="truncate">
                        <TableHead>No</TableHead>
                        <TableHead className="min-w-[200px]">Pertanyaan</TableHead>
                        <TableHead>tipe</TableHead>
                        <TableHead>kategori</TableHead>
                        <TableHead>Dibuat Oleh</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="w-full">
                    {loading ? (
                            <>
                           <TableRow>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell className="flex items-center justify-center space-x-2">
                                        <Skeleton variant="text" width={50} />
                                        <Skeleton variant="text" width={50} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell className="flex items-center justify-center space-x-2">
                                        <Skeleton variant="text" width={50} />
                                        <Skeleton variant="text" width={50} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell className="flex items-center justify-center space-x-2">
                                        <Skeleton variant="text" width={50} />
                                        <Skeleton variant="text" width={50} />
                                    </TableCell>
                                </TableRow>
                            </>
                    ) : (
                        <>
                            {dataQuestions.map((data: any, index: number) => (
                                <TableRow key={data.id} className="truncate">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data.question}</TableCell>
                                    <TableCell>{data.type}</TableCell>
                                    <TableCell>{data.category.map((item: CategoryType) => item.name).join(', ')}</TableCell>
                                    <TableCell>{data.createdBy ? data.createdBy : "no data"}</TableCell>
                                    <TableCell className="flex items-center justify-center space-x-2">
                                        <Button size="icon" variant="outline" asChild className="cursor-pointer dark:bg-boxdark"
                                            onClick={() => getQuestionById(data.id)}>
                                            <Edit className="w-5 h-5" />
                                        </Button>
                                        <Button size="icon" variant="outline" asChild className="cursor-pointer dark:bg-boxdark" onClick={() => opendialogDelete(data.id)}>
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    )}

                </TableBody>
            </Table >

            {/* edit dialog */}
            <AlertDialog open={openEditDialog} onOpenChange={setOpenEditDialog} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Edit Pertanyaan</AlertDialogTitle>
                        <AlertDialogDescription>
                            Edit pertanyaan bertipe text atau gambar, dengan katerogi yang sudah disediakan
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form action={async formdata => {
                        await updateQuestion(formdata, questions.id);
                        setOpenEditDialog(false)
                    }}>
                        <div className="w-full">
                            <div className="flex items-center space-x-4">
                                <div className="w-1/2">
                                    <Select required
                                        defaultValue={questions.type} name="type">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="tipe pertanyaan" defaultValue={questions.type} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="text">text</SelectItem>
                                            <SelectItem value="gambar">gambar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-1/2">
                                    <Select required
                                        defaultValue={questions.category} name="category">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="kategori pertanyaan" defaultValue={questions.category} />
                                        </SelectTrigger>
                                        {/* <SelectContent>
                                            {dataQuestions.filter((data: any, index: number, self: any) =>
                                                index === self.findIndex((d : any) => d.category === data.category)
                                            ).map((data : QuestionType) => (
                                                <SelectItem key={data.id} value={data.category}>{data.category}</SelectItem>
                                            ))}
                                        </SelectContent> */}
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Label>Pertanyaan : </Label>
                                <Textarea required placeholder="misal: Jabatan Anda Saat Ini ?" name="question" defaultValue={questions.question} />
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                                <Input className="w-4 h-4" type="checkbox" defaultChecked={questions.required} name="required" />
                                <Label>pertanyaan ini wajib di isi ?</Label>
                            </div>
                        </div>
                        <AlertDialogFooter className="mt-10">
                            <AlertDialogCancel type="button">Batal</AlertDialogCancel>
                            <Button type="submit" className="text-white">Simpan</Button>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
                {/* edit dialog */}

                {/* delete dialog */}
                <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Apakah kamu yakin menghapus soal ini ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tindakan tidak bisa di ulang. Ini akan menghapus secara permanen di server. id: {questionRefId.current}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <Button className="text-white" onClick={async () => {
                                deleteQuestion(questionRefId.current)
                                setOpenDeleteDialog(false)
                                toast({
                                    title: 'berhasil menghapus soal'
                                });
                                window.location.reload();
                            }}>Hapus</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                {/* delete dialog */}
            </AlertDialog>
        </>
    )
}
