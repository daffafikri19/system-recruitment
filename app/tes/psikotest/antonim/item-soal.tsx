"use client"
import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import { CountDown } from "./countdown"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { soalAntonim } from "@prisma/client"
import { ButtonControl } from "./button-control"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon, CheckCircle2 } from "lucide-react"
import { useTestPageStore } from "../context-wrapper"
import { submitScore } from "@/actions/mutations/score/antonim/submitScore"

interface Answer {
    numberSoal: number,
    questionId: number;
    selectedAnswer: string;
};

interface ItemSoalProps {
    title: string,
    waktu_pengerjaan: number | undefined,
    max_soal: number | undefined
    id_user: string
}

const fetchAndRandomizeQuestions = async (max_soal: number) => {
    try {
        const response = await axios.post('/api/question-tes/antonim', {
            tipe_soal: "sulit"
        });
        let dataQuestion = response.data;

        for (let i = dataQuestion.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dataQuestion[i], dataQuestion[j]] = [dataQuestion[j], dataQuestion[i]];
        }
        const slicedQuestions = dataQuestion.slice(0, max_soal);
        
        console.log("Sliced questions:", slicedQuestions.length);

        return slicedQuestions;
    } catch (error) {
        throw new Error("Error fetching and randomizing questions");
    }
};

