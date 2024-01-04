import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';

const SoalHiitungCepatPage = async () => {
    const questionList = await prisma.soalhitungCepat.findMany();

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalHiitungCepatPage