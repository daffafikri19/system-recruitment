import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {

    const body = await req.json();
    const { name, email, password, confPassword } = body

    const existingEmail = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if(existingEmail) {
        return NextResponse.json({
            message: 'Akun dengan email ini sudah terdaftar'
        }, {
            status: 400
        })
    }

    if(password !== confPassword) return NextResponse.json({
        message: 'password dengan konfirmasi password tidak cocok'
    }, {
        status: 400
    });

    // hash password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        const reponse = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword,
                profession: ''
            }
        });

        return NextResponse.json(reponse, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}