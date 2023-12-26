"use server"

import prisma from "@/lib/utils/prisma"
import { KeterampilanBahasaSchema, KeterampilanKomputerSchema } from "@/types/schema"

export const addKeterampilanBahasa = async (formdata : FormData) => {
    const parse = KeterampilanBahasaSchema.safeParse({
        bahasa: formdata.get('bahasa'),
        lisan: formdata.get('lisan'),
        tulisan: formdata.get('tulisan'),
        username: formdata.get('username')
    });

    if(!parse.success) {
        return {
            message: 'terdapat form yang tidak valid / kosong, harap cek kembali'
        }
    }

    const data = parse.data;

    try {
        await prisma.keterampilanBahasaUser.create({
            data: {
                bahasa: data.bahasa,
                lisan: data.lisan,
                tulisan: data.tulisan,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        nama_lengkap: data.username
                    }
                }
            }
        });

        return {
            message: 'berhasil menambahkan data keterampilan bahasa',
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

export const addKeterampilanKomputer = async (formdata: FormData) => {
    const parse = KeterampilanKomputerSchema.safeParse({
        jenis_program: formdata.get('jenis_program'),
        kemampuan: formdata.get('kemampuan'),
        keterangan: formdata.get('keterangan'),
        username: formdata.get('username')
    });

    if(!parse.success) {
        return {
            message: 'terdapat form yang tidak valid / kosong'
        }
    }

    const data = parse.data;

    try {
        await prisma.keterampilanKomputerUser.create({
            data: {
                jenis_program: formdata.get('jenis_program') as any,
                kemampuan: formdata.get('kemampuan') as any,
                keterangan: formdata.get('keterangan') as any,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        nama_lengkap: formdata.get('username') as any
                    }
                }
            }
        });

        return {
            message: 'berhasil menambahkan data keterampilan komputer',
            status: 200
        }
    } catch (error : any) {
        return {
            message: "terjadi kesalahan server saat menambahkan data keterampilan komputer",
            status: 500,
            error: error.message
        }
    }
}