"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTestPageStore } from "./context-wrapper"
import { settinganSoal } from "@prisma/client"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"


export const InformasiTesCard = () => {
    const { setCurrentPage } = useTestPageStore();
    const [settings, setSettings] = useState<settinganSoal>();
    const router = useRouter();
    const getTestInformation = async () => {
        try {
            const response = await axios.get('/api/settingan-soal/get');
            setSettings(response.data[0])
            console.log(response.data[0])
            return response.data
        } catch (error) {
            toast({
                title: 'Terjadi kesalahan server',
                variant: 'destructive'
            })
        }
    }

    useEffect(() => {
        getTestInformation();
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('w-verbal', settings?.waktu_pengerjaan_verbal.toString() || "1200")
            localStorage.removeItem('j-verbal')
        }
        console.log('data setting', settings);
    }, []);

    const handleStartTest = () => {
        setCurrentPage('verbal');
        router.push('/tes/psikotest?p=1')
    }

    return (
        <>
            <Card>
                <CardHeader className='w-full flex items-center justify-center'>
                    <CardTitle>Informasi Tes Psikotes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="truncate">
                                <TableHead colSpan={1} className='text-center'>No</TableHead>
                                <TableHead colSpan={1} className='text-center'>Nama Tes</TableHead>
                                <TableHead colSpan={2} className='text-center'>Peraturan</TableHead>
                                <TableHead colSpan={2} className='text-left'>Waktu Pengerjaan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="text-center">Verbal</TableCell>
                                <TableCell>
                                    Pilihlah satu jawaban yang paling tepat pada kata-kata yang disediakan. Kemudian, kotak di depan nomor soal, diisi dengan huruf A, B, C, D, atau E sebagai pilihan jawaban anda. <br /> Kerjakan dengan cepat dan teliti, karena waktu yang diberikan cukup terbatas, yaitu {settings?.waktu_pengerjaan_verbal! / 60} menit. Bila waktunya sudah {settings?.waktu_pengerjaan_verbal! / 60} menit, segera berhenti atau otomatis menyimpan jawaban anda karena waktu habis.
                                </TableCell>
                                <TableCell colSpan={2} className="text-center">{settings?.waktu_pengerjaan_verbal! / 60} menit</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={5} className="text-right">
                                    <Button onClick={handleStartTest}>
                                        Mulai Tes
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}