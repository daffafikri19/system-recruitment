import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { user_id } =  await req.json();

    try {
        const result = await prisma.dokumenUser.findUnique({
            where: {   
                user_id: user_id
            },
            include: {
                biodata: true
            }
        });
        return NextResponse.json(result, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "Terjadi kesalahan server saat mendapatkan data dokumen",
            error: error
        }, {
            status: 500
        })
    }
}