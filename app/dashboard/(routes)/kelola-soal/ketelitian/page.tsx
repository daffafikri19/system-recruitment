import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';

const SoalKetelitianPage = async () => {
    const questionList = await prisma.soalKetelitian.findMany();
    revalidatePath('/dashboard/kelola-soal/ketelitian');

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKetelitianPage