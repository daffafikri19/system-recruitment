import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';
import { revalidatePath } from 'next/cache';

const SoalKalimatTakTeraturPage = async () => {
    const questionList = await prisma.soalKalimatTakTeratur.findMany();
    revalidatePath('/dashboard/kelola-soal/kalimat-tak-teratur');

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKalimatTakTeraturPage