import React from 'react'
import { authOptions } from '@/lib/providers/auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { DataTable } from './dataTable'

export const metadata: Metadata = {
  title: "E-Recruitment - Hasil Tes Peserta",
}

const HasilTesPesertaPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <DataTable />
    </div>
  )
}

export default HasilTesPesertaPage