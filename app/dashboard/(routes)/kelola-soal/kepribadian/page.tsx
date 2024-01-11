import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '@/app/dashboard/components/Breadcrumbs';

const SoalKepribadianPage = async () => {
    const questionList = await prisma.soalKepribadian.findMany();
    revalidatePath('/dashboard/kelola-soal/kepribadian');

    return (
        <div>
            <Breadcrumb pageName='Kepribadian' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKepribadianPage