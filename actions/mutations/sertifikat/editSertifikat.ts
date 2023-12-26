"use server"
import prisma from "@/lib/utils/prisma"
import { SertifikatSchema } from "@/types/schema"
import { revalidatePath } from "next/cache";

export async function editSertifikat(formdata: FormData) {

    const parse = SertifikatSchema.safeParse({
        nama_sertifikat: formdata.get('nama_sertifikat'),
        jenis_sertifikat: formdata.get('jenis_sertifikat'),
        nama_org: formdata.get('nama_org'),
        no_serfifikat: formdata.get('no_serfifikat'),
        negara_terbit: formdata.get('negara_terbit'),
        tanggal_terbit: formdata.get('tanggal_terbit'),
        tanggal_exp: formdata.get('tanggal_exp'),
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

    const existingData = await prisma.serfitikatUser.findUnique({
        where: {
            id: formdata.get('id') as string
        }
    });

    if(!existingData) {
        return {
            message: 'data sertifikat tidak ditemukan',
            status: 404
        }
    }

    try {
        await prisma.serfitikatUser.update({
            where: {
                id: existingData.id
            },
            data: {
               
            }
        });

        revalidatePath('/dashboard/biodata', "page")
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