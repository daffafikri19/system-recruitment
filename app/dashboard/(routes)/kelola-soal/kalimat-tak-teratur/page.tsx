import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';

const SoalKalimatTakTeraturPage = async () => {
    const questionList = await prisma.soalKalimatTakTeratur.findMany();

    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalKalimatTakTeraturPage