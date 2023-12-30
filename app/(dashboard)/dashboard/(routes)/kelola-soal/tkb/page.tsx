import React from 'react'
import prisma from '@/lib/utils/prisma'
import { DataTable } from './dataTable';

const SoalTkbPage = async () => {

  const questionList = await prisma.soalTKB.findMany();

  return (
    <DataTable questionData={questionList} />
  )
}

export default SoalTkbPage