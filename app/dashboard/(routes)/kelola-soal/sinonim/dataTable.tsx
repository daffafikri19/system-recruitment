"use client"
import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle2, Download, Edit2Icon, EyeIcon, Loader2, Plus, SearchIcon, Trash2Icon, UploadIcon, X, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import Link from "next/link"
import { soalSinonim } from "@prisma/client"
import * as XLSX from 'xlsx';
import { toast } from "@/components/ui/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { addMultipleSoal } from "@/actions/mutations/soal/sinonim/addMultipleSoal"
import { deleteSoal } from "@/actions/mutations/soal/sinonim/deleteSoal"
import { useLoadingContext } from "@/lib/providers/loadingStateProvider"
import { Badge } from "@/components/ui/badge"

interface dataTableProps {
    questionData: soalSinonim[]
}

export const DataTable = ({ questionData }: dataTableProps) => {

    const [openPratinjau, setOpenPratinjau] = useState(false);
    const router = useRouter();
    const [openModalImport, setOpenModalImport] = useState(false);
    const [dataFile, setDataFile] = useState<any[]>([]);
    const [onFile, setOnFile] = useState<boolean | null>(false);
    const { loading, setLoading } = useLoadingContext();

    const [pratinjau, setPratinjau] = useState<soalSinonim>({
        id: 0,
        gambar: "",
        soal: "",
        A: "",
        B: "",
        C: "",
        D: "",
        E: "",
        kunci_jawaban: "",
        tipe_soal: "Bahasa_Indonesia",
        aktif: true,
        createdAt: "",
        updatedAt: "",
    });

    const handleOpenPratinjau = (data: soalSinonim) => {
        setOpenPratinjau(true);
        setPratinjau(data)
    }

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState<soalSinonim[]>([]);

    useEffect(() => {
        // Filter data berdasarkan searchQuery saat questionData berubah
        const searchData = questionData.filter((question) =>
            question.soal.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(searchData);
    }, [questionData, searchQuery]);

    const handleSearch = () => {
        const searchData = questionData.filter((question) => question.soal.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(searchData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query === "") {
            setFilteredData(questionData);
        } else {
            handleSearch();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0] ?? "";
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e?.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });

                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];

                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                const headers: any = jsonData[0];
                const result = jsonData.slice(1).map((row: any) => {
                    const obj: { [key: string]: any } = {};
                    headers.forEach((header: any, index: number) => {
                        obj[header] = row[index];
                    });
                    return obj;
                });
                if (result) {
                    console.log(result);
                    setOnFile(true)
                    setDataFile(result)
                }
            };

            reader.readAsArrayBuffer(file);
        }
    };

    useEffect(() => {

    }, [questionData])

    const handleFileMultipleUpload = () => {
        setLoading(true)
        addMultipleSoal(dataFile).then(response => {
            toast({
                title: response.message,
                variant: response.status === 200 ? "default" : "destructive"
            });
            setLoading(false)
            setOpenModalImport(false)
        })
    }

    const handleDeleteSoal = (id: number) => {
        setLoading(true)
        deleteSoal(id).then(response => {
            toast({
                title: response.message,
                variant: response.status === 200 ? "default" : "destructive"
            });
            setLoading(false)
        })
    }

    const handleDownloadTemplate = () => {
        const templateURL = "/file/template-soal-sinonim.xlsx";
        window.location.href = templateURL;
    };

    return (
        <div className="w-full">
            <div className="w-full flex items-center justify-between space-x-8">
                <Button onClick={() => router.push('/dashboard/kelola-soal/sinonim/add')}>Tambah Soal <Plus className="w-4 h-4 ml-2" /></Button>
                <Button onClick={() => setOpenModalImport(true)}>Import Soal <UploadIcon className="w-4 h-4 ml-2" /></Button>
                <div className="w-full flex items-center space-x-1">
                    <Input
                        type="search"
                        placeholder="cari soal :"
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="dark:border-muted-foreground"
                    />
                    <Button size="icon" onClick={handleSearch}>
                        <SearchIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <Dialog open={openModalImport} onOpenChange={setOpenModalImport}>

                <DialogContent>
                    <div className="w-full h-full">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-center">sesuaikan template import data soal</CardTitle>
                                <DialogDescription className="w-full flex items-center justify-center">
                                    <Button onClick={handleDownloadTemplate}>
                                        download template <Download className="w-4 h-4 ml-2" />
                                    </Button>
                                </DialogDescription>
                            </CardHeader>
                            <CardContent>
                                {onFile ? (
                                    <div className="relative space-y-3 p-4 rounded-lg border-2 border-dashed w-full flex items-center justify-center">
                                        <Button className="flex items-center justify-center" variant="success" onClick={handleFileMultipleUpload} disabled={loading}>
                                            {loading ? (
                                                <Loader2 className="w-5 h-5 animate-spin mx-4" />
                                            ) : "Import"}
                                        </Button>
                                        <X className="absolute text-red-500 -top-2 right-0 cursor-pointer" onClick={() => setOnFile(null)} />
                                    </div>
                                ) : (
                                    <Input type="file" onChange={handleFileChange} />
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>

            <Card className="mt-5">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">No</TableHead>
                                <TableHead>Pertanyaan</TableHead>
                                <TableHead className="text-center">Kunci Jawaban</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Pratinjau</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {(filteredData.length > 0 ? filteredData : []).map((question, index: number) => (
                                <TableRow key={question.id}>
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell>
                                        <div dangerouslySetInnerHTML={{ __html: question.soal }} />
                                    </TableCell>
                                    <TableCell className="text-center font-bold">
                                        {question.kunci_jawaban === "A" ? (
                                            <>
                                                {question.kunci_jawaban}. {question.A}
                                            </>
                                        ) : question.kunci_jawaban === "B" ? (
                                            <>
                                                {question.kunci_jawaban}. {question.B}
                                            </>
                                        ) : question.kunci_jawaban === "C" ? (
                                            <>
                                                {question.kunci_jawaban}. {question.C}
                                            </>
                                        ) : question.kunci_jawaban === "D" ? (
                                            <>
                                                {question.kunci_jawaban}. {question.D}
                                            </>
                                        ) : question.kunci_jawaban === "E" && (
                                            <>
                                                {question.kunci_jawaban}. {question.E}
                                            </>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {question.aktif == true ? (
                                            <Badge className="text-white" variant="success">Aktif <CheckCircle2 className="w-4 h-4 ml-2" /></Badge>
                                        ) : (
                                            <Badge className="text-white" variant="destructive">Non-aktif <XCircle className="w-4 h-4 ml-2" /></Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button size="icon" variant="outline" onClick={() => handleOpenPratinjau(question)}>
                                            <EyeIcon className="w-4 h-4" /></Button>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <div className="flex justify-center space-x-2">
                                            <Button size="icon" variant="outline" asChild>
                                                <Link href={`/dashboard/kelola-soal/sinonim/edit/${question.id}/?id=${question.id}`}>
                                                    <Edit2Icon className="w-4 h-4" />
                                                </Link>
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button size="icon" variant="destructive">
                                                        <Trash2Icon className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Apakah anda yakin menghapus soal ini ?
                                                        </AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
                                                        <AlertDialogAction disabled={loading} onClick={() => handleDeleteSoal(question.id)}>Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={openPratinjau} onOpenChange={setOpenPratinjau}>
                <DialogContent className="max-h-full overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle>Pratinjau</DialogTitle>
                    </DialogHeader>
                    {pratinjau.gambar && pratinjau.gambar !== "null" && pratinjau.gambar !== null && (
                        <div>
                            <Label>Gambar</Label>
                            <div className="flex min-h-[75px] w-full rounded-md border border-input bg-background dark:!bg-boxdark-2 px-3 py-2 text-sm">
                                <div className="w-full flex items-center justify-center">
                                    <Image src={`https://filemanager-e-recruitment.teinsolutions.com${pratinjau.gambar}`} alt="gambar" width={300} height={300} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        <Label>Soal</Label>
                        <div className="flex w-full rounded-md border border-input bg-background dark:!bg-boxdark-2 px-3 py-2 text-sm" dangerouslySetInnerHTML={{ __html: pratinjau.soal }} />
                    </div>
                    <div className="mt-2 w-full">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                                <Label className="flex items-center">A
                                    {pratinjau.kunci_jawaban === 'A' ? (
                                        <CheckCircle2 className="w-3 h-3 ml-2 text-green-500" />
                                    ) : ""}
                                </Label>
                                <Textarea value={pratinjau.A} />
                            </div>
                            <div>
                                <Label className="flex items-center">B
                                    {pratinjau.kunci_jawaban === 'B' ? (
                                        <CheckCircle2 className="w-3 h-3 ml-2 text-green-500" />
                                    ) : ""}
                                </Label>
                                <Textarea value={pratinjau.B} />
                            </div>
                            <div>
                                <Label className="flex items-center">C
                                    {pratinjau.kunci_jawaban === 'C' ? (
                                        <CheckCircle2 className="w-3 h-3 ml-2 text-green-500" />
                                    ) : ""}
                                </Label>
                                <Textarea value={pratinjau.C} />
                            </div>
                            <div>
                                <Label className="flex items-center">D
                                    {pratinjau.kunci_jawaban === 'D' ? (
                                        <CheckCircle2 className="w-3 h-3 ml-2 text-green-500" />
                                    ) : ""}
                                </Label>
                                <Textarea value={pratinjau.D} />
                            </div>
                            <div>
                                <Label className="flex items-center">E
                                    {pratinjau.kunci_jawaban === 'E' ? (
                                        <CheckCircle2 className="w-3 h-3 ml-2 text-green-500" />
                                    ) : ""}
                                </Label>
                                <Textarea value={pratinjau.E!} />
                            </div>
                        </div>

                        <div className="mt-2 w-full flex items-center justify-between">
                            <div>
                                <Label className="font-bold">Kunci Jawaban : {pratinjau.kunci_jawaban}</Label>
                            </div>
                            <div>
                                <Label>Status : {pratinjau.aktif === true ? "Aktif" : "Tidak Aktif"}</Label>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}