import prisma from "@/lib/utils/prisma";
import { redirect } from "next/navigation";

export async function getSertifikatUser({ sessionUserId } : { sessionUserId: string }) {
    const biodata = await prisma.biodataUser.findUnique({
        where: {
            id_user: sessionUserId
        }
    });

    if(!biodata) {
        redirect('/signin')
    }

    try {
        const result = await prisma.serfitikatUser.findMany({
            where: {
                biodata: {
                    every: {
                        nama_lengkap: biodata.nama_lengkap
                    }
                }
            }
        });

        return result
    } catch (error) {
        return {
            message: 'terjadi kesalahan server saat mengambil data sertifikat',
            status: 500,
            error: error
        }
    }
}