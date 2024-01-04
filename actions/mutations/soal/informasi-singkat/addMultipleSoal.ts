"use server"

import prisma from "@/lib/utils/prisma";
import { soalInformasiSingkat } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addMultipleSoal(soalData: soalInformasiSingkat[]) {
  try {
    const createdAt = new Date(Date.now()).toLocaleString();
    const updatedAt = new Date(Date.now()).toLocaleString();

    const data = soalData.map((data) => {
      return {
        ...data,
        createdAt,
        updatedAt,
      };
    });
    
    await prisma.soalInformasiSingkat.createMany({
      data,
    });


    revalidatePath('/dashboard/kelola-soal/informasi-singkat', "page");

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