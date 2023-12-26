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
        const keterampilanKomputer = await prisma.keterampilanBahasaUser.findMany({
            where: {
                biodata: {
                    every: {
                        nama_lengkap: username
                    }
                }
            },
        });

        const keterampilanBahasa = await prisma.keterampilanBahasaUser.findMany({
            where: {
                biodata: {
                    every: {
                        nama_lengkap: username
                    }
                }
            }
        });

        return {
            keterampilan_bahasa: keterampilanBahasa,
            keterampilan_komputer: keterampilanKomputer,
            status: 200
        }
    } catch (error : any) {
        return {
            message: 'terjadi kesalahan server saat mendapatkan data keluarga',
            status: 500,
            error: error.message
        }
    }
}