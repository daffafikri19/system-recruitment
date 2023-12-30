import prisma from "@/lib/utils/prisma";

export async function getTPAQuestionByID(id : string){

    try {
        const result = await prisma.soalTPA.findUnique({
            where: {
                id: parseInt(id)
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
            message: 'Terjadi kesalahan server saat mendapatkan data soal TPA'
        }
    }
}