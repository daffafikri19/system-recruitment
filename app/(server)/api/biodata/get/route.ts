import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {

    const { username } = await req.json();

    try {
        const biodata = await prisma.biodataUser.findUnique({
            where: {
                nama_lengkap: username
            }
        })

        // if(!biodata) return NextResponse.json({
        //     message: "biodata tidak ditemukan"
        // }, {
        //     status: 401,
        //     statusText: 'unauthorize'
        // });

        return NextResponse.json(biodata, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "terjadi kesalahan server",
            error: error
        }, {
            status: 500,
            statusText: 'error'
        })
    }
}