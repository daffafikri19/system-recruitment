import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '@/app/dashboard/components/Breadcrumbs';

const SoalKuantitatifAnalisisPage = async () => {
    const questionList = await prisma.soalKuantitatifAnalisis.findMany();
    revalidatePath('/dashboard/kelola-soal/kuantitatif-analisis');

    return (
        <div>
            <Breadcrumb pageName='Kuantitatif Analisis' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKuantitatifAnalisisPage