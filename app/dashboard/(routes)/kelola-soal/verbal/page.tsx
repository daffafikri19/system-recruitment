import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';

const SoalVerbalPage = async () => {
    const questionList = await prisma.soalVerbal.findMany();
    revalidatePath('/dashboard/kelola-soal/verbal');

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalVerbalPage