import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {

    const { id } = await req.json();

    try {
        const category = await prisma.questionCategory.findUnique({
            where: {
                id: id
            }
        });

        if(!category) return NextResponse.json({
            message: 'kategori tidak ditemukan'
        }, {
            status: 404
        });

        return NextResponse.json(category, {
           status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'terjadi kesalahan saat mendapatkan kategori dengan id'
        }, {
            status: 500
        })
    }
}