import { Card, CardContent } from '@/components/ui/card'
import { ItemSoal } from './item-soal';


const Tes1 = async () => {
    return (
        <div>
            <Card className='my-4'>
                <CardContent className='space-y-3 mt-4'>
                    <ItemSoal />
                </CardContent>
            </Card>
        </div>
    )
}

export default Tes1