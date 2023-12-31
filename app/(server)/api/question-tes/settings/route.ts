import prisma from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await prisma.settinganSoal.findFirst();
        return NextResponse.json(result, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'Terjadi kesalahan server saat mendapatkan data peraturan'
        }, {
            status: 500
        })
    }
}