import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '../../../components/Breadcrumbs';

const SoalSinonimPage = async () => {
    const questionList = await prisma.soalSinonim.findMany();
    revalidatePath('/dashboard/kelola-soal/sinonim');

    return (
        <div>
            <Breadcrumb pageName='Sinonim' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalSinonimPage