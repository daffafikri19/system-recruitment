import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const {
        id_user,
        nama_lengkap,
        jenis_kelamin,
        agama,
        tanggal_lahir,
        negara_lahir,
        provinsi_lahir,
        kota_lahir,
        kewarganegaraan,
        negara_asal,
        nik,
        no_paspor,
        buta_warna,
        kebutuhan_khusus,
        negara,
        provinsi,
        kota,
        kecamatan,
        alamat,
        kode_pos,
        no_telp_rumah,
        email,
        status_pernikahan,
        no_ponsel,
        no_wa,
    } = await req.json();

    const existingUser = await prisma.user.findUnique({
        where: {
            id: id_user
        }
    });

    if (!existingUser) {
        return NextResponse.json({
            message: "akun tidak ditemukan"
        }, {
            status: 402
        })
    }

    try {
        await prisma.biodataUser.upsert({
            where: {
                id_user: id_user
            },
            create: {
                nama_lengkap,
                jenis_kelamin,
                agama,
                tanggal_lahir,
                negara_lahir,
                provinsi_lahir,
                kota_lahir,
                kewarganegaraan,
                negara_asal,
                nik,
                no_paspor,
                buta_warna,
                kebutuhan_khusus,
                negara,
                provinsi,
                kota,
                kecamatan,
                alamat,
                kode_pos,
                no_telp_rumah,
                email,
                no_ponsel,
                no_wa,
                status_pernikahan,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                id_user: id_user
            },
            update: {
                nama_lengkap,
                jenis_kelamin,
                agama,
                tanggal_lahir,
                negara_lahir,
                provinsi_lahir,
                kota_lahir,
                kewarganegaraan,
                negara_asal,
                nik,
                no_paspor,
                buta_warna,
                kebutuhan_khusus,
                negara,
                provinsi,
                kota,
                kecamatan,
                alamat,
                kode_pos,
                no_telp_rumah,
                email,
                no_ponsel,
                no_wa,
                status_pernikahan,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                id_user: id_user
            }
        });

        await prisma.dokumenUser.create({
            data: {
                user_id: existingUser.id,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingUser.id
                    }
                }
            }
        });

        return NextResponse.json({
            message: 'Berhasil menambahkan data biodata',
        }, {
            status: 200,
            statusText: "ok"
        })
    } catch (error) {
        return NextResponse.json({
            message: "Terjadi kesalahan server saat menambahkan biodata"
        }, {
            status: 500,
            statusText: "error"
        })
    }
}