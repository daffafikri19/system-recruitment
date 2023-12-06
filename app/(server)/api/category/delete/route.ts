import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { id } = await req.json()

    try {
        const question = await prisma.questionCategory.delete({
            where: {
                id: id
            }
        })

        if(!question) return NextResponse.json({
            message: "kategori tidak ditemukan"
        }, {
            status: 404
        });

        return NextResponse.json({
            message: 'berhasil delete kategori pertanyaan ini'
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'terjadi kesalahan server saat menghapus kategori'
        }, {
            status: 500
        })
    }
}