"use server"

import prisma from "@/lib/utils/prisma";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export async function addSingleSoal(formdata: FormData) {

    const schema = z.object({
        gambar: z.string().min(1).optional().nullable(),
        soal: z.string().min(3),
        A: z.string().min(1),
        B: z.string().min(1),
        C: z.string().min(1),
        D: z.string().min(1),
        E: z.string().optional().nullable(),
        kunci_jawaban: z.string().min(1),
        tipe_soal: z.string().min(1).optional().nullable(),
        aktif: z.string().nullable().optional()
    });

    const parse = schema.safeParse({
        gambar: formdata.get('gambar'),
        soal: formdata.get('soal'),
        A: formdata.get('A'),
        B: formdata.get('B'),
        C: formdata.get('C'),
        D: formdata.get('D'),
        E: formdata.get('E'),
        kunci_jawaban: formdata.get('kunci_jawaban'),
        tipe_soal: formdata.get('tipe_soal'),
        aktif: formdata.get('aktif')
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

    try {
        const createdAt = new Date(Date.now()).toLocaleString();
        const updatedAt = new Date(Date.now()).toLocaleString();

        await prisma.soalhitungCepat.create({
            data: {
                gambar: data.gambar,
                soal: data.soal,
                A: data.A,
                B: data.B,
                C: data.C,
                D: data.D,
                E: data.E,
                tipe_soal: data.tipe_soal as any,
                kunci_jawaban: data.kunci_jawaban,
                aktif: Boolean(data.aktif),
                createdAt,
                updatedAt
            }
        });

        revalidatePath('/dashboard/kelola-soal/hitung-cepat');

        return {
            message: "Soal berhasil ditambahkan",
            status: 200,
        };
    } catch (error) {
        return {
            message: "Terjadi kesalahan server saat menambahkan soal",
            status: 500,
            error: error,
        };
    }
}