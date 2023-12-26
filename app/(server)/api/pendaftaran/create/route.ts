import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(req: NextRequest) {
    const { username } = await req.json();

    const totalUser = await prisma.user.aggregate({
        _count: {
            id: true
        }
    });

    const nextNumberId = (totalUser._count.id).toString().padStart(4, '0');
    const today = new Date();
    const date = today.toISOString().split('T')[0];

    const existingUser = await prisma.user.findUnique({
        where: {
            name: username
        }
    });

    if (!existingUser) {
        return NextResponse.json({
            message: "sesi akun gagal, harap login kembali"
        }, {
            status: 401
        });
    }

    try {
        const response = await prisma.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                no_pendaftaran: `${date}-${nextNumberId}`
            }
        });

        // Berhasil, kirim respons OK
        return NextResponse.json(response, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            message: "terjadi kesalahan server saat membuat id pendaftaran"
        }, {
            status: 500
        });
    }
}
