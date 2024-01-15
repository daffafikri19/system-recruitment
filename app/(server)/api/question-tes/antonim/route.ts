import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const {
        tipe_soal
    } = await req.json();

    try {
        if (tipe_soal === 'sulit') {
            const result = await prisma.soalAntonim.findMany();
            return NextResponse.json(result, {
                status: 200
            })
        } else if (tipe_soal === 'mudah') {
            const result = await prisma.soalAntonim.findMany({
                where: {
                    E: undefined || null
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