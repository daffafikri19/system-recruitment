import prisma from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await prisma.soalTPA.findMany();
        return NextResponse.json(result);
        
    } catch (error) {
        return NextResponse.json({
            message: "Terjadi kesalahan server saat mendapatkan data soal tes 1"
        }, {
            status: 500
        })
    }
}