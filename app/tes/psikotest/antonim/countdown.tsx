"use client"

import React, { useEffect, useState } from "react";
import { useTestPageStore } from "../context-wrapper";
import { cn } from "@/lib/utils/utils";

interface CountdownProps {
    waktu_pengerjaan: number | undefined
    onCountdownZero: () => void
}
let countdownInterval: NodeJS.Timeout;

export const CountDown = ({
    waktu_pengerjaan,
    onCountdownZero
}: CountdownProps) => {
    const [countdown, setCountdown] = useState(() => {
        return typeof localStorage !== 'undefined' ? parseInt(localStorage.getItem('w-antonim') || "") : 0;
    });

    const [startCountdown, setStartCountdown] = useState(false);
    const { currentPage, setCurrentPage } = useTestPageStore();
    const [color, setColor] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlParams.entries());
            if (params.tes === '1' || !params.tes) {
                setStartCountdown(true);
            } else {
                setCountdown(waktu_pengerjaan!);
            }
        }
    }, [waktu_pengerjaan]);

    useEffect(() => {
        if(countdown <= 20 && startCountdown) {
            setColor(true)
        }
        if (countdown <= 0 && startCountdown) {
            clearInterval(countdownInterval);
            localStorage.setItem('w-antonim', waktu_pengerjaan!.toString());
            onCountdownZero();
        } else {
            typeof window !== 'undefined' && localStorage.setItem('w-antonim', countdown.toString());
        }
    }, [countdown, startCountdown, waktu_pengerjaan]);

    useEffect(() => {
        if (startCountdown) {
            countdownInterval = setInterval(() => {
                setCountdown((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(countdownInterval);
        };
    }, [startCountdown, waktu_pengerjaan]);

    const formatTimeCountdown = (time: any) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    };

    const handleResetCountdown = () => {
        const initialCountdown = parseInt(waktu_pengerjaan?.toString() || "0") * 60;
        setCountdown(initialCountdown);
        setStartCountdown(false);
        localStorage.setItem('waktu_pengerjaan_tes_1', initialCountdown.toString());
    };

    const handleStartCountdown = () => {
        const initialCountdown = parseInt(waktu_pengerjaan?.toString() || "0") * 60;
        setCountdown(initialCountdown);
        setStartCountdown(true);
    };

    // const saveScore = async () => {
    //     try {
    //         console.log({
    //             "benar": benar,
    //             "salah": salah,
    //             "score": score,
    //             "id_user": id_user
    //         });

    //         const result = await submitScore({
    //             id_user: id_user,
    //             benar: benar,
    //             salah: salah,
    //             score: score
    //         });

    //         toast({
    //             title: result.message,
    //             variant: result.status === 200 ? "default" : "destructive"
    //         });

    //         setCurrentPage('antonim')
    //     } catch (error) {
    //         console.log(error)
    //         toast({
    //             title: "Terjadi kesalahan server",
    //             variant: "destructive"
    //         })
    //     }
    // }

    return (
        <div>
            <div className="w-full flex items-center justify-end">
                <div>
                    <p className="text-center text-lg">waktu tes tersisa</p>
                    {startCountdown ? (
                        <h1 className={cn("text-6xl", color ? "text-red-500" : "")}>
                            {formatTimeCountdown(countdown)}
                        </h1>
                    ) : (
                        <h1 className={cn("text-6xl", color ? "text-red-500" : "text-muted-foreground")}>
                            00 : 00 : 00
                        </h1>
                    )}
                </div>
            </div>

            {/* <Button variant="destructive" size="sm" onClick={handleResetCountdown}>Reset</Button>
            <Button variant="outline" size="sm" onClick={() => setStartCountdown(false)}>Stop</Button>
            <Button className="text-white" size="sm" onClick={handleStartCountdown}>Start</Button> */}
        </div>
    );
};
