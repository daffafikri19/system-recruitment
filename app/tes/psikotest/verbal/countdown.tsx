import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTestPageStore } from "../context-wrapper";

interface CountdownProps {
    waktu_pengerjaan: number | undefined;
}
let countdownInterval: NodeJS.Timeout;

export const CountDown = ({ waktu_pengerjaan }: CountdownProps) => {
    const [countdown, setCountdown] = useState(() => {
        return typeof localStorage !== 'undefined' ? parseInt(localStorage.getItem('w-verbal') || "") : 0;
    });

    const [startCountdown, setStartCountdown] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const setCurrentPage = useTestPageStore((state) => state.setCurrentPage);

    useEffect(() => {
        if (typeof window !== 'undefined') {

            localStorage.setItem('w-verbal', waktu_pengerjaan!.toString());
            const urlParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlParams.entries());
            if (params.tes === '1' || !params.tes) {
                setStartCountdown(true);
            } else {
                setCountdown(waktu_pengerjaan!);
            }
        }
    }, []);

    useEffect(() => {
        if (countdown <= 0 && startCountdown) {
            clearInterval(countdownInterval);
            localStorage.setItem('w-verbal', waktu_pengerjaan!.toString());
            setOpenModal(true);
        } else {
            typeof window !== 'undefined' && localStorage.setItem('w-verbal', countdown.toString());
        }
    }, [countdown, startCountdown]);

    useEffect(() => {
        if (startCountdown) {
            countdownInterval = setInterval(() => {
                setCountdown((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(countdownInterval);
        };
    }, [startCountdown]);

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

    const handleLanjutkan = () => {
        setCurrentPage('tes2');
        handleResetCountdown();
        setStartCountdown(false);
        setOpenModal(false);
    };

    return (
        <div>
            <div className="w-full flex items-center justify-end">
                <div>
                    <p className="text-center text-lg">waktu tes tersisa</p>
                    {startCountdown ? (
                        <h1 className='text-6xl'>
                            {formatTimeCountdown(countdown)}
                        </h1>
                    ) : (
                        <h1 className='text-6xl text-muted-foreground'>
                            00 : 00 : 00
                        </h1>
                    )}
                </div>
            </div>

            {/* <Button variant="destructive" size="sm" onClick={handleResetCountdown}>Reset</Button>
            <Button variant="outline" size="sm" onClick={() => setStartCountdown(false)}>Stop</Button>
            <Button className="text-white" size="sm" onClick={handleStartCountdown}>Start</Button> */}
            <AlertDialog open={openModal} onOpenChange={setOpenModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Waktu Tes Telah Habis!</AlertDialogTitle>
                        <AlertDialogDescription>jawaban anda sudah tersimpan dalam sistem, mohon lanjutkan ke Tes berikutnya</AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogAction className="text-white" onClick={handleLanjutkan}>Lanjutkan</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
