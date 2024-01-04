"use server"
import prisma from "@/lib/utils/prisma"
import { PendidikanSchema } from "@/types/schema"
import { revalidatePath } from "next/cache";

export async function editPendidikan(formdata: FormData) {

    const parse = PendidikanSchema.safeParse({
        luar_negeri: formdata.get('luar_negeri'),
        tipe_pendidikan: formdata.get('tipe_pendidikan'),
        pendidikan_terakhir: formdata.get('pendidikan_terakhir'),
        provinsi: formdata.get('provinsi'),
        kota: formdata.get('kota'),
        nama_institusi: formdata.get('nama_institusi'),
        nama_jurusan: formdata.get('nama_jurusan'),
        no_ijazah: formdata.get('no_ijazah'),
        tgl_terbit: formdata.get('tgl_terbit'),
        tahun_masuk: formdata.get('tahun_masuk'),
        tahun_lulus: formdata.get('tahun_lulus'),
        ipk: formdata.get('ipk'),
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

    const existingData = await prisma.pendidikanUser.findUnique({
        where: {
            id: formdata.get('id') as string
        }
    });

    if(!existingData) {
        return {
            message: 'data pendidikan tidak ditemukan',
            status: 404
        }
    }

    try {
        await prisma.pendidikanUser.update({
            where: {
                id: existingData.id
            },
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
               tahun_lulus: data.tahun_lulus,
               tahun_masuk: data.tahun_masuk,
               ipk: data.ipk
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