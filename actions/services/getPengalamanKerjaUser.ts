import prisma from "@/lib/utils/prisma";

export const getDataPengalamanKerjaUser = async (username: string) => {

    const biodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!biodata){
        return {
            mesage: 'biodata tidak ditemukan',
            status: 404
        }
    }

    try {
        const data = await prisma.pengalamanKerja.findMany({
            where: {
                biodata: {
                    every: {
                        nama_lengkap: biodata.nama_lengkap
                    }
                }
            }
        });
        return data
    } catch (error : any) {
        return {
            message: "terjadi kesalahan saat mendapatkan data pengalaman kerja",
            status: 500,
            error: error.message
        }
    }
}