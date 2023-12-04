"use server"

import prisma from "@/lib/utils/prisma"
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const createNewQuestion = async (FormData: FormData) => {
    try {
    const question = FormData.get('question');
    const type = FormData.get('type');
    const category = FormData.get('category');
    const required = FormData.get('required');
    await prisma.question_banks.create({
        data: {
            question: question as string,
            type: type as any,
            category: category as string,
            required: Boolean(required),
            createdAt: new Date(Date.now()).toLocaleString(),
            updatedAt: new Date(Date.now()).toLocaleString(),
        }
    });
    revalidatePath('/dashboard/question-banks')
    } catch (error) {
      return NextResponse.json(error, {
        status: 500
      })  
    }
}