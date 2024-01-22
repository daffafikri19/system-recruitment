import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '../../../components/Breadcrumbs';

const SoalHiitungCepatPage = async () => {
    const questionList = await prisma.soalhitungCepat.findMany();
    revalidatePath('/dashboard/kelola-soal/hitung-cepat');

    return (
        <div>
            <Breadcrumb pageName='Hitung Cepat' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalHiitungCepatPage