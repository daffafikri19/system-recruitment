import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { TableData } from './dataTable'
import prisma from '@/lib/utils/prisma'
import { dokumenUser } from '@prisma/client'

interface DokumenProps {
    username: string,
    sessionUserId: string
}

export const DokumenTab = async ({ username, sessionUserId }: DokumenProps) => {
    const data = await prisma.dokumenUser.findUnique({
        where: {
            user_id: sessionUserId
        }
    }) as dokumenUser
    return (
        <div className='dark:bg-boxdark py-4'>
            <div className='w-full mb-20'>
                <Card>
                    <CardContent className='p-0'>
                        <TableData user_id={sessionUserId} username={username} data={data} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
