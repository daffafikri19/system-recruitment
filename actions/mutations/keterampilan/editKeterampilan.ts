"use server"

import { KeterampilanSchema } from "@/types/schema";
import prisma from "@/lib/utils/prisma";
import { revalidatePath } from "next/cache";
export async function editKeterampilan(formdata: FormData) {
    const parse = KeterampilanSchema.safeParse({
        nama_keterampilan: formdata.get('nama_keterampilan'),
        tipe_keterampilan: formdata.get('tipe_keterampilan'),
        keterangan: formdata.get('keterangan')
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

    try {
        const dataKeterampilan = await prisma.keterampilanUser.update({
            where: {
                id: formdata.get('id') as string
            },
            data: {
                nama_keterampilan: data.nama_keterampilan,
                tipe_keterampilan: data.tipe_keterampilan,
                keterangan: data.keterangan,
                updatedAt: new Date(Date.now()).toLocaleString()
            }
        });

        if(!dataKeterampilan) {
            return {
                message: 'data keterampilan tidak ditemukan', 
                status: 404
            }
        }

        revalidatePath("/dashboard/biodata", "page")
        return {
            message: 'Berhasil edit data keterampilan',
            status: 200
        }
    } catch (error) {
        return  {
            message: 'Terjadi kesalahan server saat edit data keterampilan',
            status: 500,
            error: error
        }
    }
}