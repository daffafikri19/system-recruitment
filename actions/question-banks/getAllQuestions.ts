"use server"

import prisma from "@/lib/utils/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const getAllQuestion = async () => {
    try {
        const response = await prisma.question_banks.findMany({
            include: {
                _count: true,
                answer: true
            }
        });
        revalidatePath('/dashboard/question-banks')
    } catch (error) {
        NextResponse.json(error, {
            status: 500
        })
    }
}