import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { username } = await req.json();


    const biodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });
    if(!biodata) return NextResponse.json({
        message: 'biodata tidak ditemukan, harap login kembali'
    }, {
        status: 404
    });

    try {
        const data = await prisma.dataKeluarga.findMany({
            where: {
                biodata: {
                    every: {
                        nama_lengkap: biodata.nama_lengkap
                    }
                }
            },
        });

        return NextResponse.json(data, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "terjadi kesalahan server saat mendapatkan data keluarga"
        }, {
            status: 500
        })
    }
}