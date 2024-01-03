"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useTestPageStore } from "./context-wrapper"

export const InformasiTesCard = () => {

    const { setCurrentPage } = useTestPageStore();

    return (
        <Card>
            <CardHeader className='w-full flex items-center justify-center'>
                <CardTitle>Informasi Tes</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead colSpan={2} className='text-center'>Peraturan</TableHead>
                            <TableHead colSpan={2} className='text-left'>Waktu Pengerjaan Soal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} className="text-right">
                                <Button className='text-white' asChild onClick={() => setCurrentPage('verbal')}>
                                    <Link href={"/tes/psikotest/?p=1"}>
                                        Mulai Tes
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    )
}