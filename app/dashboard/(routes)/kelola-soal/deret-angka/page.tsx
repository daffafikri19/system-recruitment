import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';

const SoalDeretAngkaPage = async () => {
    const questionList = await prisma.soalDeret.findMany();

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalDeretAngkaPage