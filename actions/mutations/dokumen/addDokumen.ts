"use server"
import prisma from "@/lib/utils/prisma"
import { DokumenSchema } from "@/types/schema"
import { revalidatePath } from "next/cache";

export async function addDokumen(formdata: FormData) {

    const parse = DokumenSchema.safeParse({
        no_urut: formdata.get('no_urut'),
        nama_dokumen: formdata.get('nama_dokument'),
        status_dokumen: formdata.get('status_dokumen'),
        file: formdata.get('file'),
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
        await prisma.dokumenUser.create({
            data: {
                no_urut: data.no_urut,
                nama_dokumen: data.nama_dokumen,
                status_dokumen: data.status_dokumen,
                file: data.file,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        nama_lengkap: data.username
                    }
                }
            }
        });


        revalidatePath('/dashboard/biodata', "page")
        return {
            message: 'Berhasil menambahkan data dokumen',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat menambahkan dokumen',
            status: 500,
            error: error
        }
    }
}