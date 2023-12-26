"use server"
import prisma from "@/lib/utils/prisma"
import { PendidikanSchema } from "@/types/schema";
import { revalidatePath } from "next/cache";


export async function addPendidikan(formdata: FormData) {

    const parse = PendidikanSchema.safeParse({
        luar_negeri: formdata.get('luar_negeri'),
        tipe_pendidikan: formdata.get('tipe_pendidikan'),
        pendidikan_terakhir: formdata.get('pendidikan_terakhir') as string,
        provinsi: formdata.get('provinsi') as string,
        kota: formdata.get('kota') as string,
        nama_institusi: formdata.get('nama_institusi') as string,
        nama_jurusan: formdata.get('nama_jurusan') as string,
        no_ijazah: formdata.get('no_ijazah') as string,
        tgl_terbit: formdata.get('tgl_terbit') as string,
        tahun_masuk: formdata.get('tahun_masuk') as string,
        tahun_lulus: formdata.get('tahun_lulus') as string,
        ipk: formdata.get('ipk') as string,
        username: formdata.get('username') as string
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
    if(!data.username) {
        return {
            message: 'biodata tidak ditemukan',
            status: 401
        }
    }

    try {
        await prisma.pendidikanUser.create({
            data: {
                luar_negeri: data.luar_negeri,
                tipe_pendidikan: data.tipe_pendidikan,
                pendidikan_terakhir: data.pendidikan_terakhir,
                provinsi: data.provinsi,
                kota: data.kota,
                nama_institusi: data.nama_institusi,
                nama_jurusan: data.nama_jurusan,
                no_ijazah: data.no_ijazah,
                tgl_terbit: data.tgl_terbit,
                tahun_masuk: data.tahun_masuk,
                tahun_lulus: data.tahun_lulus,
                ipk: data.ipk,
                biodata: {
                    connect: {
                        nama_lengkap: data.username
                    }
                },
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
            },
            include: {
                biodata: true
            }
        });
        revalidatePath('/dashboard/biodata', "page");
        return {
            message: "Berhasil menambahkan data pendidikan",
            status: 200
        }
    } catch (error) {
        return {
            message: 'terjadi kesalahan server saat menambahkan data pendidikan',
            status: 500,
            error: error
        }
    }
}