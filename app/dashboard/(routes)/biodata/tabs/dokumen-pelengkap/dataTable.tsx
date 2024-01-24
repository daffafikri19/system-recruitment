"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React, { useEffect, useState } from "react"
import { dokumenUser } from "@prisma/client"
import { ActionsButton } from "../../actions-button"
import { toast } from "@/components/ui/use-toast"
import { useLoadingContext } from "@/lib/providers/loadingStateProvider"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import { FileManagerOpener } from "../../../../components/FileManager/open"
import { FileManagerUploader } from "../../../../components/FileManager/upload"
import { UploadAktaKelahiran, UploadBukuNikah, UploadCV, UploadIjazah, UploadKK, UploadKartuKuning, UploadKtp, UploadNPWP, UploadPasFoto, UploadSB, UploadSIM, UploadSK, UploadSKCK, UploadSPK, UploadTranskripNilai } from "@/actions/mutations/dokumen/uploadDokumenUser"
import { Badge } from "@/components/ui/badge"
import { deleteKTP } from "@/actions/mutations/dokumen/deleteDokumenUser"


interface tableDataProps {
    username: string
    user_id: string
    data: dokumenUser
}

export const TableData = ({ username, user_id, data }: tableDataProps) => {
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

    const [ktpFile, setKtpFile] = useState("");

    useEffect(() => {
        if(data) {
            setContentData(data);
            setKtpFile(data.ktp || "")
            console.log('result', data)
        }
    }, []);

    
    const handleFileUploadedCV = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadCV(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedKTP = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadKtp(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedNPWP = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadNPWP(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedSIM = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadSIM(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedIjazah = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadIjazah(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedTranskripNilai = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadTranskripNilai(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedKK= async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadKK(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedSKCK = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadSKCK(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedKartuKuning = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadKartuKuning(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedSPK= async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadSPK(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedAkta = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadAktaKelahiran(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedPasFoto = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadPasFoto(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedSK = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadSK(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedSB = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadSB(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    const handleFileUploadedBukuNikah = async (file: any, filename: string) => {
        setLoading(true)
        const res = await UploadBukuNikah(file, username);
        setLoading(false);
        toast({
            title: res.message,
            variant: res.status === 200 ? "default" : "destructive"
        });
    }

    // const handleDeleteFile = async (file: any) => {
    //     if (ktpFile !== "" || undefined || null) {
    //         setLoading(true)
    //         const res = await deleteKTP(username, file)
    //         setLoading(false)

    //         toast({
    //             title: res.message,
    //             variant: res.status === 200 ? "default" : "destructive"
    //         });

    //     } else {
    //         toast({
    //             title: 'Anda belum upload ktp',
    //             variant: 'destructive'
    //         });
    //         return
    //     }
    // }

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
                        <TableHead className="text-white text-center">No</TableHead>
                        <TableHead className="text-white">Nama Berkas</TableHead>
                        <TableHead className="text-white text-center">Status</TableHead>
                        <TableHead className="text-center text-white">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="text-center">1</TableCell>
                        <TableCell>Curiculum Vitae</TableCell>
                        <TableCell className="text-center">
                            {contentData.cv !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"cv"}
                                    username={username}
                                    onFileSelected={handleFileUploadedCV}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">2</TableCell>
                        <TableCell>KTP</TableCell>
                        <TableCell className="text-center">
                            {contentData.ktp !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"ktp"}
                                    username={username}
                                    onFileSelected={handleFileUploadedKTP}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">3</TableCell>
                        <TableCell>NPWP</TableCell>
                        <TableCell className="text-center">
                            {contentData.npwp !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"npwp"}
                                    username={username}
                                    onFileSelected={handleFileUploadedNPWP}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">4</TableCell>
                        <TableCell>SIM</TableCell>
                        <TableCell className="text-center">
                            {contentData.sim !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"sim"}
                                    username={username}
                                    onFileSelected={handleFileUploadedSIM}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">5</TableCell>
                        <TableCell>Ijazah</TableCell>
                        <TableCell className="text-center">
                            {contentData.ijazah !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"ijazah"}
                                    username={username}
                                    onFileSelected={handleFileUploadedIjazah}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">6</TableCell>
                        <TableCell>Transkrip Nilai</TableCell>
                        <TableCell className="text-center">
                            {contentData.sim !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"transkrip_nilai"}
                                    username={username}
                                    onFileSelected={handleFileUploadedTranskripNilai}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">7</TableCell>
                        <TableCell>Kartu Keluarga</TableCell>
                        <TableCell className="text-center">
                            {contentData.sim !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"kartu_keluarga"}
                                    username={username}
                                    onFileSelected={handleFileUploadedKK}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">8</TableCell>
                        <TableCell>SKCK</TableCell>
                        <TableCell className="text-center">
                            {contentData.skck !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"skck"}
                                    username={username}
                                    onFileSelected={handleFileUploadedSKCK}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">9</TableCell>
                        <TableCell>Kartu Kuning</TableCell>
                        <TableCell className="text-center">
                            {contentData.kartu_kuning !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"kartu_kuning"}
                                    username={username}
                                    onFileSelected={handleFileUploadedKartuKuning}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">10</TableCell>
                        <TableCell>Surat Pengalaman Kerja</TableCell>
                        <TableCell className="text-center">
                            {contentData.surat_pengalaman_kerja !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"surat_pengalaman_kerja"}
                                    username={username}
                                    onFileSelected={handleFileUploadedSPK}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">11</TableCell>
                        <TableCell>Akta Kelahiran</TableCell>
                        <TableCell className="text-center">
                            {contentData.akta_kelahiran !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"akta_kelahiran"}
                                    username={username}
                                    onFileSelected={handleFileUploadedAkta}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">12</TableCell>
                        <TableCell>Pas Foto</TableCell>
                        <TableCell className="text-center">
                            {contentData.pas_foto !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"pas_foto"}
                                    username={username}
                                    onFileSelected={handleFileUploadedPasFoto}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">13</TableCell>
                        <TableCell>Sertifikat Keahlian</TableCell>
                        <TableCell className="text-center">
                            {contentData.sertifikat_keahlian !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"sertifikat_keahlian"}
                                    username={username}
                                    onFileSelected={handleFileUploadedSK}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">14</TableCell>
                        <TableCell>Sertifikat Bahasa</TableCell>
                        <TableCell className="text-center">
                            {contentData.sertifikat_bahasa !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"sertifikat_bahasa"}
                                    username={username}
                                    onFileSelected={handleFileUploadedSB}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-center">15</TableCell>
                        <TableCell>Buku Nikah</TableCell>
                        <TableCell className="text-center">
                            {contentData.buku_nikah !== null || undefined || "" ? (
                                <Badge variant="success">Sudah Upload</Badge>
                            ) : (
                                loading ? (
                                    <Skeleton className="w-20 h-10" />
                                ) : (
                                    <FileManagerUploader
                                    filename={"buku_nikah"}
                                    username={username}
                                    onFileSelected={handleFileUploadedBukuNikah}
                                />
                                )
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <ActionsButton
                                onEdit={() => { }}
                                openDialog={openValidationDialog}
                                onOpenDialog={setOpenValidationDialog}
                                alertTitle="Apakah Anda Yakin Mengapus Data Ini ?"
                                alertLabelCancel="Batal"
                                alertLabelAction="Hapus"
                                onDelete={() => {}}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}