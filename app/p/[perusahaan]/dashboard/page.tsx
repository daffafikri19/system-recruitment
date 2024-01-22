import { authOptions } from '@/lib/providers/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Breadcrumb from './components/Breadcrumbs'
const DashboardPage = async () => {

  return (
    <div>
      <Breadcrumb pageName='Dashboard' />
    </div>
  )
}

export default DashboardPage