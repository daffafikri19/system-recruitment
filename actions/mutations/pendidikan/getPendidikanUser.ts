import prisma from "@/lib/utils/prisma"

export const getPendidikanUser = async ({ sessionUserId, username } : { sessionUserId: string, username: string }) => {

    const biodata = await prisma.biodataUser.findUnique({
        where: {
            id_user: sessionUserId
        }
    });

    if(!biodata) {
        return {
            message: "biodata tidak ditemukan",
            status: 401
        }
    }

    try {
        const response = await prisma.pendidikanUser.findMany({
            where: {
                biodata: {
                    every: {
                        nama_lengkap: username
                    }
                }
            },
            include: {
                biodata: true
            }
        });

        return {
            message: "Berhasil menambahkan data pendidikan!",
            status: 200,
            response: response
        }
    } catch (error) {
        return {
            message: "terjadi kesalahan saat mendapatkan data pendidikan",
            status: 500,
            erorr: error
        }
    }
}


export const getPendidikanUserById = async (id: string) => {

    try {
        const response = await prisma.pendidikanUser.findUnique({
            where: {
                id: id
            }
        });
        if(!response) {
            return {
                message: "data pendidikan tidak ditemukan",
                status: 404
            }
        }
        
        return response
    } catch (error) {
        return {
            message: "terjadi kesalahan saat mendapatkan data pendidikan",
            status: 500,
            erorr: error
        }
    }
}