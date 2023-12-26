import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const {
        username,
        jenis_sertifikat,
        nama_sertifikat,
        nama_org,
        no_sertifikat,
        negara_terbit,
        tanggal_terbit,
        tanggal_exp
     } = await req.json();

    try {
        const response = await prisma.serfitikatUser.create({
            data: {
                jenis_sertifikat,
                nama_sertifikat,
                nama_org,
                no_sertifikat,
                negara_terbit,
                tanggal_exp,
                tanggal_terbit,
                biodata: {
                    connect: {
                        nama_lengkap: username
                    }
                },
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
            }
        });

        return NextResponse.json({
            message: "Berhasil menambahkan sertifikat"
        }, {
            status: 200,
            statusText: 'ok'
        })
    } catch (error) {
        return NextResponse.json({
            message: "terjadi kesalahan server saat menambahkan sertifikat"
        }, {
            status: 500,
        })
    }
}