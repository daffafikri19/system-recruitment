import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '../../../components/Breadcrumbs';

const SoalPenalaranLogisPage = async () => {
    const questionList = await prisma.soalPenalaranLogis.findMany();
    revalidatePath('/dashboard/kelola-soal/penalaran-logis');

    return (
        <div>
            <Breadcrumb pageName='Penalaran Logis' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalPenalaranLogisPage