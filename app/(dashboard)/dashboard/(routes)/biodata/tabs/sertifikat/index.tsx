import { getSertifikatUser } from '@/actions/services/getSertifikatUser'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { SerfitikatUserProps } from '@/types'
import React from 'react'
import { FormDialog } from './formDialog'
import { TableData } from './dataTable'

interface SertifikatTabProps {
    username: string,
    sessionUserId: string
}

export const getDataSertifikatUser = async ({ sessionUserId }: { sessionUserId: string }) => {
    try {
        const result = await getSertifikatUser({ sessionUserId });
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

export const SertifikatTab = async ({ username, sessionUserId }: SertifikatTabProps) => {

    const dataSertifikat = await getDataSertifikatUser({ sessionUserId }) as SerfitikatUserProps[];
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
