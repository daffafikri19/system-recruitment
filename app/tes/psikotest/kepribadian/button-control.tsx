"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface buttonItemProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "status" | "success" | null | undefined,
    number: number,
}

interface Answer {
    numberSoal: number,
    questionId: number;
    selectedAnswer: string;
};

interface ButtonControlProps {
    data: any[]
}

export const ButtonControl = ({ data }: ButtonControlProps) => {
    const params = useSearchParams();
    const router = useRouter();
    const currentPage = params.get('p')
    const [savedAnswers, setSavedAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            const storedData = JSON.parse(localStorage.getItem('j-psikotest') || "{}") || {};
            const savedAnswer = storedData['j-kepribadian'] || [];
            setSavedAnswers(savedAnswer);
        }
    }, [currentPage]);

    const ButtonItem = ({ variant, number }: buttonItemProps) => {
        const isAnswered = savedAnswers.some(answer => answer.numberSoal === number);

        return (
            <Button size="sm" variant={isAnswered ? "success" : variant} onClick={() => router.push(`/tes/psikotest?p=${number}`)}>
                {number}
            </Button>
        );
    };


    return (
        <Card>
            <CardContent className="p-2 grid grid-cols-10 gap-1">
                {Array.from({ length: data.length }, (_, index: number) => (
                    <ButtonItem number={index + 1} key={index + 1}
                        variant={currentPage === String(index + 1) ? "default" : "outline"} />
                ))}
            </CardContent>
        </Card>
    )
}