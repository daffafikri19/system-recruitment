import { Card, CardContent } from '@/components/ui/card';
import { TableData } from './tableData';
import { FormDialog } from './formDialog';
import { PengalamanKerjaProps } from '@/types';
import prisma from '@/lib/utils/prisma';

interface PengalamanKerjaTabProps {
    sessionUserId: string,
    username: string
}

export const PengalamanKerjaTab = async ({ sessionUserId, username } : PengalamanKerjaTabProps) => {

    const data = await prisma.pengalamanKerja.findMany({
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
    }) as PengalamanKerjaProps[] || null

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
