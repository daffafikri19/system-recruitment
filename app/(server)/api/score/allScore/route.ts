import prisma from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const result = await prisma.scoreTotalPsikotest.findMany({
            include: {
                user: true,
                scoreAntonim: true,
                scoreAntonimSinonim: true,
                scoreDeretAngka: true,
                scoreHitungCepat: true,
                scoreInformasiSingkat: true,
                scoreInggris: true,
                scoreKalimatTakTeratur: true,
                scoreKemampuanTeknikal: true,
                scoreKepribadian: true,
                scoreKetelitian: true,
                scoreKuantitatifAnalisis: true,
                scorePenalaranAnalitik: true,
                scorePenalaranLogis: true,
                scoreSinonim: true,
                scoreVerbal: true
            }
        });
        return NextResponse.json(result, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'Terjadi kesalahan server saat mendapatkan data tes peserta'
        }, {
            status: 500
        })
    }
}