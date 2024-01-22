"use server"

import prisma from "@/lib/utils/prisma";
import * as z from "zod";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export const addNewAdminAccount = async (formdata: FormData) => {

    const schema = z.object({
        name: z.string().min(3),
        email: z.string().min(6),
        tgl_lahir: z.string().min(1),
        role: z.string().min(1),
        password: z.string().min(3),
        // operator: z.string().min(1),
    });

    const parse = schema.safeParse({
        name: formdata.get('name'),
        email: formdata.get('email'),
        tgl_lahir: formdata.get('tgl_lahir'),
        role: formdata.get('role'),
        password: formdata.get('password'),
        // operator: formdata.get('operator')
    });

    if(!parse.success) {
        let errorMessage = "";
        parse.error.issues.forEach((error) => {
            errorMessage = errorMessage + error.path[0] + error.message
        })
        return {
            message: errorMessage
        }
    }
    const data = parse.data;

    // const operator = await prisma.user.findUnique({
    //     where: {
    //         name: data.operator
    //     }
    // });

    // if(operator?.role !== "superadmin") {
    //     return {
    //         message: "Hanya superadmin yang dapat melakukan aksi ini",
    //         status: 401
    //     }
    // }

    const exisingUsername = await prisma.admin.findUnique({
        where: {
            name: data.name
        }
    });

    if(exisingUsername) {
        return {
            message: "username sudah digunakan diakun lain",
            status: 400
        }
    }

    const existingEmail = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if(existingEmail) {
        return {
            message: "email sudah digunakan diakun lain",
            status: 400
        }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    try {
        await prisma.admin.create({
            data: {
                name: data.name,
                email: data.email,
                role: data.role as any,
                emailVerified: false,
                password: hashedPassword,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
            }
        });

        revalidatePath('/dashboard/daftar-admin');

        return {
            message: "Akun berhasil ditambahkan",
            status: 200
        }
    } catch (error) {
        return {
            message: "Terjadi kesalahan server saat menambahkan akun",
            status: 500,
            error: error
        }
    }
}