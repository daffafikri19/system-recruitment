"use server"
import prisma from "@/lib/utils/prisma"

export const submitScore = async (benar: number, salah: number, score: number, id_user: string) => {
    try {
        await prisma.scoreTotalPsikotest.create({
            include: {
                scoreAntonim: true
            },
            data: {
                scoreAntonim: {
                    create: {
                        benar,
                        salah,
                        score
                    }
                },
                user: {
                    connect: {
                        id: id_user
                    }
                },
            }
        });

        return {
            message: "Berhasil menyimpan jawaban soal antonim anda",
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat menyimpan nilai',
            status: 500,
            error: error
        }
    }
}