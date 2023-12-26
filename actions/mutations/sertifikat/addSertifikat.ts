"use server"

import prisma from "@/lib/utils/prisma"
import { SertifikatSchema } from "@/types/schema"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addSertifikat(formdata: FormData){

    const parse = SertifikatSchema.safeParse({
        nama_sertifikat: formdata.get('nama_sertifikat'),
        jenis_sertifikat: formdata.get('jenis_sertifikat'),
        nama_org: formdata.get('nama_org'),
        no_serfifikat: formdata.get('no_serfifikat'),
        negara_terbit: formdata.get('negara_terbit'),
        tanggal_terbit: formdata.get('tanggal_terbit'),
        tanggal_exp: formdata.get('tanggal_exp'),
        username: formdata.get('username')
    });

    if(!parse.success){
        return {
            message: 'terdapat form yang tidak valid, harap dicek kembali'
        }
    }
    const data = parse.data

    if(!data.username) {
        redirect('/signin')
    }

    try {
        await prisma.serfitikatUser.create({
            data: {
                nama_sertifikat: data.nama_sertifikat,
                jenis_sertifikat: data.jenis_sertifikat,
                nama_org: data.nama_org,
                no_sertifikat: data.no_serfifikat,
                negara_terbit: data.negara_terbit,
                tanggal_terbit: data.tanggal_terbit,
                tanggal_exp: data.tanggal_exp,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        nama_lengkap: data.username
                    }
                }
            }
        });

        revalidatePath('/dashboard/biodata', 'page')
        return  {
            message: "berhasil menambahkan data sertifikat",
            status: 200
        }
    } catch (error : any) {
        return {
            message: 'terjadi kesalahan server saat menambahkan data sertifikat',
            status: 500,
            error: error.message
        }
    }
}