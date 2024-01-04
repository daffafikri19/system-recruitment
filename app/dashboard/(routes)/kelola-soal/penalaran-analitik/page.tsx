import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';

const SoalPenalaranAnalitik = async () => {
    const questionList = await prisma.soalPenalaranAnalitik.findMany();

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalPenalaranAnalitik