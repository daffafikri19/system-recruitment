"use client";
import React, { useEffect } from 'react';
import { create } from "zustand";
import { VerbalTes } from './verbal';
import { InformasiTesCard } from './informasi-tes';

type TestPageStore = {
    currentPage: string
    setCurrentPage: (page: string) => void;
};

export const useTestPageStore = create<TestPageStore>((set) => ({
    currentPage: typeof localStorage !== "undefined" ? localStorage.getItem("currentPage") || "landing" : "landing",
    setCurrentPage: (page) => set(() => ({ currentPage: page })),
}));

const ContextPsikotest = ({ children }: { children: React.ReactNode }) => {
    const currentPage = useTestPageStore((state) => state.currentPage);
    const setCurrentPage = useTestPageStore((state) => state.setCurrentPage);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);

    if (
        currentPage === 'verbal' || 
        currentPage === 'anonim' || 
        currentPage === 'sinonim' || 
        currentPage === 'antonim-sinonim' ||
        currentPage === 'bahasa-inggris' ||
        currentPage === 'deret' ||
        currentPage === 'hitung-cepat' ||
        currentPage === 'informasi-singkat' ||
        currentPage === 'kalimat-tak-teratur' ||
        currentPage === 'kemampuan-teknikal' ||
        currentPage === 'kepribadian' ||
        currentPage === 'ketelitian' ||
        currentPage === 'kuantitatif-analisis' ||
        currentPage === 'penalaran-analitik' ||
        currentPage === 'penalaran-logis'
        ) {
        setCurrentPage(currentPage);
    } else {
        // Redirect ke halaman yang sesuai jika currentPage tidak valid
        // Misalnya, redirect ke halaman tes1 jika currentPage tidak valid
        setCurrentPage('landing');
    }

    return (
        <div>
            {currentPage === "landing" && <InformasiTesCard />}
            {currentPage === 'verbal' && <VerbalTes />}
        </div>
    )
}

export default ContextPsikotest;