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
                    keterampilan_bahasa: true,
                    keterampilan_komputer: true,
                    pendidikan: true,
                    pendidikan_non_formal: true,
                    pengalamanKerja: true,
                    sim: true
                }
            }
        }
    });

    return response
}