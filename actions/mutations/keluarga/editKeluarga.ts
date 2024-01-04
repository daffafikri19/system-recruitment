"use server"
import prisma from "@/lib/utils/prisma"
import { KeluargaSchema } from "@/types/schema"
import { revalidatePath } from "next/cache";

export async function editKeluarga(formdata: FormData) {
    const parse = KeluargaSchema.safeParse({
        hubungan: formdata.get('hubungan'),
        nama_lengkap: formdata.get('nama_lengkap'),
        tanggal_lahir: formdata.get('tanggal_lahir'),
        jenis_kelamin: formdata.get('jenis_kelamin'),
        tempat_lahir: formdata.get('tempat_lahir'),
        no_kk: formdata.get('no_kk'),
        no_nik: formdata.get('no_nik'),
        pekerjaan: formdata.get('pekerjaan'),
        pendidikan: formdata.get('pendidikan'),
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

    const existingData = await prisma.dataKeluarga.findUnique({
        where: {
            id: formdata.get('id') as string
        }
    });

    if(!existingData) {
        return {
            message: 'data keluarga tidak ditemukan',
            status: 404
        }
    }

    try {
        await prisma.dataKeluarga.update({
            where: {
                id: existingData.id
            },
            data: {
                nama_lengkap: data.nama_lengkap,
                hubungan: data.hubungan,
                jenis_kelamin: data.jenis_kelamin,
                no_kk: data.no_kk,
                no_nik: data.no_nik,
                pekerjaan: data.pekerjaan,
                pendidikan: data.pendidikan,
                tanggal_lahir: data.tanggal_lahir,
                tempat_lahir: data.tempat_lahir,
                updatedAt: new Date(Date.now()).toLocaleString()
            }
        });

        revalidatePath('/dashboard/biodata')
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