import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { DataTable } from './dataTable'
import prisma from '@/lib/utils/prisma'

const SoalTpaPage = async () => {
    const questionList = await prisma.soalTPA.findMany();
    return (
        <div>
            <DataTable questionData={questionList} />
        </div>
    )
}

export default SoalTpaPage