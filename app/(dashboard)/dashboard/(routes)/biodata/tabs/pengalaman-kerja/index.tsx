import { Card, CardContent } from '@/components/ui/card';
import { TableData } from './tableData';
import { FormDialog } from './formDialog';
import { toast } from '@/components/ui/use-toast';
import { getDataPengalamanKerjaUser } from '@/actions/services/getPengalamanKerjaUser';
import { PengalamanKerjaProps } from '@/types';

interface PengalamanKerjaTabProps {
    sessionUserId: string,
    username: string
}

export const getDataPengalamanUser = async (username: string) => {
    try {
        const response = await getDataPengalamanKerjaUser(username);
        return response
    } catch (error : any) {
        if(error) {
            toast({
                title: error.response.data.message,
                variant: "destructive"
            })
        }
    }
}

export const PengalamanKerjaTab = async ({ sessionUserId, username } : PengalamanKerjaTabProps) => {

    const data = await getDataPengalamanUser(username) as PengalamanKerjaProps[];
    if(!data) return (
        <div>
            loading...
        </div>
    )
    return (
        <div className='dark:bg-boxdark py-4'>
            <div className='w-full mb-20'>
                <FormDialog username={username} />
                <Card>
                    <CardContent className='p-0'>
                        <TableData contentData={data} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
