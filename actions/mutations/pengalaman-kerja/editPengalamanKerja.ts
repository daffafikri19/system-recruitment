"use server"
import prisma from "@/lib/utils/prisma"
import { PengalamanKerjaSchema } from "@/types/schema"
import { revalidatePath } from "next/cache";

export async function editPengalamanKerja(formdata: FormData) {

    const parse = PengalamanKerjaSchema.safeParse({
        nama_perusahaan: formdata.get('nama_perusahaan'),
        posisi: formdata.get('posisi'),
        gaji: formdata.get('gaji'),
        awal_masuk: formdata.get('awal_masuk'),
        keluar: formdata.get('keluar'),
        uraian_pekerjaan: formdata.get('uraian_pekerjaan'),
        alasan_pindah: formdata.get('alasan_pindah'),
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

    const data = parse.data

    const existingData = await prisma.pengalamanKerja.findUnique({
        where: {
            id: formdata.get('id') as string
        }
    });

    if(!existingData) {
        return {
            message: 'data pengalaman kerja tidak ditemukan',
            status: 404
        }
    }

    try {
        await prisma.pengalamanKerja.update({
            where: {
                id: existingData.id
            },
            data: {
               nama_perusahaan: data.nama_perusahaan,
               posisi: data.posisi,
               gaji: data.gaji,
               awal_masuk: data.awal_masuk,
               keluar: data.keluar,
               uraian_pekerjaan: data.uraian_pekerjaan,
               alasan_pindah: data.alasan_pindah,
               updatedAt: new Date(Date.now()).toLocaleString()
            }
        });

        revalidatePath('/dashboard/biodata');
        return {
            message: 'Berhasil update data',
            status: 200
        }
    } catch (error : any) {
        return {
            message: 'terjadi kesalahan saat mengubah data keluarga',
            status: 500,
            error: error.message
        }
    }
}