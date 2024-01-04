import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';

const SoalKemampuanTeknikalPage = async () => {
    const questionList = await prisma.soalKemampuanTeknikal.findMany();
    revalidatePath('/dashboard/kelola-soal/kemampuan-teknikal');

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKemampuanTeknikalPage