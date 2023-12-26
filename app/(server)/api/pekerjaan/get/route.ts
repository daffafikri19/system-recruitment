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
        message: "biodata tidak ditemukan, harap login kembali"
    }, {
        status: 401,
        statusText: 'unauthorize'
    });

    try {
        const response = await prisma.pengalamanKerja.findMany({
            where: {
                biodata: {
                    every: {
                        nama_lengkap: username
                    }
                }
            }
        });
        return NextResponse.json(response, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "terjadi kesalahan server saat mendapatkan data pekerjaan"
        }, {
            status: 500
        })
    }
}