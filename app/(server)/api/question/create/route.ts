import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { question, type, required, category } = await req.json();

    try {
        const response = await prisma.question_banks.create({
            data: {
                question,
                type: type,
                required: required,
                createdAt: new Date(Date.now()).toString(),
                updatedAt: new Date(Date.now()).toString(),
                category: {
                    connect: {
                        name: category
                    }    
                }
            }
        });

        return NextResponse.json(response, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'terjadi kesalahan server saat membuat pertanyaan baru'
        }, {
            status: 500
        })
    }
}