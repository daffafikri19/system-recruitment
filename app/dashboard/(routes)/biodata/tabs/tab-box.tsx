import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileBox } from "../profile-box"
import { DataDiriTab } from "./data-diri";
import { PendidikanTab } from "./pendidikan";
import { PengalamanKerjaTab } from "./pengalaman-kerja";
import { PengalamanOrganisasiTab } from "./pengalaman-organisasi";
import { KeterampilanTab } from "./keterampilan";
import { KeluargaTab } from "./keluarga";
import { SertifikatTab } from "./sertifikat";
import { DokumenTab } from "./dokumen-pelengkap";

interface TabProps {
    name: string,
    email: string,
    id: string
}

interface ComponentProps {
    children: React.ReactNode
}

export const DataDiri = ({ children }: ComponentProps) => {
    return (
        <>
            {children}
        </>
    )
}

export const Pendidikan = ({ children }: ComponentProps) => {
    return (
        <>
            {children}
        </>
    )
}

export const PengalamanKerja = ({ children }: ComponentProps) => {
    return (
        <>
            {children}
        </>
    )
}

export const PengalamanOrganisasi = ({ children }: ComponentProps) => {
    return (
        <>
            {children}
        </>
    )
}

export const Keterampilan = ({ children }: ComponentProps) => {
    return (
        <>
            {children}
        </>
    )
}

export const Keluarga = ({ children }: ComponentProps) => {
    return (
        <>
            {children}
        </>
    )
}

export const Sertifikat = ({ children }: ComponentProps) => {
    return (
        <>
            {children}
        </>
    )
}

export const DokumenPelengkap = ({ children }: ComponentProps) => {
    return (
        <>
            {children}
        </>
    )
}

export const TabBox = ({ name, email, id }: TabProps) => {
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
                        <DataDiri>
                            <DataDiriTab
                                sessionUserId={id}
                                username={name}
                                email={email}
                            />
                        </DataDiri>
                    </TabsContent>
                    <TabsContent value="pendidikan">
                        <Pendidikan>
                            <PendidikanTab
                                sessionUserId={id}
                                username={name} />
                        </Pendidikan>
                    </TabsContent>
                    <TabsContent value="pengalaman-kerja">
                        <PengalamanKerja>
                            <PengalamanKerjaTab
                                sessionUserId={id}
                                username={name} />
                        </PengalamanKerja>
                    </TabsContent>
                    <TabsContent value="pengalaman-organisasi">
                        <PengalamanOrganisasi>
                            <PengalamanOrganisasiTab />
                        </PengalamanOrganisasi>
                    </TabsContent>
                    <TabsContent value="keterampilan">
                        <Keterampilan>
                            <KeterampilanTab
                                sessionUserId={id}
                                username={name} />
                        </Keterampilan>
                    </TabsContent>
                    <TabsContent value="keluarga">
                        <Keluarga>
                            <KeluargaTab
                                sessionUserId={id}
                                username={name} />
                        </Keluarga>
                    </TabsContent>
                    <TabsContent value="sertifikat">
                        <Sertifikat>
                            <SertifikatTab
                                sessionUserId={id}
                                username={name} />
                        </Sertifikat>
                    </TabsContent>
                    <TabsContent value="dokumen-pelengkap">
                        <DokumenPelengkap>
                            <DokumenTab
                                sessionUserId={id}
                                username={name} />
                        </DokumenPelengkap>
                    </TabsContent>

                </div>
            </Tabs>
        </div>
    )
}