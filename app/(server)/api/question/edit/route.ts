import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { id, question, type, category, required } = await req.json();

    const questions = await prisma.question_banks.findUnique({
        where: {
            id: id
        }
    })

    if(!questions) return NextResponse.json({
        message: `pertanyaan tidak ditemukan`
    }, {
        status: 404
    })

    try {
        await prisma.question_banks.update({
            where: {
                id: questions.id
            },
            data: {
                question: question,
                type: type,
                required: required,
                updatedAt: new Date(Date.now()).toString(),
                category: {
                    update: {
                        where: {
                            name: category
                        },
                        data: {
                            name: category,
                            updatedAt: new Date(Date.now()).toString()
                        }
                    }
                }
            }
        });
        return NextResponse.json({
            message: "berhasil edit pertanyaan ini",
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