import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';

const SoalSinonimPage = async () => {
    const questionList = await prisma.soalSinonim.findMany();
    revalidatePath('/dashboard/kelola-soal/sinonim');

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalSinonimPage