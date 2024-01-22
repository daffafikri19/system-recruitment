import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '../../../components/Breadcrumbs';

const SoalAntonimPage = async () => {
    const questionList = await prisma.soalAntonimSinonim.findMany();
    revalidatePath('/dashboard/kelola-soal/antonim-sinonim');

    return (
        <div>
            <Breadcrumb pageName='Antonim Sinonim' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalAntonimPage