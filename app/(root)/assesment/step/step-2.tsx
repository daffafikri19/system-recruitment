import React, { useEffect, useState } from 'react'
import { questionBank } from '@/constants/question-bank';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProfessionContext } from '.';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

const Step2 = () => {
    const { selectedProfession } = useProfessionContext()!;
    const { isRadioSelected } = useProfessionContext() || {};
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMatchQuestion = async () => {
            setLoading(true)
            try {
                const response = await axios.post('/api/question/getByProfession', {
                    profession: selectedProfession
                });
                setLoading(false)
                console.log(response.data)
                return response.data
            } catch (error : any) {
                if(error) {
                    toast({
                        title: "terjadi error",
                        description: error.response.data.message,
                        variant: 'destructive'
                    });
                    setLoading(false)
                }
            } finally {
                setLoading(false)
            }
        }

        getMatchQuestion()
    }, [])

    

    return (
        <div className='w-full mb-20'>
            {questionBank.map((item, index: number) => (
                <>
                {loading ? (
                    <div>
                        loading....
                    </div>
                ) : (
                    <Card className='w-full' key={item.id}>
                    <CardHeader>
                        <CardDescription>
                            {index + 1}. {item.question}
                        </CardDescription>
                    </CardHeader>
                    {/* <CardContent>
                    </CardContent> */}
                    <CardFooter className='w-full flex items-start flex-col'>
                        <Label>jawaban anda</Label>
                        <Textarea className='mt-2' required={item.required} />
                    </CardFooter>
                </Card>
                )}
                </>
            ))}

        </div>
    )
}

export default Step2