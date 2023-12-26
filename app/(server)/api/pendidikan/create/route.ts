import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {

    const { 
        id_user, 
        luar_negeri, 
        tipe_pendidikan, 
        pendidikan_terakhir, 
        provinsi, 
        kota, 
        nama_institusi, 
        nama_jurusan, 
        no_ijazah, 
        tgl_terbit, 
        tahun_masuk, 
        tahun_lulus, 
        ipk,
        username
     } = await req.json();

     const user = await prisma.user.findUnique({
        where: {
            id: id_user
        }
     });

     if(!user) NextResponse.json({
        message: "user tidak ditemukan"
     }, {
        status: 404
     });

     const biodata = prisma.biodataUser.findFirst({
        where: {
            id_user: id_user
        },
        select: {
            id: true,
            id_user: true
        }
     });

     if(!biodata) return NextResponse.json({
        message: "biodata user tidak ditemukan"
     }, {
        status: 404
     });


    try {
        const data = await prisma.pendidikanUser.create({
            include: {
                biodata: true
            },
            data: {
                luar_negeri,
                tipe_pendidikan,
                pendidikan_terakhir,
                provinsi,
                kota,
                nama_institusi,
                nama_jurusan,
                no_ijazah,
                tgl_terbit,
                tahun_masuk,
                tahun_lulus,
                ipk,
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
            message: "Berhasil menyimpan data"
        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            message: "terjadi kesalahan server saat menambahkan data pendidikan baru",
            error: error
        }, {
            status: 500
        })
    }
}