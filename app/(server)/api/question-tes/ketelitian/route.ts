import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const result = await prisma.soalKetelitian.findMany({
            where: {
                aktif: true
            },
            select: {
                id: true,
                soal: true,
                gambar: true,
            }
        });
        return NextResponse.json(result, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: error
        }, {
            status: 500
        })
    }
}