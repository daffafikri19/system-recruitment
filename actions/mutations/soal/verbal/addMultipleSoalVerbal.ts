"use server"

import prisma from "@/lib/utils/prisma";
import { soalVerbal } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addMultipleSoal(soalData: soalVerbal[]) {
  try {
    const createdAt = new Date(Date.now()).toLocaleString();
    const updatedAt = new Date(Date.now()).toLocaleString();

    const data = soalData.map((soal) => {
      return {
        ...soal,
        createdAt,
        updatedAt,
      };
    });
    
    await prisma.soalVerbal.createMany({
      data,
    });


    revalidatePath('/dashboard/kelola-soal/verbal', "page");

    return {
      message: "Soal verbal berhasil ditambahkan",
      status: 200,
    };
  } catch (error) {
    return {
      message: "Terjadi kesalahan server saat menambahkan soal verbal",
      status: 500,
      error: error,
    };
  }
}