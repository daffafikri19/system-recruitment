import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { DataTable } from './dataTable';
import { getDataKeluarga } from '@/actions/mutations/keluarga/getKeluargaUser';
import { DataKeluargaProps } from '@/types';
import { FormDialog } from './formDialog';

interface KeluargaTabProps {
    sessionUserId: string,
    username: string
}

export const getDataKeluargaUser = async ({ sessionUserId, username } : KeluargaTabProps) => {
    try {
        const data = getDataKeluarga({ sessionUserId, username });
        return data
    } catch (error : any) {
        if(error) {
            toast({
                title: error.response.data.message,
                variant: 'destructive'
            })
        }
    }
}

export const KeluargaTab = async ({ sessionUserId, username } : KeluargaTabProps) => {

    const dataKeluarga = await getDataKeluargaUser({ sessionUserId, username }) as DataKeluargaProps[];

    if(!dataKeluarga) {
        return (
            <div>loading...</div>
        )
    }
    return (
        <div className='dark:bg-boxdark py-4'>
            <div className='w-full mb-20'>
                <FormDialog username={username} />
                <Card>
                    <CardContent className='p-0'>
                        <DataTable contentData={dataKeluarga} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
