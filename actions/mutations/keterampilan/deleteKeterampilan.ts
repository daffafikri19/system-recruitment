"use server"
import prisma from "@/lib/utils/prisma"
import { revalidatePath } from "next/cache";

export async function deleteKeterampilan(id: string) {

    const existingData = await prisma.keterampilanUser.findUnique({
        where: {
            id: id
        }
    });

    if(!existingData) {
        return {
            message: "Data keterampilan tidak ditemukan",
            status: 404
        }
    }

    try {
        await prisma.keterampilanUser.delete({
            where: {
                id: existingData.id
            }
        });

        revalidatePath('/dashboard/biodata', "page")
        return {
            message: "Berhasil menghapus data keterampilan",
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat menghapus data keterampilan',
            status: 500,
            error: error
        }
    }
}