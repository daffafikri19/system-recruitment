import { Card, CardContent } from '@/components/ui/card';
import { DataTable } from './dataTable';
import { DataKeluargaProps } from '@/types';
import { FormDialog } from './formDialog';
import prisma from '@/lib/utils/prisma';

interface KeluargaTabProps {
    sessionUserId: string,
    username: string
}

export const KeluargaTab = async ({ sessionUserId, username } : KeluargaTabProps) => {

    const data = await prisma.dataKeluarga.findMany({
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
    }) as DataKeluargaProps[] || null

    return (
        <div className='dark:bg-boxdark py-4'>
            <div className='w-full mb-20'>
                <FormDialog username={username} />
                <Card>
                    <CardContent className='p-0'>
                        <DataTable contentData={data ?? null} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
