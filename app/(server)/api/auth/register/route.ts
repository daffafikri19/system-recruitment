import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const { name, email, password, confPassword, reffcode } = await req.json();

    const existingPT = await prisma.perusahaan.findUnique({
        where: {
            reffCode: reffcode
        }
    });

    if(!existingPT) {
        return NextResponse.json({
            message: 'Refferal kode perusahaan tidak ada / tidak ditemukan!'
        }, {
            status: 404
        })
    }

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

    const existingUser = await prisma.user.findUnique({
        where: {
            name: name
        }
    });
    if(existingUser) return NextResponse.json({
        message: `Nama Anda sudah terdaftar sebagai ${existingUser.role}`
    }, {
        status: 400
    })

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
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword,
                isNewUser: "true",
                melamar_ke: {
                    connect: {
                        reffCode: reffcode
                    }
                }
            },
            include: {
                melamar_ke: true
            }
        });

        return NextResponse.json({
            message: 'Berhasil mendaftar'
        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}