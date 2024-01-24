import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '../../../components/Breadcrumbs';

const SoalPenalaranAnalitik = async () => {
    const questionList = await prisma.soalPenalaranAnalitik.findMany();
    revalidatePath('/dashboard/kelola-soal/penalaran-analitik');

    return (
        <div>
            <Breadcrumb pageName='Penalaran Analitik' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalPenalaranAnalitik