"use server"

import { NextResponse } from "next/server"
import prisma from "@/lib/utils/prisma";
import { revalidatePath } from "next/cache";

export const updateQuestion = async (formdata: FormData, id: string) => {
    const question = formdata.get('question');
    const type = formdata.get('type');
    const category = formdata.get('category');
    const required = formdata.get('required');

    const existingQuestion = await prisma.question_banks.findUnique({
        where: {
            id: id
        }
    });

    if(!existingQuestion) return NextResponse.json(`data soal dengan id : ${id} tidak ditemukan`, {
        status: 404
    });

    try {
        await prisma.question_banks.update({
            where: {
                id: existingQuestion.id
            },
            data: {
                question: question as string,
                type: type as any,
                category: category as string,
                required: Boolean(required),
                updatedAt: new Date(Date.now()).toLocaleString()
            }
        });

        revalidatePath('/dashboard/question-banks')
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}