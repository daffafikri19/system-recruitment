import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { 
        username,
        hubungan,
        nama_lengkap,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        no_kk,
        no_nik,
        pekerjaan,
        pendidikan
     } = await req.json();
    try {
        const response = await prisma.dataKeluarga.create({
            data: {
                nama_lengkap,
                hubungan,
                jenis_kelamin,
                tempat_lahir,
                tanggal_lahir,
                no_kk,
                no_nik,
                pekerjaan,
                pendidikan,
                biodata: {
                    connect: {
                        nama_lengkap: username
                    }
                },
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString()
            }
        });
        return NextResponse.json({
            message: "Berhasil menambahkan data keluarga"
        }, {
            status: 201,
            statusText: 'ok'
        })
    } catch (error) {
        return NextResponse.json({
            mesage: "terjadi kesalahan server saat menambahkan data keluarga"
        }, {
            status: 500
        })
    }
}