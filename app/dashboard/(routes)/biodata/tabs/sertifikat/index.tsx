import { Card, CardContent } from '@/components/ui/card'
import { SerfitikatUserProps } from '@/types'
import React from 'react'
import { FormDialog } from './formDialog'
import { TableData } from './dataTable'
import prisma from '@/lib/utils/prisma'

interface SertifikatTabProps {
    username: string,
    sessionUserId: string
}

export const SertifikatTab = async ({ username, sessionUserId }: SertifikatTabProps) => {

    const data = await prisma.serfitikatUser.findMany({
        where: {
            biodata: {
                every: {
                    nama_lengkap: username
                }
            }
        },
        include: {
            biodata: true
        }
    }) as SerfitikatUserProps[] || null

    return (
        <div className='dark:bg-boxdark py-4'>
            <div className='w-full mb-20'>
                <FormDialog username={username} />
                <Card>
                    <CardContent className='p-0'>
                        <TableData contentData={data ?? null} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
