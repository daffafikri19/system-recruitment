"use server"
import prisma from "@/lib/utils/prisma"
import { TpaQuestionSchema } from "@/types/schema"
import { revalidatePath } from "next/cache";

export async function addTpaQuestion(formdata: FormData) {

    const parse = TpaQuestionSchema.safeParse({
        soal: formdata.get('soal'),
        a: formdata.get('a'),
        b: formdata.get('b'),
        c: formdata.get('c'),
        d: formdata.get('d'),
        kunci_jawaban: formdata.get('kunci_jawaban'),
        gambar: formdata.get('gambar'),
        isAktif: formdata.get('isAktif')
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
        await prisma.soalTPA.create({
            data: {
                soal: data.soal,
                a: data.a,
                b: data.b,
                c: data.c,
                d: data.d,
                kunci_jawaban: data.kunci_jawaban,
                isAktif: data.isAktif,
                gambar: data.gambar,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
            }
        });
        revalidatePath('/dashboard/kelola-soal/tpa', "page")
        return {
            message: 'Berhasil membuat soal TPA!',
            status: 200
        }
    } catch (error : any) {
        return {
            message: 'terjadi kesalahan server saat membuat soal TPA',
            status: 500,
            error: error.message
        }
    }
}