import { Card, CardContent } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import React from 'react'
import { TableData } from './dataTable'
import { getDokumenUser } from '@/actions/mutations/dokumen/getDokumenUser'
import { dokumenUser } from '@prisma/client'
import { revalidatePath } from 'next/cache'

interface DokumenProps {
    username: string,
    sessionUserId: string
}

export const DokumenTab = async ({ username, sessionUserId }: DokumenProps) => {
    
    return (
        <div className='dark:bg-boxdark py-4'>
            <div className='w-full mb-20'>
                <Card>
                    <CardContent className='p-0'>
                        <TableData id={sessionUserId} username={username} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
