import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {

    const { id, category } = await req.json();

    const question = await prisma.questionCategory.findUnique({
        where: {
            id: id
        }
    });

    if(!question) return NextResponse.json({
        message: 'kategori tidak ditemukan'
    }, {
        status: 404
    })

    try {
        const response = await prisma.questionCategory.update({
            where: {
                id: question.id
            },
            data: {
                name: category,
                updatedAt: new Date(Date.now()).toString()
            }
        });

        return NextResponse.json(response, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'terjadi kesalahan server saat update kategori',
            error: error
        }, {
            status: 500
        })
    }
}