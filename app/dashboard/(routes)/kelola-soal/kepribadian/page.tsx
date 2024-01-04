import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';

const SoalKepribadianPage = async () => {
    const questionList = await prisma.soalKepribadian.findMany();
    revalidatePath('/dashboard/kelola-soal/kepribadian');

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKepribadianPage