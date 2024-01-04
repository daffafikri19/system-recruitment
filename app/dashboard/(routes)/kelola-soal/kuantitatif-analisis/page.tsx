import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';

const SoalKuantitatifAnalisisPage = async () => {
    const questionList = await prisma.soalKuantitatifAnalisis.findMany();
    revalidatePath('/dashboard/kelola-soal/kuantitatif-analisis');

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKuantitatifAnalisisPage