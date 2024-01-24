import { Card, CardContent } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import React from 'react'
import { FormDialog } from './formDialog'
import { TableData } from './dataTable'
import { getKeterampilan } from '@/actions/mutations/keterampilan/getKeterampilanUser'
import { keterampilanUser } from '@prisma/client'

interface KeterampilanTabProps {
    username: string,
    sessionUserId: string
}

export const getDataKeterampilanUser = async ({ sessionUserId, username }: { sessionUserId: string, username: string }) => {
    try {
        const result = await getKeterampilan({ sessionUserId, username });
        console.log(result)
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

export const KeterampilanTab = async ({ username, sessionUserId }: KeterampilanTabProps) => {

    const dataKeterampilan = await getDataKeterampilanUser({ sessionUserId, username }) as keterampilanUser[];
    if (!dataKeterampilan) {
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
                        <TableData contentData={dataKeterampilan} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