export const ItemSoal = ({ title, waktu_pengerjaan, max_soal, id_user }: ItemSoalProps) => {
    const [listQuestion, setListQuestion] = useState<soalAntonim[]>([]);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const params = useSearchParams();
    const router = useRouter();
    const { setCurrentPage } = useTestPageStore();

    const fetchData = async () => {
        setLoading(true);
        try {
            if(max_soal) {
                const dataQuestion = await fetchAndRandomizeQuestions(max_soal!);
                setListQuestion(dataQuestion);
                console.log(dataQuestion);
            }
        } catch (error) {
            toast({
                title: "Terjadi kesalahan server saat mendapatkan data pertanyaan",
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedAnswers = localStorage.getItem('j-antonim');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }

        fetchData();
    }, [max_soal]);

    const currentIndex: number = parseInt(params.get('p') || "");
    const currentQuestion = listQuestion[currentIndex];

    const handleAnswerChange = (numberSoal: number, questionId: number, selectedAnswer: string) => {
        const updatedAnswers = [...answers];

        const index = updatedAnswers.findIndex((answer) => answer.questionId === questionId);
        if (index !== -1) {
            // Jawaban sudah ada, update jawaban
            updatedAnswers[index].selectedAnswer = selectedAnswer;
        } else {
            // Jawaban belum ada, tambahkan jawaban baru
            updatedAnswers.push({ numberSoal, questionId, selectedAnswer });
        }
        setAnswers(updatedAnswers);
    };

    const saveAnswers = () => {
        const updatedAnswers = [...answers];
        localStorage.setItem('j-antonim', JSON.stringify(updatedAnswers));
    };

    const handlePrevious = () => {
        if (currentIndex >= 1) {
            router.push(`/tes/psikotest?p=${currentIndex - 1}`);
        }
    };

    const handleNext = () => {
        saveAnswers();
        router.push(`/tes/psikotest?p=${currentIndex + 1}`);
    };

    const handleSubmit = async () => {
        let correctAnswer = 0;
        let emptyAnswer = 0;
        const totalQuestions = listQuestion.length;
        const maxScore = 100;

        for (const question of listQuestion) {
            const answer = answers.find((item) => item.questionId === question.id);
            if (answer) {
                if (answer && answer.selectedAnswer === question.kunci_jawaban) {
                    correctAnswer++;
                }
            } else {
                emptyAnswer++;
            }
        }

        const score = (correctAnswer / totalQuestions) * maxScore;
        const wrongAnswer = totalQuestions - correctAnswer - emptyAnswer;

        
        console.log("jumlah jawaban yang benar", correctAnswer)
        console.log("jumlah jawaban yang salah", wrongAnswer)
        console.log("Jumlah jawaban yang kosong:", emptyAnswer)
        console.log("nilai", score);
        const result = await submitScore(correctAnswer, wrongAnswer, score, id_user);
        toast({
            title: result.message,
            variant: result.status === 200 ? "default" : "destructive"
        }) 
        console.log(result.error)
        setCurrentPage("antonim");
        router.push('/tes/psikotest')
    };

    return (
        <>
            <Card className="w-full mt-10">
                <CardHeader>
                    <CardTitle className="font-bold text-xl">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <ButtonControl data={listQuestion} />
                    <CountDown waktu_pengerjaan={waktu_pengerjaan} onCountdownZero={handleSubmit} />
                </CardContent>
            </Card>


            {loading ? (
                <div className="space-y-4 mt-5">
                    <Skeleton className="w-full min-h-[300px] h-full max-h-[600px]" />
                    <Skeleton className="w-full min-h-[300px] h-full max-h-[600px]" />
                    <Skeleton className="w-full min-h-[300px] h-full max-h-[600px]" />
                </div>
            ) : (
                <div>
                    {listQuestion.map((question, index: number) => (
                        <div key={question.id}>
                            {index + 1 == currentIndex && (
                                <>
                                    <Card className="!mt-5 dark:border-gray-2">
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
                                                <p className="font-bold md:text-lg">{index + 1}.</p>
                                                <CardDescription className="text-black dark:text-white font-semibold text-2xl" dangerouslySetInnerHTML={{ __html: question.soal }} />
                                            </div>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-bold">A</span>
                                                    <input
                                                        className="w-4 h-4"
                                                        type="radio"
                                                        id={`${question.id}-A`}
                                                        checked={answers.find((answer) => answer.questionId === question.id)?.selectedAnswer === "A"}
                                                        name={`question-${question.id}`}
                                                        value="A"
                                                        onChange={() => handleAnswerChange(currentIndex, question.id, "A")}
                                                    />
                                                    <Label className="text-xl" htmlFor={`${question.id}-A`}>{question.A}</Label>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <span className="font-bold">C</span>
                                                    <Input
                                                        className="w-4 h-4"
                                                        type="radio"
                                                        id={`${question.id}-C`}
                                                        checked={answers.find((answer) => answer.questionId === question.id)?.selectedAnswer === "C"}
                                                        name={`question-${question.id}`}
                                                        value="C"
                                                        onChange={() => handleAnswerChange(currentIndex, question.id, "C")}
                                                    />
                                                    <Label className="text-xl" htmlFor={`${question.id}-C`}>{question.C}</Label>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <span className="font-bold">B</span>
                                                    <Input
                                                        className="w-4 h-4"
                                                        type="radio"
                                                        id={`${question.id}-B`}
                                                        name={`question-${question.id}`}
                                                        checked={answers.find((answer) => answer.questionId === question.id)?.selectedAnswer === "B"}
                                                        value="B"
                                                        onChange={() => handleAnswerChange(currentIndex, question.id, "B")}
                                                    />
                                                    <Label className="text-xl" htmlFor={`${question.id}-B`}>{question.B}</Label>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <span className="font-bold">D</span>
                                                    <Input
                                                        className="w-4 h-4"
                                                        type="radio"
                                                        id={`${question.id}-D`}
                                                        name={`question-${question.id}`}
                                                        checked={answers.find((answer) => answer.questionId === question.id)?.selectedAnswer === "D"}
                                                        value="D"
                                                        onChange={() => handleAnswerChange(currentIndex, question.id, "D")}
                                                    />
                                                    <Label className="text-xl" htmlFor={`${question.id}-D`}>{question.D}</Label>
                                                </div>

                                                {question.E !== null && (
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-bold">E</span>
                                                        <Input
                                                            className="w-4 h-4"
                                                            type="radio"
                                                            id={`${question.id}-E`}
                                                            name={`question-${question.id}`}
                                                            checked={answers.find((answer) => answer.questionId === question.id)?.selectedAnswer === "E"}
                                                            value="E"
                                                            onChange={() => handleAnswerChange(currentIndex, question.id, "E")}
                                                        />
                                                        <Label className="text-xl" htmlFor={`${question.id}-E`}>{question.E}</Label>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <div className="w-full mt-5 flex items-center justify-end space-x-4">
                                        {currentIndex > 1 && (
                                            <Button variant="outline" onClick={handlePrevious}>
                                                Prev <ArrowLeftFromLineIcon className="w-5 h-5 ml-2" />
                                            </Button>
                                        )}
                                        {currentIndex === max_soal! ? (
                                            <Button onClick={handleSubmit}>
                                                Selesai <CheckCircle2 className="w-5 h-5 ml-2" />
                                            </Button>
                                        ) : (
                                            <Button onClick={handleNext}>
                                                Next <ArrowRightFromLineIcon className="w-5 h-5 ml-2" />
                                            </Button>
                                        )}

                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}