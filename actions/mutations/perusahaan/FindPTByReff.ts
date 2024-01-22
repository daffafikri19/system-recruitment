"use server"
import prisma from "@/lib/utils/prisma"

export const FindPTByReff = async (reffcode : string) => {
    try {
        const response = await prisma.perusahaan.findUnique({
            where: {
                reffCode: reffcode
            },
            select: {
                name: true,
            }
        });
        if(!response) {
            return {
                message: 'Perusahaan tidak terdaftar, harap cek kembali reff code',
                status: 404
            }
        }
        
        return {
            data: response,
            status: 200
        }
    } catch (error) {
        return {
            message: "internal server error",
            status: 500
        }
    }
}