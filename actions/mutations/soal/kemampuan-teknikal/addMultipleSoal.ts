"use server"

import prisma from "@/lib/utils/prisma";
import { soalKemampuanTeknikal } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addMultipleSoal(soalData: soalKemampuanTeknikal[]) {
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
    
    await prisma.soalKemampuanTeknikal.createMany({
      data,
    });


    revalidatePath('/dashboard/kelola-soal/kemampuan-teknikal', "page");

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