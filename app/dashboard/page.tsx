import { authOptions } from '@/lib/providers/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import Breadcrumb from './components/Breadcrumbs'
import { CalendarCheck } from 'lucide-react'
import { DashboardStepper } from './components/Stepper/dashboardStepper'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { DetailJadwalStepper } from './components/Stepper/detailJadwalStepper'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'


const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "peserta") {

    return (
      <div>
        <Breadcrumb pageName='Dashboard' />
        <div className='space-y-4'>
          <Card>
            <CardContent className='space-y-6 p-4'>
              <div className='space-y-2'>
                <div>
                  <h1 className='font-bold text-xl'>Staff Komunikasi</h1>
                  <p className='text-muted-foreground font-semibold'>Perum Perhutani</p>
                  <p>Tanggal Melamar : 02-03-2023</p>
                </div>
                <div className='space-x-4 w-full flex items-center'>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>Detail Jadwal <CalendarCheck className='w-4 h-4 ml-2' /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <DetailJadwalStepper />
                      <AlertDialogFooter>
                        <AlertDialogCancel>Tutup</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">Hasil Tes Online</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Hasil Tes</h4>
                        </div>
                        <div className='grid gap-4'>
                          <div className='flex items-center space-x-4'>
                            <Label className='w-1/2'>Nilai Tes Psikotest</Label>
                            <Input className="col-span-2 h-8" readOnly />
                          </div>

                          <div className='flex items-center space-x-4'>
                            <Label className='w-1/2'>Nilai Tes Bahasa Inggris</Label>
                            <Input className="col-span-2 h-8" readOnly />
                          </div>

                          <div className='flex items-center space-x-4'>
                            <Label className='w-1/2'>Nilai Rata - rata</Label>
                            <Input className="col-span-2 h-8" readOnly />
                          </div>
                        </div>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Tutup</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <DashboardStepper />
            </CardContent>
          </Card>
        </div>
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