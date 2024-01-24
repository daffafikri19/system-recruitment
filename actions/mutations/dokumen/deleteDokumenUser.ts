"use server"

import prisma from "@/lib/utils/prisma"
import { revalidatePath } from "next/cache";

export const deleteKTP = async (username: string, file: any) => {

    const existingFile = await prisma.dokumenUser.findUnique({
        where: {
            ktp: file
        }
    });

    if(!existingFile) {
        return {
            message: 'File ktp tidak ditemukan',
            status: 404
        }
    }

    try {
        await prisma.dokumenUser.delete({
            where: {
                ktp: existingFile.ktp!
            },
        });
        revalidatePath('/dashboard/biodata');
        return {
            message: `Berhasil menghapus file ktp ${username}`,
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload KTP',
            status: 500
        }
    }
}