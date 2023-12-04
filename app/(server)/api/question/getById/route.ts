import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { id } = await req.json();

    try {
        const question = await prisma.question_banks.findUnique({
            where: {
                id: id
            }
        });

        if(!question) return NextResponse.json({
            message: `data soal dengan id ${id} tidak ditemukan`
        });

        return NextResponse.json(question, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json(error, {
            status: 200
        })
    }
}