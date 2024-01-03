import prisma from "@/lib/utils/prisma"

export async function getKeterampilan({ sessionUserId, username } : { sessionUserId: string, username: string }) {

    const biodata = await prisma.biodataUser.findUnique({
        where: {
            id_user: sessionUserId
        }
    });

    if(!biodata) {
        return {
            message: 'biodata tidak ditemukan',
            status: 404
        }
    }

    try {
        const result = await prisma.keterampilanUser.findMany({
            where: {
                biodata: {
                    every: {
                        nama_lengkap: username
                    }
                }
            },
            orderBy: {
                tipe_keterampilan: 'desc'
            }
        });

        return result
    } catch (error : any) {
        return {
            message: 'terjadi kesalahan server saat mendapatkan data keluarga',
            status: 500,
            error: error.message
        }
    }
}