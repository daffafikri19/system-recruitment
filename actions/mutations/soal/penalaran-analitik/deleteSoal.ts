"use server"

import prisma from "@/lib/utils/prisma"
import { revalidatePath } from "next/cache";

export async function deleteSoal(id: number){
    try {
        await prisma.soalPenalaranAnalitik.delete({
            where: {
                id: id
            }
        });

        revalidatePath("/dashboard/kelola-soal/penalaran-analitik", "page");

        return {    
            message: 'Berhasil menghapus soal',
            status: 200
        }
    } catch (error) {
        return {
            message: "Terjadi kesalahan server saat menghapus soal",
            status: 500,
            error: error
        }
    }
}