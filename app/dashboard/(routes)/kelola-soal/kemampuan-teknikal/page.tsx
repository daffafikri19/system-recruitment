import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';

const SoalKemampuanTeknikalPage = async () => {
    const questionList = await prisma.soalKemampuanTeknikal.findMany();

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKemampuanTeknikalPage