import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';

const SoalPenalaranAnalitik = async () => {
    const questionList = await prisma.soalPenalaranAnalitik.findMany();
    revalidatePath('/dashboard/kelola-soal/penalaran-analitik');

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalPenalaranAnalitik