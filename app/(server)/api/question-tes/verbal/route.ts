import prisma from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const result = await prisma.soalVerbal.findMany({
            where: {
                aktif: true
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