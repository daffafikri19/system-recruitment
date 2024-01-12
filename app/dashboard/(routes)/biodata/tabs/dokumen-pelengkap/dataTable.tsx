"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { dokumenUser } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { ActionsButton } from "../../_components/actions-button"
import { FileManagerUploader } from "@/app/dashboard/components/FileManager/upload"
import { FileManagerOpener } from "@/app/dashboard/components/FileManager/open"
import { toast } from "@/components/ui/use-toast"
import { useLoadingContext } from "@/lib/providers/loadingStateProvider"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import { revalidatePath } from "next/cache"
import { CheckCircle2Icon } from "lucide-react"


interface tableDataProps {
    username: string
    id: string
}

interface documenArrayProps {
    nama_berkas: string,
    filename: keyof dokumenUser,
}

export const DocumentArray: documenArrayProps[] | [] = [
    {
        nama_berkas: "Curiculum Vitae",
        filename: "cv",
    },
    {
        nama_berkas: "Pas Foto",
        filename: "pas_foto",
    },
    {
        nama_berkas: "Kartu Tanda Penduduk",
        filename: "ktp",
    },
    {
        nama_berkas: "npwp",
        filename: "npwp",
    },
    {
        nama_berkas: "Surat Izin Mengemudi",
        filename: "sim",
    },
    {
        nama_berkas: "Ijazah Terakhir",
        filename: "ijazah",
    },
    {
        nama_berkas: "Transkrip Nilai",
        filename: "transkrip_nilai",
    },
    {
        nama_berkas: "Kartu Keluarga",
        filename: "kartu_keluarga",
    },
    {
        nama_berkas: "SKCK",
        filename: "skck",
    },
    {
        nama_berkas: "Kartu Kuning",
        filename: "kartu_kuning",
    },
    {
        nama_berkas: "Surat Pengalaman Kerja",
        filename: "surat_pengalaman_kerja",
    },
    {
        nama_berkas: "Akta Kelahiran",
        filename: "akta_kelahiran",
    },
    {
        nama_berkas: "Sertifikat Keahlian",
        filename: "sertifikat_keahlian",
    },
    {
        nama_berkas: "Sertifikat Bahasa",
        filename: "sertifikat_bahasa",
    },
    {
        nama_berkas: "Buku Nikah",
        filename: "buku_nikah",
    },
]

export const TableData = ({ username, id }: tableDataProps) => {
    const [openValidationDialog, setOpenValidationDialog] = useState(false);
    const { loading, setLoading } = useLoadingContext();
    const [contentData, setContentData] = useState<dokumenUser>({
        id: "",
        user_id: "",
        ktp: "",
        npwp: "",
        sim: "",
        ijazah: "",
        transkrip_nilai: "",
        kartu_keluarga: "",
        skck: "",
        kartu_kuning: "",
        surat_pengalaman_kerja: "",
        akta_kelahiran: "",
        cv: "",
        pas_foto: "",
        sertifikat_bahasa: "",
        sertifikat_keahlian: "",
        buku_nikah: "",
        createdAt: "",
        updatedAt: ""
    });

    const [detailContent, setDetailContent] = useState<dokumenUser>({
        id: "",
        user_id: "",
        ktp: "",
        npwp: "",
        sim: "",
        ijazah: "",
        transkrip_nilai: "",
        kartu_keluarga: "",
        skck: "",
        kartu_kuning: "",
        surat_pengalaman_kerja: "",
        akta_kelahiran: "",
        cv: "",
        pas_foto: "",
        sertifikat_bahasa: "",
        sertifikat_keahlian: "",
        buku_nikah: "",
        createdAt: "",
        updatedAt: ""
    });

    useEffect(() => {
        const getData = async () => {
            try {
                await axios.post('/api/biodata/document/get', {
                    user_id: id
                }).then(result => {
                    setContentData(result.data)
                    console.log('result', result.data)
                });
            } catch (error: any) {
                toast({
                    title: error.data.message,
                    variant: error.status === 200 ? "default" : "destructive"
                });
            }
        }
        getData();
    }, [id, contentData]);

    const handleFileUploaded = async (file: any, filename: string) => {
        console.log("file uploaded", file);
        console.log("filename", filename);

        try {
            setLoading(true)
            const response = await axios.post('/api/biodata/document/upsert', {
                filename: filename,
                file: file,
                username: username
            });

            toast({
                title: response.data.message,
            });
            setLoading(false);
            console.log("response data", response.data)
            revalidatePath('/dashboard/biodata');
            return response.data
        } catch (error: any) {
            if (error) {
                toast({
                    title: "Terjadi kesalahan server saat menyimpan berkas",
                    variant: "destructive"
                });
                setLoading(false)
            }
        }
    }

    const handleFileSelected = (file: any) => {
        console.log("file")
    }

    return (
        <div>
            <div>
                <FileManagerOpener onFileSelected={handleFileSelected} />
            </div>
            <Table>
                <TableHeader className='bg-primary w-full'>
                    <TableRow className="!text-white truncate">
                        <TableHead className="text-white">No</TableHead>
                        <TableHead className="text-white">Nama Berkas</TableHead>
                        <TableHead className="text-white text-center">Status</TableHead>
                        <TableHead className="text-center text-white">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {DocumentArray.map((document, index: number) => (
                        <TableRow key={document.filename}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{document.nama_berkas}</TableCell>
                            <TableCell>
                                {contentData !== null ? (
                                    contentData[document.filename] as keyof dokumenUser ? (
                                        <div className="w-full flex items-center justify-center">
                                            <Button variant="success">Sudah Upload <CheckCircle2Icon className="w-5 h-5 ml-2" /></Button>
                                        </div>
                                    ) : (
                                        <>
                                            {loading ? (
                                                <Skeleton className="w-full h-10 animate-pulse" />
                                            ) : (
                                                <FileManagerUploader
                                                    filename={document?.filename || ""}
                                                    username={username}
                                                    onFileSelected={handleFileUploaded}
                                                />
                                            )}
                                        </>
                                    )
                                ) : (
                                    <>
                                    {loading ? (
                                        <Skeleton className="w-full h-10 animate-pulse" />
                                    ) : (
                                        <FileManagerUploader
                                            filename={document?.filename || ""}
                                            username={username}
                                            onFileSelected={handleFileUploaded}
                                        />
                                    )}
                                </>
                                )}

                            </TableCell>
                            <TableCell className="text-right">
                                <ActionsButton
                                    onPreview={() => { }}
                                    onEdit={() => { }}
                                    openDialog={openValidationDialog}
                                    onOpenDialog={setOpenValidationDialog}
                                    alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                    alertLabelCancel="Batal"
                                    alertLabelAction="Hapus"
                                    onDelete={() => { }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}