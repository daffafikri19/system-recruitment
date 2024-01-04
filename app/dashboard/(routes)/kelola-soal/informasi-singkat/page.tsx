import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';

const SoalInformasiSingkatPage = async () => {
    const questionList = await prisma.soalInformasiSingkat.findMany();

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalInformasiSingkatPage