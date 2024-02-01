import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { FormDialog } from './formDialog'
import { TableData } from './dataTable'
import { keterampilanUser } from '@prisma/client'
import prisma from '@/lib/utils/prisma'

interface KeterampilanTabProps {
    username: string,
    sessionUserId: string
}

export const KeterampilanTab = async ({ username, sessionUserId }: KeterampilanTabProps) => {
    const data = await prisma.keterampilanUser.findMany({
        where: {
            biodata: {
                every: {
                    id_user: sessionUserId
                }
            }
        },
        include: {
            biodata: true
        }
    }) as keterampilanUser[] || null

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
