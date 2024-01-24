import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '../../../components/Breadcrumbs';

const SoalVerbalPage = async () => {
    const questionList = await prisma.soalVerbal.findMany();
    revalidatePath('/dashboard/kelola-soal/verbal');

    return (
        <div>
            <Breadcrumb pageName='Analogi Verbal' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalVerbalPage