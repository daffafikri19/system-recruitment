"use server"

import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import bcrypt from "bcrypt";

export default async function RegisterUser(formdata: FormData) {
    const data = {
        name: formdata.get('name') as string,
        email: formdata.get('email') as string,
        password: formdata.get('password') as string,
        confPassword: formdata.get('confPassword') as string
    }
    
    const existingEmail = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (existingEmail) {
        return NextResponse.json({
            message: 'Akun dengan email ini sudah terdaftar'
        }, {
            status: 400
        })
    }

    if (data.password !== data.confPassword) return NextResponse.json({
        message: 'password dengan konfirmasi password tidak cocok'
    }, {
        status: 400
    });

    // hash password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(data.password, salt)

    try {
        const response = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashPassword,
                role: "peserta",
                profession: "",
            },
            select: {
                name: true,
                email: true,
                role: true,
            }
        });
        JSON.parse(JSON.stringify(response))
    } catch (error) {
        return NextResponse.json(error, {
            status: 400
        })
    }
}