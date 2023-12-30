"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { SoalTPAProps } from "@/types"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { CountDown } from "./countdown"
import axios from "axios"
import { Button } from "@/components/ui/button"

interface Answer {
    questionId: number;
    selectedAnswer: string;
};

export const ItemSoal = () => {
    // const listQuestion = await prisma.soalTPA.findMany() as SoalTPAProps[];
    const [listQuestion, setListQuestion] = useState<SoalTPAProps[]>([]);
    const [countdown, setCountdown] = useState<string | any>("");
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState<Answer[]>([]);

    const getQuestionData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/question-tes/tpa');
            setListQuestion(response.data)
            console.log(response.data)
            return response.data
        } catch (error: any) {
            toast({
                title: "Terjadi kesalahan server saat mendapatkan data pertanyaan",
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    const getCountdown = async () => {
        try {
            const response = await axios.get('/api/question-tes/settings');
            console.log(response.data)
            setCountdown(response.data.waktu_pengerjaan_tes_1 as string)
            return response.data
        } catch (error: any) {
            toast({
                title: "Terjadi kesalahan server saat mendapatkan data peraturan",
                variant: 'destructive'
            })
        }
    }

    useEffect(() => {
        getQuestionData();
        getCountdown();
    }, []);

    const handleAnswerChange = (questionId: number, selectedAnswer: string) => {
        const updatedAnswers = [...answers];
        console.log("updated answer", updatedAnswers);
        const index = updatedAnswers.findIndex((answer) => answer.questionId === questionId);
        if (index !== -1) {
          // Jawaban sudah ada, update jawaban
          updatedAnswers[index].selectedAnswer = selectedAnswer;
        } else {
          // Jawaban belum ada, tambahkan jawaban baru
          updatedAnswers.push({ questionId, selectedAnswer });
        }
        setAnswers(updatedAnswers);
      };

    const handleSubmit = () => {
        try {
            console.log(answers)
        } catch (error) {
            toast({
                title: "terjadi kesalahan saat submit jawaban",
                variant: 'destructive'
            });
            return;
        }
    };    

    

    return (
        <>
            {/* <CountDown waktu_pengerjaan={countdown.waktu_pengerjaan_tes_1} /> */}

            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="w-full min-h-[300px] h-full max-h-[600px]" />
                    <Skeleton className="w-full min-h-[300px] h-full max-h-[600px]" />
                    <Skeleton className="w-full min-h-[300px] h-full max-h-[600px]" />
                </div>
            ) : (
                <div>
                    {listQuestion.map((question, index: number) => (
                        <Card key={question.id} className="!mt-5 dark:border-white">
                            <CardHeader>
                                {question.gambar !== "null" && question.gambar !== null && (
                                    <CardTitle className="w-full flex items-center justify-center">
                                        <div className="flex flex-col text-center">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Image src={`https://filemanager-e-recruitment.teinsolutions.com${question.gambar}`}
                                                        alt="gambar soal" width={200} height={200} />
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <Image src={`https://filemanager-e-recruitment.teinsolutions.com${question.gambar}`}
                                                        alt="gambar soal" width={600} height={600} />
                                                </DialogContent>
                                            </Dialog>

                                            <p className="text-xs text-muted-foreground">perhatikan gambar diatas</p>
                                        </div>
                                    </CardTitle>
                                )}
                                <div className="flex items-start space-x-4">
                                    <span className="font-bold md:text-lg">{index + 1}.</span>
                                    <CardDescription className="text-black dark:text-white font-semibold" dangerouslySetInnerHTML={{ __html: question.soal }} />
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold">A</span>
                                        <Input
                                            className="w-4 h-4"
                                            type="radio"
                                            id={`${question.id}-a`}
                                            name={`question-${question.id}`}
                                            value="A"
                                            onChange={() => handleAnswerChange(question.id, "A")}
                                        />
                                        <Label htmlFor={`${question.id}-a`}>{question.a}</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold">C</span>
                                        <Input
                                            className="w-4 h-4"
                                            type="radio"
                                            id={`${question.id}-c`}
                                            name={`question-${question.id}`}
                                            value="C"
                                            onChange={() => handleAnswerChange(question.id, "C")}
                                        />
                                        <Label htmlFor={`${question.id}-c`}>{question.c}</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold">B</span>
                                        <Input
                                            className="w-4 h-4"
                                            type="radio"
                                            id={`${question.id}-b`}
                                            name={`question-${question.id}`}
                                            value="B"
                                            onChange={() => handleAnswerChange(question.id, "B")}
                                        />
                                        <Label htmlFor={`${question.id}-b`}>{question.b}</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold">D</span>
                                        <Input
                                            className="w-4 h-4"
                                            type="radio"
                                            id={`${question.id}-d`}
                                            name={`question-${question.id}`}
                                            value="D"
                                            onChange={() => handleAnswerChange(question.id, "D")}
                                        />
                                        <Label htmlFor={`${question.id}-d`}>{question.d}</Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <div className="w-full mt-5 flex items-center justify-end">
                        <Button type="button" onClick={handleSubmit} className="text-white">Submit</Button>
                    </div>
                </div>
            )}
        </>
    )
}