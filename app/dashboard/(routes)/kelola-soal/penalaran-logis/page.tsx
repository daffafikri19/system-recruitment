import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';

const SoalPenalaranLogisPage = async () => {
    const questionList = await prisma.soalPenalaranLogis.findMany();
    revalidatePath('/dashboard/kelola-soal/penalaran-logis');

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalPenalaranLogisPage