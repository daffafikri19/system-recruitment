import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    try {
        const question = await prisma.question_banks.delete({
            where: {
                id: id
            }
        });

        if(!question) return NextResponse.json({
            message: `pertanyaan dengan id ${id} tidak ditemukan`
        }, {
            status: 404
        })
        return NextResponse.json({
            message: 'berhasil menghapus pertanyaan'
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'terjadi kesalahan server saat menghapus pertanyaan',
            error: error
        }, {
            status: 500
        })
    }
}