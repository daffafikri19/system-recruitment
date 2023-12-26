import prisma from "@/lib/utils/prisma"

export const getBiodataUser = async (sessionUserId : string) => {

    if(!sessionUserId) {
        throw new Error('id user tidak ditemukan')
    }

    try {
        const biodataUser = await prisma.biodataUser.findUnique({
            where: {
                id_user: sessionUserId
            },
            include: {
                _count: true,
                aktifitas_sosial: true,
                dataKeluarga: true,
                kerabat: true,
                keterampilan: true,
                pendidikan: true,
                dokumen: true,
                pengalamanKerja: true,
                sertifikat: true,
                sim: true,
                user: true
            }
        });
        return biodataUser
    } catch (error) {
        throw new Error("terjadi kesalahan server saat mendapatkan biodata")
    }
}