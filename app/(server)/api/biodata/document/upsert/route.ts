import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { filename, file, username } = await req.json();

    const existingUser = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if (!existingUser) return NextResponse.json({
        message: 'Harap lengkapi biodata sebelum upload berkas'
    }, {
        status: 401
    });

    try {
        let fileData = {};
        switch (filename) {
            case "cv":
                fileData = { cv: file };
                break;
            case "pas_foto":
                fileData = { pas_foto: file };
                break;
            case "ktp":
                fileData = { ktp: file };
                break;
            case "npwp":
                fileData = { npwp: file };
                break;
            case "sim":
                fileData = { sim: file };
                break;
            case "ijazah":
                fileData = { ijazah: file };
                break;
            case "transkrip_nilai":
                fileData = { transkrip_nilai: file };
                break;
            case "kartu_keluarga":
                fileData = { kartu_keluarga: file };
                break;
            case "skck":
                fileData = { skck: file };
                break;
            case "kartu_kuning":
                fileData = { kartu_kuning: file };
                break;
            case "surat_pengalaman_kerja":
                fileData = { surat_pengalaman_kerja: file };
                break;
            case "akta_kelahiran":
                fileData = { akta_kelahiran: file };
                break;
            case "sertifikat_keahlian":
                fileData = { sertifikat_keahlian: file };
                break;
            case "sertifikat_bahasa":
                fileData = { sertifikat_bahasa: file };
                break;
            case "buku_nikah":
                fileData = { buku_nikah: file };
                break;
            default:
                return NextResponse.json("Invalid file", {
                    status: 400
                })
        }

        await prisma.dokumenUser.upsert({
            where: {
                user_id: existingUser.id!,
            },
            update: {
                ...fileData,
                user_id: existingUser.id!,
                updatedAt: new Date(Date.now()).toLocaleString(),
                createdAt: new Date(Date.now()).toLocaleString(),
            },
            create: {
                ...fileData,
                user_id: existingUser.id!,
                updatedAt: new Date(Date.now()).toLocaleString(),
                createdAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        nama_lengkap: existingUser.nama_lengkap
                    }
                }
            },
        });

        return NextResponse.json("Berhasil menyimpan berkas", {
            status: 200
        })
    } catch (error) {
        return NextResponse.json("test", {
            status: 500
        })
    }
}