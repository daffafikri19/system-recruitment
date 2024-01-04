"use server"

import prisma from "@/lib/utils/prisma";
import { soalKalimatTakTeratur } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addMultipleSoal(soalData: soalKalimatTakTeratur[]) {
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
    
    await prisma.soalKalimatTakTeratur.createMany({
      data,
    });


    revalidatePath('/dashboard/kelola-soal/kalimat-tak-teratur', "page");

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