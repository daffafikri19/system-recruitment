import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const { id } = await req.json();

    try {
        const result = await prisma.soalSinonim.findUnique({
            where: {
                id: id
            }
        });

        return NextResponse.json(result, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            message: error
        }, {
            status: 500
        })
    }
}