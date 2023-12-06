import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function GET(){
    try {
        const response = await prisma.questionCategory.findMany();
        return NextResponse.json(response, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}