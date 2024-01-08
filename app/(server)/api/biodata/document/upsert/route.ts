import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { field, file, username } = await req.json();
    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) return NextResponse.json({
        message: 'Maaf sesi telah habis, harap login kembali'
    }, {
        status: 401
    });

    const existingDocument = await prisma.dokumenUser.findUnique({
        where: {
            user_id: existingBiodata.id_user!,
        },
    });
    
    try {
        let fileData = {};
        switch (field) {
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
                return {
                    message: "Invalid file",
                    status: 400,
            };
        }
        
        if (existingDocument) {
            // Update existing document
            await prisma.dokumenUser.update({
                where: {
                    user_id: existingBiodata.id_user!
                },
                data: { 
                    ...fileData, 
                    user_id: existingBiodata.id_user!,
                    updatedAt: new Date(Date.now()).toLocaleString(),
                    createdAt: new Date(Date.now()).toLocaleString(),
                },
            });
        } else {
            // Create a new document
            await prisma.dokumenUser.create({
                data: { 
                    ...fileData, 
                    user_id: existingBiodata.id_user!,
                    updatedAt: new Date(Date.now()).toLocaleString(),
                    createdAt: new Date(Date.now()).toLocaleString(),
                    biodata: {
                        connect: {
                            nama_lengkap: existingBiodata.nama_lengkap
                        }
                    }
                },
            });
        }

        
        return NextResponse.json({
            message: "Berhasil menyimpan berkas"
        }, {
            status: 200
        });

    } catch (error : any) {
        return NextResponse.json({
            message: "Terjadi kesalahan server saat menyimpan berkas",
            error: error
        }, {
            status: 500
        })
    }
}