import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const {
        tipe_soal
    } = await req.json();

    try {
        if (tipe_soal === 'sulit') {
            const result = await prisma.soalVerbal.findMany({
                select: {
                    soal: true,
                    A: true,
                    B: true,
                    C: true,
                    D: true,
                    E: true,
                    gambar: true,   
                }
            });
            return NextResponse.json(result, {
                status: 200
            })
        } else if (tipe_soal === 'mudah') {
            const result = await prisma.soalVerbal.findMany({
                where: {
                    E: undefined || null
                },
                select: {
                    soal: true,
                    A: true,
                    B: true,
                    C: true,
                    D: true,
                    E: true,
                    gambar: true,   
                }
            });
            return NextResponse.json(result, {
                status: 200
            })
            
        }
    } catch (error) {
        return NextResponse.json({
            message: error
        }, {
            status: 500
        })
    }
}