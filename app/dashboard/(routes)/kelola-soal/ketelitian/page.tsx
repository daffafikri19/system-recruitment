import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '@/app/dashboard/components/Breadcrumbs';

const SoalKetelitianPage = async () => {
    const questionList = await prisma.soalKetelitian.findMany();
    revalidatePath('/dashboard/kelola-soal/ketelitian');

    return (
        <div>
            <Breadcrumb pageName='Ketelitian' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKetelitianPage