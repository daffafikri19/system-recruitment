import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '../../../components/Breadcrumbs';

const SoalInformasiSingkatPage = async () => {
    const questionList = await prisma.soalInformasiSingkat.findMany();
    revalidatePath('/dashboard/kelola-soal/informasi-singkat');

    return (
        <div>
            <Breadcrumb pageName='Informasi Singkat' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalInformasiSingkatPage