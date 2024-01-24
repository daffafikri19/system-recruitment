"use client"

import React, { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ActionsButton } from "../biodata/actions-button"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { ScoreTotalPsikotestProps } from "@/types"

export const DataTable = () => {

    const [data, setData] = useState<ScoreTotalPsikotestProps[]>([])

    useEffect(() => {
        const getUserTesData = async () => {
            try {
                const response = await axios.get('/api/score/allScore');
                setData(response.data)
                console.log(response.data)
                return response.data
            } catch (error) {
                toast({
                    title: 'Terjadi kesalahan server saat mendapatkan data tes peserta',
                    variant: 'destructive'
                })
            }
        }

        getUserTesData();
    }, [])

    return (
        <div>
            <Table>
                {data.length <= 0 && (
                    <TableCaption>Tidak ada data yang ditampilkan</TableCaption>
                )}
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">No</TableHead>
                        <TableHead>Peserta</TableHead>
                        <TableHead className="text-center">Score total</TableHead>
                        <TableHead className="text-center">Rata - rata</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index: number) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-center">{index + 1}</TableCell>
                            <TableCell>
                                {item.user.name}
                            </TableCell>
                            <TableCell className="text-center">Credit Card</TableCell>
                            <TableCell className="text-center">$250.00</TableCell>
                            <TableCell className="text-center">
                                <ActionsButton />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}