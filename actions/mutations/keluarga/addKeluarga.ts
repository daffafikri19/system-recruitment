"use server"
import prisma from "@/lib/utils/prisma"
import { KeluargaSchema } from "@/types/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addKeluarga(formdata: FormData) {
    
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
    if(!data.username) {
        redirect('/signin')
    }

    try {
        await prisma.dataKeluarga.create({
            data: {
                nama_lengkap: data.nama_lengkap,
                hubungan: data.hubungan,
                jenis_kelamin: data.jenis_kelamin,
                tempat_lahir: data.tempat_lahir,
                no_kk: data.no_kk,
                no_nik: data.no_nik,
                pekerjaan: data.pekerjaan,
                tanggal_lahir: data.tanggal_lahir,
                pendidikan: data.pendidikan,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        nama_lengkap: data.username,
                    }
                }
            }
        });

        revalidatePath('/dashboard/biodata', 'page');
        return {
            message: 'berhasil menambahkan data keluarga!',
            status: 200
        }
    } catch (error) {
        return {
            message: 'terjadi kesalahan server saat menambahkan data keluarga',
            status: 500,
            error: error
        }
    }
}