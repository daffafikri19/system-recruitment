import React from 'react';
import { FormBiodata } from './formBiodata';
import prisma from '@/lib/utils/prisma';
import { biodataUser } from '@prisma/client';

interface dataDiriTabProps {
    sessionUserId: string,
    username: string,
    email: string
}

export const DataDiriTab = async ({ sessionUserId, username, email }: dataDiriTabProps) => {
    const data = await prisma.biodataUser.findUnique({
        where: {
            id_user: sessionUserId
        }
    }) as biodataUser | null

    return (
        <div className='dark:bg-boxdark'>
            <FormBiodata data={data ?? undefined} id_user={sessionUserId} />
        </div >
    )
}
