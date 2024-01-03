import { Card, CardContent } from '@/components/ui/card';
import { AddPendidikanModal } from './addPendidikanModal';
import { getPendidikanUser } from '@/actions/mutations/pendidikan/getPendidikanUser';
import { toast } from '@/components/ui/use-toast';
import { DataTable } from './dataTable';
import { PendidikanUserProps } from '@/types';

interface pendidikanUserTabProps {
    sessionUserId: string,
    username: string
}

export const getDataPendidikanUser = async ({ sessionUserId, username } : pendidikanUserTabProps) => {
    try {
        const data = getPendidikanUser({ sessionUserId, username });
        const result = (await data).response
        return result
    } catch (error : any) {
        if(error) {
            toast({
                title: error.response.data.message,
                variant: 'destructive'
            })
        }
    }
}

export const PendidikanTab = async ({ sessionUserId, username } : pendidikanUserTabProps) => {

    const pendidikanUser = await getDataPendidikanUser({ sessionUserId, username }) as PendidikanUserProps[];
    if(!pendidikanUser) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div className='dark:bg-boxdark py-4'>
            <div className='w-full mb-20'>
                <AddPendidikanModal username={username} />
                <Card>
                    <CardContent className='p-0'>
                        <DataTable contentData={pendidikanUser} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
