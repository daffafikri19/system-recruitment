import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface CountdownProps {
    waktu_pengerjaan: string | undefined;
}
let countdownInterval: any;

export const CountDown = ({ waktu_pengerjaan }: CountdownProps) => {
    const [countdown, setCountdown] = useState(() => {
        return typeof localStorage !== 'undefined' ? parseInt(localStorage.getItem('waktu_pengerjaan_tes_1')
            || "") : 0
    });

    const [startCountdown, setStartCountdown] = useState(false);
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const timeInSecond = parseInt(waktu_pengerjaan!) * 60;
            console.log("jam ke detik", timeInSecond)
            localStorage.setItem('waktu_pengerjaan_tes_1', timeInSecond.toString())
            const urlParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlParams.entries());
            if (params.tes === '1' || !params.tes) {
                setStartCountdown(true);
            } else {
                setCountdown(3600);
            }
        }
    }, []);

    useEffect(() => {
        let countdownInterval: any;

        if (startCountdown) {
            countdownInterval = setInterval(() => {
                setCountdown((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(countdownInterval);
        };
    }, [startCountdown]);

    useEffect(() => {
        if (countdown <= 0) {
            localStorage.setItem('waktu_pengerjaan_tes_1', "3600");
            setOpenModal(true)
        } else {
            typeof window !== 'undefined' && localStorage.setItem('waktu_pengerjaan_tes_1', countdown.toString());

        }
    }, [countdown]);

    const formatTimeCountdown = (time: any) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    };

    const handleResetCountdown = () => {
        // Ambil nilai waktu_pengerjaan dari properti dan konversi ke satuan detik
        const initialCountdown = parseInt(waktu_pengerjaan || "0") * 60;

        // Set nilai countdown ke nilai awal
        setCountdown(initialCountdown);
        setStartCountdown(false);

        // Simpan nilai awal ke localStorage
        localStorage.setItem('waktu_pengerjaan_tes_1', initialCountdown.toString());
    };

    const handleStartCountdown = () => {
        const initialCountdown = parseInt(waktu_pengerjaan || "0") * 60;
        setCountdown(initialCountdown);
        setStartCountdown(true);
    };


    return (
        <div>
            <div className="w-full flex items-center justify-end">
                <div>
                    <p className="text-sm text-center">waktu tes tersisa</p>
                    {startCountdown ? (
                        <Button variant="outline"><h1 className='text-xl'>{formatTimeCountdown(countdown)}</h1></Button>
                    ) : (
                        <Button variant="outline" disabled><h1 className='text-xl'>00 : 00 : 00</h1></Button>
                    )}
                </div>
            </div>

            <Button variant="destructive" size="sm" onClick={handleResetCountdown}>Reset</Button>
            <Button variant="outline" size="sm" onClick={() => setStartCountdown(false)}>Stop</Button>
            <Button className="text-white" size="sm" onClick={handleStartCountdown}>Start</Button>
            <AlertDialog>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Waktu Tes Telah Habis!</AlertDialogTitle>
                        <AlertDialogDescription>jawaban anda sudah tersimpan dalam sistem, mohon lanjutkan ke Tes berikutnya</AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogAction className="text-white">Lanjutkan</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
