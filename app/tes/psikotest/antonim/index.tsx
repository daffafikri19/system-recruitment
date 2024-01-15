"use client"
import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ItemSoal } from "./item-soal"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { settinganSoal } from "@prisma/client"

export const AntonimTes = () => {
    const [settings, setSettings] = useState<settinganSoal>();

    useEffect(() => {
        const getSettinganSoal = async () => {
            try {
                const response = await axios.get('/api/settingan-soal/get');
                setSettings(response.data[0])
                return response.data
            } catch (error) {
                toast({
                    title: "Terjadi kesalahan server saat mendapatkan data pengaturan",
                    variant: 'destructive'
                })
            }
        }
        getSettinganSoal();
    }, []);

    return (
        <Card>
            <CardContent>
                <ItemSoal id_user={"clq4bdbrv0001etghj6ye600w"} max_soal={settings?.max_soal_antonim} title="Tes Antonim (Lawan Kata)" waktu_pengerjaan={settings?.waktu_pengerjaan_antonim} />
            </CardContent>
        </Card>
    )
}