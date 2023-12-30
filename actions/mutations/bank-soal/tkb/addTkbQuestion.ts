"use server"

import prisma from "@/lib/utils/prisma"
import { TkbQuestionSchema } from "@/types/schema"
import { revalidatePath } from "next/cache";

export async function addTKBQuestion(formdata: FormData) {
    const parse = TkbQuestionSchema.safeParse({
        soal: formdata.get('soal'),
        a: formdata.get('a'),
        b: formdata.get('b'),
        c: formdata.get('c'),
        point_a: formdata.get('point_a'),
        point_b: formdata.get('point_b'),
        point_c: formdata.get('point_c'),
        kunci_jawaban: formdata.get('kunci_jawaban'),
        gambar: formdata.get('gambar'),
        isAktif: formdata.get('isAktif')
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
        await prisma.soalTKB.create({
            data: {
                soal: data.soal,
                a: data.a,
                point_a: data.point_a,
                b: data.b,
                point_b: data.point_b,
                c: data.c,
                point_c: data.point_c,
                kunci_jawaban: data.kunci_jawaban,
                isAktif: data.isAktif,
                gambar: data.gambar,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
            }
        });

        revalidatePath('/dashboard/kelola-soal', "page");

        return {
            message: 'Berhasil menambahkan soal',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat membuat soal TKB',
            status: 500,
            error: error
        }
    }
}