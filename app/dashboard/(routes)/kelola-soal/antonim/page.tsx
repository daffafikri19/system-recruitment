import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '../../../components/Breadcrumbs';

const SoalAntonimPage = async () => {
    const questionList = await prisma.soalAntonim.findMany();
    revalidatePath('/dashboard/kelola-soal/antonim');

    return (
        <div>
            <Breadcrumb pageName='Antonim' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalAntonimPage