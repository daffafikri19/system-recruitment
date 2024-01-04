import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';

const SoalDeretAngkaPage = async () => {
    const questionList = await prisma.soalDeret.findMany();
    revalidatePath('/dashboard/kelola-soal/deret-angka');

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalDeretAngkaPage