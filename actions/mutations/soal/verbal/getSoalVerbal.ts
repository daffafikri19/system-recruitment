"use server"

import prisma from "@/lib/utils/prisma"

export async function getAllSoal() {
    try {
        const result = await prisma.soalVerbal.findMany();
        return result
    } catch (error) {
        return {
            message: "Terjadi kesalahan server saat mendapatkan data soal",
            status: 500,
            error: error
        }
    }
}

export async function getSoalById(id: number){

    try {
        const result = await prisma.soalVerbal.findMany({
            where: {
                id: id
            }
        });

        if(!result) {
            return {
                message: 'Soal tidak ditemukan',
                status: 404
            }
        }

        return result
    } catch (error) {
        return {
            message: "Terjadi kesalahan server saat mendapatkan data soal",
            status: 500,
            error: error
        }
    }
}