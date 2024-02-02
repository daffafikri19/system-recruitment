"use server"
import prisma from "@/lib/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod"

export const SaveBiodata = async (formdata: FormData) => {

    const schema = z.object({
        id_user: z.string().min(1),
        nama_lengkap: z.string().min(1),
        jenis_kelamin: z.string().min(1),
        agama: z.string().min(1),
        tanggal_lahir: z.string().min(1),
        negara_lahir: z.string().min(1),
        provinsi_lahir: z.string().min(1),
        kota_lahir: z.string().min(1),
        kewarganegaraan: z.string().min(1),
        negara_asal: z.string().min(1),
        nik: z.string().min(1),
        no_paspor: z.string().min(1).optional().nullable(),
        buta_warna: z.string().min(1),
        kebutuhan_khusus: z.string().min(1),
        negara: z.string().min(1),
        provinsi: z.string().min(1),
        kota: z.string().min(1),
        kecamatan: z.string().min(1),
        alamat: z.string().min(1),
        kode_pos: z.string().min(1),
        no_telp_rumah: z.string().optional().nullable(),
        email: z.string().min(1),
        no_ponsel: z.string().min(1),
        no_wa: z.string().min(1),
        status_pernikahan: z.string().min(1),
    });


    const parse = schema.safeParse({
        id_user: formdata.get('id_user'),
        nama_lengkap: formdata.get('nama_lengkap'),
        jenis_kelamin: formdata.get('jenis_kelamin'),
        agama: formdata.get('agama'),
        tanggal_lahir: formdata.get('tanggal_lahir'),
        negara_lahir: formdata.get('negara_lahir'),
        provinsi_lahir: formdata.get('provinsi_lahir'),
        kota_lahir: formdata.get('kota_lahir'),
        kewarganegaraan: formdata.get('kewarganegaraan'),
        negara_asal: formdata.get('negara_asal'),
        nik: formdata.get('nik'),
        no_paspor: formdata.get('no_paspor'),
        buta_warna: formdata.get('buta_warna'),
        kebutuhan_khusus: formdata.get('kebutuhan_khusus'),
        negara: formdata.get('negara'),
        provinsi: formdata.get('provinsi'),
        kota: formdata.get('kota'),
        kecamatan: formdata.get('kecamatan'),
        alamat: formdata.get('alamat'),
        kode_pos: formdata.get('kode_pos'),
        no_telp_rumah: formdata.get('no_telp_rumah'),
        email: formdata.get('email'),
        no_ponsel: formdata.get('no_ponsel'),
        no_wa: formdata.get('no_wa'),
        status_pernikahan: formdata.get('status_pernikahan')
    });

    if (!parse.success) {
        let errorMessage = "";

        parse.error.issues.forEach((error) => {
            errorMessage = errorMessage + error.path[0] + " : " + error.message
        })

        return {
            message: errorMessage
        }
    }


    const data = parse.data;

    const existingUser = await prisma.user.findUnique({
        where: {
            id: data.id_user
        }
    });

    if (!existingUser) {
        redirect('/signin')
    }

    try {
        await prisma.biodataUser.upsert({
            where: {
                id_user: data.id_user
            },
            create: {
                nama_lengkap: data.nama_lengkap,
                jenis_kelamin: data.jenis_kelamin,
                agama: data.agama,
                tanggal_lahir: data.tanggal_lahir,
                negara_lahir: data.negara_lahir,
                provinsi_lahir: data.provinsi_lahir,
                kota_lahir: data.kota_lahir,
                kewarganegaraan: data.kewarganegaraan,
                negara_asal: data.negara_asal,
                nik: data.nik,
                no_paspor: data.no_paspor,
                buta_warna: data.buta_warna,
                kebutuhan_khusus: data.kebutuhan_khusus,
                negara: data.negara,
                provinsi: data.provinsi,
                kota: data.kota,
                kecamatan: data.kecamatan,
                alamat: data.alamat,
                kode_pos: data.kode_pos,
                no_telp_rumah: data.kode_pos,
                email: data.email,
                no_ponsel: data.no_ponsel,
                no_wa: data.no_wa,
                status_pernikahan: data.status_pernikahan,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                id_user: data.id_user
            },
            update: {
                nama_lengkap: data.nama_lengkap,
                jenis_kelamin: data.jenis_kelamin,
                agama: data.agama,
                tanggal_lahir: data.tanggal_lahir,
                negara_lahir: data.negara_lahir,
                provinsi_lahir: data.provinsi_lahir,
                kota_lahir: data.kota_lahir,
                kewarganegaraan: data.kewarganegaraan,
                negara_asal: data.negara_asal,
                nik: data.nik,
                no_paspor: data.no_paspor,
                buta_warna: data.buta_warna,
                kebutuhan_khusus: data.kebutuhan_khusus,
                negara: data.negara,
                provinsi: data.provinsi,
                kota: data.kota,
                kecamatan: data.kecamatan,
                alamat: data.alamat,
                kode_pos: data.kode_pos,
                no_telp_rumah: data.kode_pos,
                email: data.email,
                no_ponsel: data.no_ponsel,
                no_wa: data.no_wa,
                status_pernikahan: data.status_pernikahan,
                updatedAt: new Date(Date.now()).toLocaleString(),
                id_user: data.id_user
            }
        });

        await prisma.dokumenUser.upsert({
            where: {
                user_id: existingUser.id
            },
            create: {
                user_id: existingUser.id,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingUser.id
                    }
                }
            },
            update: {
                user_id: existingUser.id,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingUser.id
                    }
                }
            }
        });

        revalidatePath('/dashboard/biodata');
        return {
            message: 'Berhasil menyimpan biodata',
            status: 200
        }
    } catch (error : any) {
        return {
            message: "Terjadi kesalahan server saat menambahkan biodata",
            error: error.message
        }
    }
}