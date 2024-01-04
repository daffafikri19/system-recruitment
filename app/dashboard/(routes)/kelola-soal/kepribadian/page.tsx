import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';

const SoalKepribadianPage = async () => {
    const questionList = await prisma.soalKepribadian.findMany();

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKepribadianPage