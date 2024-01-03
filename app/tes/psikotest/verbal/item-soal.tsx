"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import { useEffect, useState } from "react"
import { CountDown } from "./countdown"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { tipe_soal } from "@prisma/client"
import { ButtonControl } from "./button-control"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from "lucide-react"

interface Answer {
    numberSoal: number,
    questionId: number;
    selectedAnswer: string;
};

interface SoalVerbalProps {
    id: number;
    gambar: string | null;
    soal: string;
    A: string;
    B: string;
    C: string;
    D: string;
    E: string | null;
    kunci_jawaban: string;
    waktu: number;
    tipe_soal: tipe_soal;
    aktif: boolean;
    createdAt: string;
    updatedAt: string;
}

export const ItemSoal = ({ title }: { title: string }) => {
    const [listQuestion, setListQuestion] = useState<SoalVerbalProps[]>([]);
    const [countdown, setCountdown] = useState<string | any>("");
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const savedAnswers = localStorage.getItem('j-verbal');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }

        getQuestionData();
    }, []);

    const getQuestionData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/question-tes/verbal');
            const dataQuestion = response.data;
            console.log(dataQuestion)
            for (let i = dataQuestion.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [dataQuestion[i], dataQuestion[j]] = [dataQuestion[j], dataQuestion[i]];
            }
            setListQuestion(dataQuestion);
            setCountdown(dataQuestion[0].waktu.toString())
        } catch (error: any) {
            toast({
                title: "Terjadi kesalahan server saat mendapatkan data pertanyaan",
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

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
        localStorage.setItem('j-verbal', JSON.stringify(updatedAnswers));
    };


    const handleSubmit = () => {
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
    };

    const handlePrevious = () => {
        if (currentIndex >= 1) {
            router.push(`/tes/psikotest?p=${currentIndex - 1}`)
        } else {
            return
        }
    }

    const handleNext = () => {
        saveAnswers();
        router.push(`/tes/psikotest?p=${currentIndex + 1}`)
    }

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
                    <CountDown waktu_pengerjaan={countdown} />
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
                                            <Button type="button" variant="outline" onClick={handlePrevious}>
                                                Prev <ArrowLeftFromLineIcon className="w-5 h-5 ml-2" />
                                            </Button>
                                        )}
                                        <Button type="button" onClick={handleNext} className="text-white">
                                            Next <ArrowRightFromLineIcon className="w-5 h-5 ml-2" />
                                        </Button>
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