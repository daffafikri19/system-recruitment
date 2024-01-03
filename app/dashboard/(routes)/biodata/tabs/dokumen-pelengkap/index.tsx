import { Card, CardContent } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import React from 'react'
import { FormDialog } from './formDialog'
import { TableData } from './dataTable'
import { getDokumenUser } from '@/actions/mutations/dokumen/getDokumenUser'
import { dokumenUser } from '@prisma/client'

interface DokumenProps {
    username: string,
    sessionUserId: string
}

export const getDataDokumen = async ({ sessionUserId }: { sessionUserId: string }) => {
    try {
        const result = await getDokumenUser({ sessionUserId });
        return result
    } catch (error: any) {
        if (error) {
            toast({
                title: error.message,
                variant: 'destructive'
            })
        }
    }
}

export const DokumenTab = async ({ username, sessionUserId }: DokumenProps) => {
    const dataSertifikat = await getDataDokumen({ sessionUserId }) as dokumenUser[];
    if (!dataSertifikat) {
        return (
            <div>
                loading...
            </div>
        )
    }
    return (
        <div className='dark:bg-boxdark py-4'>
            <div className='w-full mb-20'>
                <FormDialog username={username} />
                <Card>
                    <CardContent className='p-0'>
                        <TableData contentData={dataSertifikat} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
