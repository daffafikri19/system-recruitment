import prisma from "@/lib/utils/prisma";
import { redirect } from "next/navigation";

export async function getDokumenUser({ sessionUserId } : { sessionUserId: string }) {

    const biodata = await prisma.biodataUser.findUnique({
        where: {
            id_user: sessionUserId
        }
    });

    if(!biodata) {
        redirect('/signin');
    }

    try {
        const result = await prisma.dokumenUser.findMany({
            where: {
                user_id: biodata.id
            }
        });
        return result
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat mendapatkan data dokumen',
            status: 500,
            error: error
        }
    }
}