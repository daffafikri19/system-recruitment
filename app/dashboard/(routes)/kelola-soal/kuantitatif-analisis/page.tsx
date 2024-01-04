import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';

const SoalKuantitatifAnalisisPage = async () => {
    const questionList = await prisma.soalKuantitatifAnalisis.findMany();

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKuantitatifAnalisisPage