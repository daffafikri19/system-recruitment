import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const { id } = await req.json();
    
    try {
        const question = await prisma.soalSinonim.findUnique({
            where: {
                id: id
            }
        });

        if(!question) {
            return NextResponse.json({
                message: 'ID Soal tidak ditemukan'
            }, {
                status: 404
            })
        }

        return NextResponse.json(question, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "Terjadi kesalahan server saat edit soal"
        }, {
            status: 500
        })
    }
}