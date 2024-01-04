"use server"

import prisma from "@/lib/utils/prisma"
import { KeterampilanSchema } from "@/types/schema"
import { revalidatePath } from "next/cache";

export const addKeterampilan = async (formdata : FormData) => {
    const parse = KeterampilanSchema.safeParse({
        tipe_keterampilan: formdata.get('tipe_keterampilan'),
        nama_keterampilan: formdata.get('nama_keterampilan'),
        keterangan: formdata.get('keterangan'),
        username: formdata.get('username')
    });

    if(!parse.success) {
        let errorMessage = "";

        parse.error.issues.forEach((error) => {
            errorMessage = errorMessage + error.path[0] + error.message
        })

        return {
            message: errorMessage
        }
    }

    const data = parse.data;

    try {
        await prisma.keterampilanUser.create({
            data: {
                tipe_keterampilan: data.tipe_keterampilan,
                nama_keterampilan: data.nama_keterampilan,
                keterangan: data?.keterangan,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        nama_lengkap: data.username
                    }
                }
            }
        });


        revalidatePath('/dashboard/biodata')
        return {
            message: 'berhasil menambahkan data keterampilan',
            status: 200
        }
    } catch (error : any) {
        return {
            message: 'terjadi kesalahan server saat menambahkan data keterampilan bahasa',
            status: 500,
            error: error.message
        }
    }
}