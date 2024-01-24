"use client"
import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ItemSoal } from "./item-soal"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { settinganSoal } from "@prisma/client"
import { useSession } from "next-auth/react"

export const AntonimSinonimTes = () => {
    const [settings, setSettings] = useState<settinganSoal>();
    const { data: session, status } = useSession();

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
                <ItemSoal 
                id_user={session?.user.id} 
                max_soal={settings?.max_soal_antonim_sinonim} 
                title="Tes Antonim - Sinonim" 
                waktu_pengerjaan={settings?.waktu_pengerjaan_antonim_sinonim} />
            </CardContent>
        </Card>
    )
}