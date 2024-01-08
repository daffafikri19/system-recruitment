import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/providers/auth';
import { biodataUser } from '@prisma/client';

const DaftarPesertaPage = async () => {
    const session = await getServerSession(authOptions);

    const dataUser = await prisma.user.findMany({
        where: {
            role: 'peserta'
        }
    });

    if(!dataUser) {
        return (
            <div>
                loading...
            </div>
        )
    }
    
    const BioUser = await prisma.biodataUser.findUnique({
      where: {
        id_user: session?.user.id
      }
    }) as biodataUser

    return (
        <div className='w-full h-full'>
            <Card>
                <CardContent className='p-0'>
                    <DataTable listData={dataUser} listBio={BioUser} />
                </CardContent>
            </Card>
        </div>
    )
}

export default DaftarPesertaPage