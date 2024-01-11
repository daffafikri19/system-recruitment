import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';
import Breadcrumb from '@/app/dashboard/components/Breadcrumbs';

const SoalKalimatTakTeraturPage = async () => {
    const questionList = await prisma.soalKalimatTakTeratur.findMany();
    revalidatePath('/dashboard/kelola-soal/kalimat-tak-teratur');

    return (
        <div>
            <Breadcrumb pageName='Kalimat Tak Teratur' />
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKalimatTakTeraturPage