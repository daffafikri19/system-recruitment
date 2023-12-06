import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { name } = await req.json();
    try {
        const response = await prisma.questionCategory.create({
            data: {
                name: name,
                createdAt: new Date(Date.now()).toString(),
                updatedAt: new Date(Date.now()).toString(),
            }
        });
        return NextResponse.json(response, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json({
            message: 'terjadi kesalahan saat membuat kategori pertanyaan baru',
            error: error
        }, {
            status: 500
        })
    }
}