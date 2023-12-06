import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest){

    const { profession } = await req.json();

    try {
        const response = await prisma.question_banks.findMany({
            where: {
                category: profession
            }
        });
        if(!response) return NextResponse.json({
            message: `kategori pertanyaan dengan profesi : ${profession} tidak ditemukan`
        }, {
            status: 404
        });

        return NextResponse.json(response, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'terjadi kesalahan server saat mendapatkan data pertanyaan',
            error: error
        }, {
            status: 500
        })
    }
}