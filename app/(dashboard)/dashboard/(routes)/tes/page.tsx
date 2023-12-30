import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import prisma from '@/lib/utils/prisma'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const TesPage = async () => {
    const dataSettings = await prisma.tes_settings.findMany();

    return (
        <>
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
                            {dataSettings.map((data) => (
                                <React.Fragment key={data.id}>
                                    <TableRow className='text-center'>
                                        <TableCell className='max-w-md' rowSpan={6} dangerouslySetInnerHTML={{ __html: data.peraturan }} />
                                    </TableRow>
                                    <TableRow className='text-end'>
                                        <TableCell>Tes 1</TableCell>
                                        <TableCell>{data.waktu_pengerjaan_tes_1} menit</TableCell>

                                    </TableRow>
                                    <TableRow className='text-end'>
                                        <TableCell>Tes 2</TableCell>
                                        <TableCell>{data.waktu_pengerjaan_tes_2} menit</TableCell>
                                    </TableRow>
                                    <TableRow className='text-end'>
                                        <TableCell>Tes 3</TableCell>
                                        <TableCell>{data.waktu_pengerjaan_tes_3} menit</TableCell>
                                    </TableRow>
                                    <TableRow className='text-end'>
                                        <TableCell>Tes 4</TableCell>
                                        <TableCell>{data.waktu_pengerjaan_tes_4} menit</TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4} className="text-right">
                                    <Button className='text-white' asChild>
                                        <Link href={"/dashboard/tes/soal-tes/?tes=1"}>
                                            Mulai Tes
                                        </Link>
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

export default TesPage