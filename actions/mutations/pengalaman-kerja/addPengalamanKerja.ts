"use server"
import prisma from "@/lib/utils/prisma"
import { PengalamanKerjaSchema } from "@/types/schema";
import { revalidatePath } from "next/cache";

export async function addPengalamanKerja(formdata: FormData) {
    

    const parse = PengalamanKerjaSchema.safeParse({
        nama_perusahaan: formdata.get('nama_perusahaan'),
        posisi: formdata.get('posisi'),
        gaji: formdata.get('gaji'),
        awal_masuk: formdata.get('awal_masuk'),
        keluar: formdata.get('keluar'),
        uraian_pekerjaan: formdata.get('uraian_pekerjaan'),
        alasan_pindah: formdata.get('alasan_pindah'),
        username: formdata.get('username')
    });

    if(!parse.success) {
        let errorMessage = "";

        parse.error.issues.forEach((error) => {
            errorMessage = error.path[0] + ": " + error.message
        })

        return {
            message: errorMessage
        }
    }

    const data = parse.data;

    if(!data.username) {
        return {
            message: "invalid session user, please re-login",
            status: 401,
            statusText: "unauthorize"
        }
    }

    try {
        await prisma.pengalamanKerja.create({
            data: {
                nama_perusahaan: data.nama_perusahaan,
                posisi: data.posisi,
                gaji: data.gaji,
                awal_masuk: data.awal_masuk,
                keluar: data.keluar,
                uraian_pekerjaan: data.uraian_pekerjaan,
                alasan_pindah: data.alasan_pindah,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        nama_lengkap: data.username
                    }
                }
            }
        });

        revalidatePath('/dashboard/biodata');
        return {
            message: "Berhasil menambahkan data pengalaman kerja",
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat menambahkan data pengalaman kerja',
            status: 500,
            error: error
        }
    }
}