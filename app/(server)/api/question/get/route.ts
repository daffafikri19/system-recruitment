import prisma from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response =  await prisma.question_banks.findMany();

        return NextResponse.json(response, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json(error, {
            status: 200
        })
    }
}