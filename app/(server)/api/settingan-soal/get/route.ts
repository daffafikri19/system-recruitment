import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const result = await prisma.settinganSoal.findMany();
        return NextResponse.json(result, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            message: "Terjadi kesalahan server saat mendapatkan data settingan soal",
            error: error
        }, {
            status: 500
        })   
    }
}