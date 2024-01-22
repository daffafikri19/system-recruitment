import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { DataTable } from './dataTable'
import { AddForm } from './addForm'
import prisma from '@/lib/utils/prisma'
import Breadcrumb from '../../../components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "E-Recruitment - Daftar Admin",
};

const DaftarAdminPage = async () => {

    const dataUser = await prisma.user.findMany({
        where: {
            role: {
                not: 'peserta'
            }
        }
    });

    if(!dataUser) {
        return (
            <div>
                loading...
            </div>
        )
    }

    return (
        <div className='w-full h-full'>
            <Breadcrumb pageName='Daftar Admin' />
            <div className='my-5'>
                <AddForm />
            </div>
            <Card>
                <CardContent className='p-0'>
                    <DataTable listData={dataUser} />
                </CardContent>
            </Card>
        </div>
    )
}

export default DaftarAdminPage