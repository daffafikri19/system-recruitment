"use server"

import { NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma";
import { revalidatePath } from "next/cache";

export const deleteQuestion = async (id: string) => {

    const existingQuestion = await prisma.question_banks.findUnique({
        where: {
            id: id
        }
    });

    if(!existingQuestion) return NextResponse.json(`data soal dengan id : ${id} tidak ditemukan`, {
        status: 404
    });

    try {
        await prisma.question_banks.delete({
            where: {
                id: existingQuestion.id
            },
        });

        revalidatePath('/dashboard/question-banks')
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}