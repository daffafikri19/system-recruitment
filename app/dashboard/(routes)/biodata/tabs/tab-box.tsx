import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileBox } from "../_components/profile-box"
import { DataDiriTab } from "./data-diri";
import { PendidikanTab } from "./pendidikan";
import { PengalamanKerjaTab } from "./pengalaman-kerja";
import { PengalamanOrganisasiTab } from "./pengalaman-organisasi";
import { KeterampilanTab } from "./keterampilan";
import { KeluargaTab } from "./keluarga";
import { SertifikatTab } from "./sertifikat";
import { DokumenTab } from "./dokumen-pelengkap";

interface SessionProps {
    name: string,   
    email: string,
    id: string
}

export const TabBox = ({ name, email, id } : SessionProps) => {

    return (
        <div>
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

                    <TabsContent value="data-diri">
                        <DataDiriTab
                            username={name}
                            email={email}
                            sessionUserId={id} />
                    </TabsContent>
                    <TabsContent value="pendidikan">
                        <PendidikanTab
                            sessionUserId={id}
                            username={name} />
                    </TabsContent>
                    <TabsContent value="pengalaman-kerja">
                        <PengalamanKerjaTab
                            sessionUserId={id}
                            username={name} />
                    </TabsContent>
                    <TabsContent value="pengalaman-organisasi">
                        <PengalamanOrganisasiTab />
                    </TabsContent>
                    <TabsContent value="keterampilan">
                        <KeterampilanTab
                            sessionUserId={id}
                            username={name} />
                    </TabsContent>
                    <TabsContent value="keluarga">
                        <KeluargaTab
                            sessionUserId={id}
                            username={name} />
                    </TabsContent>
                    <TabsContent value="sertifikat">
                        <SertifikatTab
                            sessionUserId={id}
                            username={name} />
                    </TabsContent>
                    <TabsContent value="dokumen-pelengkap">
                        <DokumenTab
                            sessionUserId={id}
                            username={name} />
                    </TabsContent>

                </div>
            </Tabs>
        </div>
    )
}