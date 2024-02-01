import { Card, CardContent } from '@/components/ui/card';
import { AddPendidikanModal } from './addPendidikanModal';
import { DataTable } from './dataTable';
import prisma from '@/lib/utils/prisma';
import { PendidikanUserProps } from '@/types';

interface pendidikanUserTabProps {
    sessionUserId: string,
    username: string
}

export const PendidikanTab = async ({ sessionUserId, username } : pendidikanUserTabProps) => {
    const dataPendidikanUser = await prisma.pendidikanUser.findMany({
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
    }) as PendidikanUserProps[] || null

    return (
        <div className='dark:bg-boxdark py-4'>
            <div className='w-full mb-20'>
                <AddPendidikanModal username={username} />
                <Card>
                    <CardContent className='p-0'>
                        <DataTable contentData={dataPendidikanUser ?? null} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
