import { authOptions } from '@/lib/providers/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import Breadcrumb from './components/Breadcrumbs'
import { Stepper, StepperFooter, StepperItem, useStepper } from '@/components/ui/stepper'
import { CheckCircle, Contact2, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { StepperComponent } from './components/Stepper'


const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "peserta") {

    return (
      <div>
        <StepperComponent />
      </div>
    )
  } else if (session?.user.role === "admin") {
    return (
      <div>
        dashboard admin
      </div>
    )
  } else if (session?.user.role === "manager") {
    return (
      <div>
        dashboard manager
      </div>
    )
  } else if (session?.user.role === "hrd") {
    return (
      <div>
        dashboard HRD
      </div>
    )
  } else if (session?.user.role === "superadmin") {
    return (
      <div>
        dashboard superadmin (untuk TIS)
        <Breadcrumb pageName='Dashboard' />
      </div>
    )
  }


}

export default DashboardPage