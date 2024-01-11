"use server"

import prisma from "@/lib/utils/prisma"
import { revalidatePath } from "next/cache";
import * as z from "zod";

export async function addSettings(formdata: FormData) {
    const schema = z.object({
        waktu_pengerjaan_verbal: z.number().min(1),
        waktu_pengerjaan_antonim: z.number().min(1),
        waktu_pengerjaan_sinonim: z.number().min(1),
        waktu_pengerjaan_antonim_sinonim: z.number().min(1),
        waktu_pengerjaan_deret_angka: z.number().min(1),
        waktu_pengerjaan_hitung_cepat: z.number().min(1),
        waktu_pengerjaan_informasi_singkat: z.number().min(1),
        waktu_pengerjaan_kalimat_tak_teratur: z.number().min(1),
        waktu_pengerjaan_kemampuan_teknikal: z.number().min(1),
        waktu_pengerjaan_ketelitian: z.number().min(1),
        waktu_pengerjaan_kuantitatif_analisis: z.number().min(1),
        waktu_pengerjaan_penalaran_logis: z.number().min(1),
        waktu_pengerjaan_penalaran_analitik: z.number().min(1),
        waktu_pengerjaan_kepribadian: z.number().min(1),
        waktu_pengerjaan_inggris: z.number().min(1),
        max_soal_verbal: z.number().min(1).default(50),
        max_soal_antonim: z.number().min(1).default(50),
        max_soal_sinonim: z.number().min(1).default(50),
        max_soal_antonim_sinonim: z.number().min(1).default(50),
        max_soal_deret_angka: z.number().min(1).default(50),
        max_soal_hitung_cepat: z.number().min(1).default(50),
        max_soal_informasi_singkat: z.number().min(1).default(50),
        max_soal_kalimat_tak_teratur: z.number().default(50),
        max_soal_kemampuan_teknikal: z.number().min(1).min(1).default(50),
        max_soal_ketelitian: z.number().min(1).default(50),
        max_soal_kuantitatif_analisis: z.number().min(1).default(50),
        max_soal_penalaran_logis: z.number().min(1).default(50),
        max_soal_penalaran_analitik: z.number().min(1).default(50),
        max_soal_kepribadian: z.number().min(1).default(50),
        max_soal_bInggris: z.number().min(1).default(50)
      });

      const parse = schema.safeParse({
        waktu_pengerjaan_verbal: parseInt(formdata.get('waktu_pengerjaan_verbal') as string),
        waktu_pengerjaan_antonim: parseInt(formdata.get('waktu_pengerjaan_antonim') as string),
        waktu_pengerjaan_sinonim: parseInt(formdata.get('waktu_pengerjaan_sinonim') as string),
        waktu_pengerjaan_antonim_sinonim: parseInt(formdata.get('waktu_pengerjaan_antonim_sinonim') as string),
        waktu_pengerjaan_deret_angka: parseInt(formdata.get('waktu_pengerjaan_deret_angka') as string),
        waktu_pengerjaan_hitung_cepat: parseInt(formdata.get('waktu_pengerjaan_hitung_cepat') as string),
        waktu_pengerjaan_informasi_singkat: parseInt(formdata.get('waktu_pengerjaan_informasi_singkat') as string),
        waktu_pengerjaan_kalimat_tak_teratur: parseInt(formdata.get('waktu_pengerjaan_kalimat_tak_teratur') as string),
        waktu_pengerjaan_kemampuan_teknikal: parseInt(formdata.get('waktu_pengerjaan_kemampuan_teknikal') as string),
        waktu_pengerjaan_ketelitian: parseInt(formdata.get('waktu_pengerjaan_ketelitian') as string),
        waktu_pengerjaan_kuantitatif_analisis: parseInt(formdata.get('waktu_pengerjaan_kuantitatif_analisis') as string),
        waktu_pengerjaan_penalaran_logis: parseInt(formdata.get('waktu_pengerjaan_penalaran_logis') as string),
        waktu_pengerjaan_penalaran_analitik: parseInt(formdata.get('waktu_pengerjaan_penalaran_analitik') as string),
        waktu_pengerjaan_kepribadian: parseInt(formdata.get('waktu_pengerjaan_kepribadian') as string),
        waktu_pengerjaan_inggris: parseInt(formdata.get('waktu_pengerjaan_inggris') as string),
        max_soal_verbal: parseInt(formdata.get('max_soal_verbal') as string),
        max_soal_antonim: parseInt(formdata.get('max_soal_antonim') as string),
        max_soal_sinonim: parseInt(formdata.get('max_soal_sinonim') as string),
        max_soal_antonim_sinonim: parseInt(formdata.get('max_soal_antonim_sinonim') as string),
        max_soal_deret_angka: parseInt(formdata.get('max_soal_deret_angka') as string),
        max_soal_hitung_cepat: parseInt(formdata.get('max_soal_hitung_cepat') as string),
        max_soal_informasi_singkat: parseInt(formdata.get('max_soal_informasi_singkat') as string),
        max_soal_kalimat_tak_teratur: parseInt(formdata.get('max_soal_kalimat_tak_teratur') as string),
        max_soal_kemampuan_teknikal: parseInt(formdata.get('max_soal_kemampuan_teknikal') as string),
        max_soal_ketelitian: parseInt(formdata.get('max_soal_ketelitian') as string),
        max_soal_kuantitatif_analisis: parseInt(formdata.get('max_soal_kuantitatif_analisis') as string),
        max_soal_penalaran_logis: parseInt(formdata.get('max_soal_penalaran_logis') as string),
        max_soal_penalaran_analitik: parseInt(formdata.get('max_soal_penalaran_analitik') as string),
        max_soal_kepribadian: parseInt(formdata.get('max_soal_kepribadian') as string),
        max_soal_bInggris: parseInt(formdata.get('max_soal_bInggris') as string)
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
        await prisma.settinganSoal.upsert({
            where: {
                id: parseInt(formdata.get('id') as string)
            },
            create: {
                ...data,
                schedule: new Date(Date.now()).toLocaleString(),
                createdAt: new Date(Date.now()).toLocaleString(),
            },
            update: {
                ...data,
                schedule: new Date(Date.now()).toLocaleString(),
                createdAt: new Date(Date.now()).toLocaleString(),
            }
        });

        revalidatePath('/dashboard/settings');
        return {
            message: "Berhasil menyimpan data pengaturan soal",
            status: 200
        }
    } catch (error) {
        return {
            message: "Terjadi kesalahan server saat menyimpan data pengaturan soal",
            status: 500,
            error: error
        }
    }
}