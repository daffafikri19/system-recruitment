import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { selectedAnswers, id_user } = await req.json();

    let correctAnswer = 0;
    let emptyAnswer = 0;
    const totalQuestions = selectedAnswers.length;
    const maxScore = 100;

    for (const answer of selectedAnswers) {
        const question = await prisma.soalPenalaranLogis.findUnique({
            where: { id: answer.questionId },
            select: { kunci_jawaban: true },
        });

        if (!question) {
            // Handle error if the question is not found
            continue;
        }

        if (answer.selectedAnswer === question.kunci_jawaban) {
            correctAnswer++;
        } else if (!answer.selectedAnswer) {
            emptyAnswer++;
        }
    }

    const score = (correctAnswer / totalQuestions) * maxScore;
    const wrongAnswer = totalQuestions - correctAnswer - emptyAnswer;

    try {
        const existingScoreTotal = await prisma.scoreTotalPsikotest.findUnique({
            where: {
                id_user: id_user,
            },
            select: {
                scorePenalaranLogis: true,
                id_score_penalaran_logis: true,
            },
        });

        if (!existingScoreTotal) {
            return NextResponse.json({
                message: "Data tidak ditemukan",
            }, {
                status: 404,
            }
            );
        }

        const existingScoreId = existingScoreTotal?.id_score_penalaran_logis;

        if (!existingScoreId) {
            // If existingScoreId is not found, create a new record
            const createdScore = await prisma.scorePenalaranLogis.create({
                data: {
                    benar: correctAnswer,
                salah: wrongAnswer,
                score: score,
                kosong: emptyAnswer,
                maxScore: maxScore
                },
            });

            await prisma.scoreTotalPsikotest.update({
                where: {
                    id_user: id_user,
                },
                data: {
                    scorePenalaranLogis: {
                        connect: {
                            id: createdScore.id,
                        },
                    },
                },
            });

            return NextResponse.json({
                message: "Berhasil menyimpan jawaban tes penalaran logis anda",
            }, {
                status: 200,
            }
            );
        }

        // If existingScoreId is found, update record
        await prisma.scorePenalaranLogis.update({
            where: {
                id: existingScoreId,
            },
            data: {
                benar: correctAnswer,
                salah: wrongAnswer,
                score: score,
                kosong: emptyAnswer,
                maxScore: maxScore
            },
        });

        return NextResponse.json({
            message: "Berhasil menyimpan jawaban tes penalaran logis anda",
        }, {
            status: 200,
        }
        );
    } catch (error: any) {
        return NextResponse.json({
            error: error.message || "Internal Server Error",
        }, {
            status: 500,
        }
        );
    }
}
