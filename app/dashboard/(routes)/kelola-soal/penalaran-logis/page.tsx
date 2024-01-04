import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';

const SoalPenalaranLogisPage = async () => {
    const questionList = await prisma.soalPenalaranLogis.findMany();

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalPenalaranLogisPage