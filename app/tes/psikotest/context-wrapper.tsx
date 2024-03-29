"use client";
import React, { useEffect, useState } from 'react';
import { create } from "zustand";
import { InformasiTesCard } from './informasi-tes';
import { SessionProvider } from 'next-auth/react';
import { VerbalTes } from './verbal';
import { AntonimTes } from './antonim';
import { SinonimTes } from './sinonim';
import { AntonimSinonimTes } from './antonim-sinonim';

type TestPageStore = {
    currentPage: string
    setCurrentPage: (page: string) => void;
};

export const useTestPageStore = create<TestPageStore>((set) => ({
    currentPage: typeof localStorage !== "undefined" ? localStorage.getItem("currentPage") || "landing" : "",
    setCurrentPage: (page) => set(() => ({ currentPage: page })),
}));

const ContextPsikotest = ({ children } : { children: React.ReactNode }) => {
    const currentPage = useTestPageStore((state) => state.currentPage);
    const setCurrentPage = useTestPageStore((state) => state.setCurrentPage);
    const [client, setClient] = useState(false);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);

    if (
        currentPage === 'verbal' || 
        currentPage === 'antonim' || 
        currentPage === 'sinonim' || 
        currentPage === 'antonim-sinonim' ||
        currentPage === 'deret' ||
        currentPage === 'hitung-cepat' ||
        currentPage === 'informasi-singkat' ||
        currentPage === 'kalimat-tak-teratur' ||
        currentPage === 'kemampuan-teknikal' ||
        currentPage === 'kepribadian' ||
        currentPage === 'ketelitian' ||
        currentPage === 'kuantitatif-analisis' ||
        currentPage === 'penalaran-analitik' ||
        currentPage === 'penalaran-logis' ||
        currentPage === 'bahasa-inggris'
        ) {
        setCurrentPage(currentPage);
    } else {
        // Redirect ke halaman yang sesuai jika currentPage tidak valid
        // Misalnya, redirect ke halaman tes1 jika currentPage tidak valid
        setCurrentPage('landing');
    }

    useEffect(() => {
        setClient(true)
    });

    if(!client) {
        return null
    }


    return (
        <SessionProvider>
            {currentPage === 'landing' && <InformasiTesCard />}
            {currentPage === 'verbal' && <VerbalTes />}
            {currentPage === 'antonim' && <AntonimTes />}
            {currentPage === 'sinonim' && <SinonimTes />}
            {currentPage === 'antonim-sinonim' && <AntonimSinonimTes />}
            {/* {currentPage === 'deret' && < />} */}
            {/* {currentPage === 'hitung-cepat' && < />} */}
            {/* {currentPage === 'informasi-singkat' && < />} */}
            {/* {currentPage === 'kalimat-tak-teratur' && < />} */}
            {/* {currentPage === 'kemampuan-teknikal' && < />} */}
            {/* {currentPage === 'kepribadian' && < />} */}
            {/* {currentPage === 'ketelitian' && < />} */}
            {/* {currentPage === 'kuantitatif-analisis' && < />} */}
            {/* {currentPage === 'penalaran-analitik' && < />} */}
            {/* {currentPage === 'penalaran-logis' && < />} */}
            {/* {currentPage === 'bahasa-inggris' && < />} */}
        </SessionProvider>
    )
}

export default ContextPsikotest;