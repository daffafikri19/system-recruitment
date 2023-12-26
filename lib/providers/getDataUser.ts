import prisma from "../utils/prisma";

export async function getDataUser(id: string) {
    const response = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            biodata: {
                include: {
                    aktifitas_sosial: true,
                    dataKeluarga: true,
                    kerabat: true,
                    keterampilan: true,
                    pendidikan: true,
                    pengalamanKerja: true,
                    sim: true,
                    sertifikat: true,
                    dokumen: true
                }
            }
        }
    });

    return response
}