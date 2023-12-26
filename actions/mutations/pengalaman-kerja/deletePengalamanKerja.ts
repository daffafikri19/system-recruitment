"use server"
import prisma from "@/lib/utils/prisma"
import { revalidatePath } from "next/cache";
export async function deletePengalamanKerja(id: string) {

    const existingData = await prisma.pengalamanKerja.findUnique({
        where: {
            id: id
        }
    });

    if(!existingData) {
        return {
            message: 'data tidak ditemukan',
            status: 404
        }
    }

    try {
        await prisma.pengalamanKerja.delete({
            where: {
                id: existingData.id
            }
        });
    
        revalidatePath('/dashboard/biodata', 'page')
        return {
            message: 'Berhasil menghapus data!',
            status: 200
        }
    } catch (error : any) {
        return {
            message: 'terjadi kesalahan saat menghapus data',
            status: 500,
            error: error.message
        }
    }
}