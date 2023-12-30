"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
    DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle2, Edit2Icon, EyeIcon, FileQuestionIcon, Plus, SearchIcon, Trash2Icon, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { SoalTKBProps } from "@/types"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

interface dataTableProps {
    questionData: SoalTKBProps[]
}

export const DataTable = ({ questionData }: dataTableProps) => {

    const [openPratinjau, setOpenPratinjau] = useState(false);
    const router = useRouter();

    const [pratinjau, setPratinjau] = useState<SoalTKBProps>({
        id: 0,
        soal: "",
        a: "",
        b: "",
        c: "",
        point_a: "",
        point_b: "",
        point_c: "",
        kunci_jawaban: "",
        gambar: "",
        isAktif: "",
        createdAt: "",
        updatedAt: "",
    });

    const handleOpenPratinjau = (data: SoalTKBProps) => {
        setOpenPratinjau(true);
        setPratinjau(data)
    }

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState<SoalTKBProps[]>([]);

    const handleSearch = () => {
        const searchData = questionData.filter(
            (question) =>
                question.soal.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(searchData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        console.log("value", e.target.value)
        setSearchQuery(query);
        if (query === "") {
            setFilteredData([]);
        } else {
            handleSearch();
        }
    };


    return (
        <div className="w-full">
            <Card>
                <CardContent className="p-2">
                    <div className="w-full flex items-center justify-between space-x-8">
                        <Button className="text-white" onClick={() => router.push('/dashboard/kelola-soal/tkb/add')}>Tambah Soal <Plus className="w-4 h-4 ml-2" /></Button>
                        <div className="w-full flex items-center space-x-1">
                            <Input
                                type="search"
                                placeholder="search..."
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            <Button className="text-white" size="icon" onClick={handleSearch}>
                                <SearchIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-5">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">No</TableHead>
                                <TableHead>Pertanyaan</TableHead>
                                <TableHead className="text-center">Gambar</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Pratinjau</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(filteredData.length > 0 ? filteredData : questionData).map((question, index: number) => (
                                <TableRow key={question.id}>
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell>
                                        <div dangerouslySetInnerHTML={{ __html: question.soal }} />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {question.gambar === "null" || question.gambar === null ? (
                                            <span className="text-[10px] text-muted-foreground">
                                                no image
                                            </span>
                                        ) : (
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Image src={`https://filemanager-e-recruitment.teinsolutions.com${question.gambar}`} alt='gambar soal' width={50} height={50} />

                                                </DialogTrigger>
                                                <DialogContent className="w-full flex items-center justify-center">
                                                    <Image src={`https://filemanager-e-recruitment.teinsolutions.com${question.gambar}`} alt='gambar soal' width={250} height={250} />
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {question.isAktif === "True" ? (
                                            <Button className="text-white" variant="status">Aktif <CheckCircle2 className="w-4 h-4 ml-2" /></Button>
                                        ) : (
                                            <Button className="text-white" variant="destructive">Non-aktif <XCircle className="w-4 h-4 ml-2" /></Button>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button size="icon" variant="outline" onClick={() => handleOpenPratinjau(question)}>
                                            <EyeIcon className="w-4 h-4" /></Button>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center space-x-2">
                                            <Button size="icon" variant="outline"><Edit2Icon className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="destructive"><Trash2Icon className="w-4 h-4" /></Button>
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
                    <div>
                        <Label>Gambar</Label>
                        <div className="flex min-h-[75px] w-full rounded-md border border-input bg-background dark:!bg-boxdark-2 px-3 py-2 text-sm">
                            {pratinjau.gambar === 'null' ? (
                                <div className="w-full flex items-center justify-center">
                                    <p className="flex items-center text-muted-foreground">
                                        <FileQuestionIcon className="w-3 h-3 text-muted-foreground mr-2" />
                                        soal tidak memiliki gambar
                                    </p>
                                </div>
                            ) : (
                                <div className="w-full flex items-center justify-center">
                                    <p className="text-muted-foreground">gambar soal</p>
                                </div>
                            )}
                        </div>
                    </div>
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
                                <Textarea value={pratinjau.a} />
                            </div>
                            <div>
                                <Label className="flex items-center">B
                                    {pratinjau.kunci_jawaban === 'B' ? (
                                        <CheckCircle2 className="w-3 h-3 ml-2 text-green-500" />
                                    ) : ""}
                                </Label>
                                <Textarea value={pratinjau.b} />
                            </div>
                            <div>
                                <Label className="flex items-center">C
                                    {pratinjau.kunci_jawaban === 'C' ? (
                                        <CheckCircle2 className="w-3 h-3 ml-2 text-green-500" />
                                    ) : ""}
                                </Label>
                                <Textarea value={pratinjau.c} />
                            </div>

                        </div>

                        <div className="mt-2 w-full flex items-center justify-between">
                            <div>
                                <Label>Kunci Jawaban : {pratinjau.kunci_jawaban}</Label>
                            </div>
                            <div>
                                <Label>Status : {pratinjau.isAktif === "True" ? "Aktif" : "Tidak Aktif"}</Label>
                            </div>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>

        </div>
    )
}