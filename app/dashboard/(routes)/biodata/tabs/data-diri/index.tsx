import React from 'react';
import { FormBiodata } from './formBiodata';
import prisma from '@/lib/utils/prisma';
import { biodataUser } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface dataDiriTabProps {
    sessionUserId: string,
    username: string,
    email: string
}

export const DataDiriTab = async ({ sessionUserId, username, email }: dataDiriTabProps) => {
    const data = await prisma.biodataUser.findFirst({ where: { id_user: sessionUserId }}) as biodataUser;
    revalidatePath('/dashboard/biodata')
    return (
        <div className='dark:bg-boxdark'>
            <FormBiodata data={data} id_user={sessionUserId} />
        </div >
    )
}
