import React, { useEffect, useState } from "react";
import { useTestPageStore } from "../context-wrapper";
import { cn } from "@/lib/utils/utils";

interface CountdownProps {
    waktu_pengerjaan: number | undefined;
    onCountdownZero: () => void;
}

let countdownInterval: NodeJS.Timeout;

export const CountDown = ({ waktu_pengerjaan, onCountdownZero }: CountdownProps) => {
    const [countdown, setCountdown] = useState(() => {
        return typeof localStorage !== 'undefined'
            ? JSON.parse(localStorage.getItem('w-psikotest') || "{}")
            : {};
    });

    const [startCountdown, setStartCountdown] = useState(false);
    const { currentPage, setCurrentPage } = useTestPageStore();
    const [color, setColor] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlParams.entries());
            if (params.tes === '1' || !params.tes) {
                setStartCountdown(true);
            } else {
                setCountdown({
                    'w-hitung-cepat': waktu_pengerjaan!,
                });
            }
        }
    }, [waktu_pengerjaan]);

    useEffect(() => {
        if (countdown['w-hitung-cepat'] <= 20 && startCountdown) {
            setColor(true);
        }
        if (countdown['w-hitung-cepat'] <= 0 && startCountdown) {
            clearInterval(countdownInterval);
            localStorage.setItem('w-psikotest', JSON.stringify({
                'w-hitung-cepat': waktu_pengerjaan!,
            }));
            onCountdownZero();
        } else {
            typeof window !== 'undefined' && localStorage.setItem('w-psikotest', JSON.stringify(countdown));
        }
    }, [countdown, startCountdown, waktu_pengerjaan, onCountdownZero]);

    useEffect(() => {
        if (startCountdown) {
            countdownInterval = setInterval(() => {
                setCountdown((prevTime: any) => {
                    const newTime = {
                        ...prevTime,
                        'w-hitung-cepat': prevTime['w-hitung-cepat'] - 1,
                    };
                    return newTime;
                });
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

    return (
        <div>
            <div className="w-full flex items-center justify-end">
                <div>
                    <p className="text-center text-lg">waktu tes tersisa</p>
                    {startCountdown ? (
                        <h1 className={cn("text-6xl", color ? "text-red-500" : "")}>
                            {formatTimeCountdown(countdown['w-hitung-cepat'])}
                        </h1>
                    ) : (
                        <h1 className={cn("text-6xl", color ? "text-red-500" : "text-muted-foreground")}>
                            00 : 00 : 00
                        </h1>
                    )}
                </div>
            </div>
        </div>
    );
};
