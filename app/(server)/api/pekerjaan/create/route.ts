import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { 
        username,
        nama_perusahaan, 
        posisi,
        gaji,
        awal_masuk,
        keluar,
        uraian_pekerjaan,
        alasan_pindah
    } = await req.json();
    try {
        await prisma.pengalamanKerja.create({
            data: {
                nama_perusahaan,
                posisi,
                gaji,
                awal_masuk,
                keluar,
                uraian_pekerjaan,
                alasan_pindah,
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
            message: 'Berhasil menambahkan data pekerjaan'
        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            message: "terjadi kesalahan server saat menambahkan data pekerjaan"
        }, {
            status: 500
        })
    }
}