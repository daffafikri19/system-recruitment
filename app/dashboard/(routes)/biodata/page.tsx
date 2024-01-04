import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/providers/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataDiriTab } from './tabs/data-diri'
import { PendidikanTab } from './tabs/pendidikan'
import { PengalamanKerjaTab } from './tabs/pengalaman-kerja'
import { ContextWrapper } from './_components/context-wrapper'
import { ProfileBox } from './_components/profile-box'
import { KeluargaTab } from './tabs/keluarga'
import { SertifikatTab } from './tabs/sertifikat'
import { DokumenTab } from './tabs/dokumen-pelengkap'
import { KeterampilanTab } from './tabs/keterampilan'
import { PengalamanOrganisasiTab } from './tabs/pengalaman-organisasi'
import { redirect } from 'next/navigation'


const BiodataPage = async () => {
    const session = await getServerSession(authOptions);
    if (session && session?.user) {
        
        return (
            <div className="w-full h-full">
                <Tabs defaultValue="data-diri" className="w-full md:flex md:items-start md:gap-2">
                    <div className='m-2 border-2 rounded-lg w-full md:max-w-[200px]'>
                       <ProfileBox />
                        <TabsList className='flex flex-col space-y-3 h-full mt-1'>
                            <TabsTrigger className='w-full' value="data-diri">Data Diri</TabsTrigger>
                            <TabsTrigger className='w-full' value="pendidikan">Pendidikan</TabsTrigger>
                            <TabsTrigger className='w-full' value="pengalaman-kerja">Pengalaman Kerja</TabsTrigger>
                            <TabsTrigger className='w-full' value="pengalaman-organisasi">Pengalaman Organisasi</TabsTrigger>
                            <TabsTrigger className='w-full' value="keterampilan">Keterampilan</TabsTrigger>
                            <TabsTrigger className='w-full' value="keluarga">Keluarga</TabsTrigger>
                            <TabsTrigger className='w-full' value="sertifikat">Sertifikat</TabsTrigger>
                            <TabsTrigger className='w-full' value="dokumen-pelengkap">Dokumen Pelengkap</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className='w-full h-full'>
                        <ContextWrapper>
                            <TabsContent value="data-diri">
                                <DataDiriTab username={session.user.name} email={session.user.email} sessionUserId={session.user.id} />
                            </TabsContent>
                            <TabsContent value="pendidikan">
                                <PendidikanTab sessionUserId={session.user.id} username={session.user.name} />
                            </TabsContent>
                            <TabsContent value="pengalaman-kerja">
                                <PengalamanKerjaTab sessionUserId={session.user.id} username={session.user.name}  />
                            </TabsContent>
                            <TabsContent value="pengalaman-organisasi">
                                <PengalamanOrganisasiTab />
                            </TabsContent>
                            <TabsContent value="keterampilan">
                                <KeterampilanTab sessionUserId={session.user.id} username={session.user.name} />
                            </TabsContent>
                            <TabsContent value="keluarga">
                                <KeluargaTab sessionUserId={session.user.id} username={session.user.name} />
                            </TabsContent>
                            <TabsContent value="sertifikat">
                                <SertifikatTab sessionUserId={session.user.id} username={session.user.name} />
                            </TabsContent>
                            <TabsContent value="dokumen-pelengkap">
                                <DokumenTab sessionUserId={session.user.id} username={session.user.name}  />
                            </TabsContent>
                        </ContextWrapper>
                    </div>
                </Tabs>
            </div>
        )
    }

    redirect('/signin')
}

export default BiodataPage;