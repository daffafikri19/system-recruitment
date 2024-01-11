import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '@/app/dashboard/components/Breadcrumbs';

const SoalDeretAngkaPage = async () => {
    const questionList = await prisma.soalDeret.findMany();
    revalidatePath('/dashboard/kelola-soal/deret-angka');

    return (
        <div>
            <Breadcrumb pageName='Deret Angka' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalDeretAngkaPage