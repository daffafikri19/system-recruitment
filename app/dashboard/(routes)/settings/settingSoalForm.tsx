"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { settinganSoal } from "@prisma/client"
import { useEffect, useState } from "react"
import { ItemInputSoal } from "./InputSoal"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { addSettings } from "@/actions/mutations/pengaturan/soal/addSettings"
import { useLoadingContext } from "@/lib/providers/loadingStateProvider"
import { toast } from "@/components/ui/use-toast"

interface SettingSoalProps {
    dataSetting: settinganSoal
}

export const SettingSoalForm = ({ dataSetting}: SettingSoalProps) => {

    const router = useRouter();
    const { loading, setLoading } = useLoadingContext();

    const [settingSoal, setSettingSoal] = useState<settinganSoal>({
        id: 0,
        waktu_pengerjaan_verbal: 0,
        waktu_pengerjaan_antonim: 0,
        waktu_pengerjaan_sinonim: 0,
        waktu_pengerjaan_antonim_sinonim: 0,
        waktu_pengerjaan_deret_angka: 0,
        waktu_pengerjaan_hitung_cepat: 0,
        waktu_pengerjaan_informasi_singkat: 0,
        waktu_pengerjaan_kalimat_tak_teratur: 0,
        waktu_pengerjaan_kemampuan_teknikal: 0,
        waktu_pengerjaan_ketelitian: 0,
        waktu_pengerjaan_kuantitatif_analisis: 0,
        waktu_pengerjaan_penalaran_logis: 0,
        waktu_pengerjaan_penalaran_analitik: 0,
        waktu_pengerjaan_kepribadian: 0,
        waktu_pengerjaan_inggris: 0,
        max_soal_verbal: 0,
        max_soal_antonim: 0,
        max_soal_sinonim: 0,
        max_soal_antonim_sinonim: 0,
        max_soal_deret_angka: 0,
        max_soal_hitung_cepat: 0,
        max_soal_informasi_singkat: 0,
        max_soal_kalimat_tak_teratur: 0,
        max_soal_kemampuan_teknikal: 0,
        max_soal_ketelitian: 0,
        max_soal_kuantitatif_analisis: 0,
        max_soal_penalaran_logis: 0,
        max_soal_penalaran_analitik: 0,
        max_soal_kepribadian: 0,
        max_soal_bInggris: 0,
        schedule: "",
        createdAt: ""
    });

   useEffect(() => {
    if(dataSetting) {
        setSettingSoal(dataSetting);
    }
   }, [])

    return (
        <div>
            <form action={async formdata => {
                setLoading(true)
                const result = await addSettings(formdata);
                toast({
                    title: result.message,
                    variant: result.status === 200 ? "default" : "destructive"
                })
                setLoading(false)
            }}>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Pengaturan Waktu Psikotest
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-2">
                        <ItemInputSoal
                            name="waktu_pengerjaan_verbal"
                            label="Analogi Verbal"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_verbal}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_verbal: parseInt(e.target.value)
                                }))
                            }}
                        />
                        <ItemInputSoal
                            name="waktu_pengerjaan_antonim"
                            label="Antonim"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_antonim}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_antonim: parseInt(e.target.value)
                                }))
                            }}
                        />
                        <ItemInputSoal
                            name="waktu_pengerjaan_sinonim"
                            label="Sinonim"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_sinonim}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_sinonim: parseInt(e.target.value)
                                }))
                            }}
                        />
                        <ItemInputSoal
                            name="waktu_pengerjaan_antonim_sinonim"
                            label="Antonim - Sinonim"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_antonim_sinonim}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_antonim_sinonim: parseInt(e.target.value)
                                }))
                            }}
                        />
                        <ItemInputSoal
                            name="waktu_pengerjaan_deret_angka"
                            label="Deret Angka"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_deret_angka}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_deret_angka: parseInt(e.target.value)
                                }))
                            }}
                        />
                        <ItemInputSoal
                            name="waktu_pengerjaan_hitung_cepat"
                            label="Hitung Cepat"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_hitung_cepat}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_hitung_cepat: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="waktu_pengerjaan_informasi_singkat"
                            label="Informasi Singkat"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_informasi_singkat}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_informasi_singkat: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="waktu_pengerjaan_kalimat_tak_teratur"
                            label="Kalimat Tak Teratur"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_kalimat_tak_teratur}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_kalimat_tak_teratur: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="waktu_pengerjaan_kemampuan_teknikal"
                            label="Kemampuan Teknikal"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_kemampuan_teknikal}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_kemampuan_teknikal: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="waktu_pengerjaan_ketelitian"
                            label="Ketelitian"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_ketelitian}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_ketelitian: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="waktu_pengerjaan_kuantitatif_analisis"
                            label="Kuantitatif Analisis"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_kuantitatif_analisis}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_kuantitatif_analisis: parseInt(e.target.value)
                                }))
                            }}
                        />


                        <ItemInputSoal
                            name="waktu_pengerjaan_penalaran_logis"
                            label="Penalaran Logis"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_penalaran_logis}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_penalaran_logis: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="waktu_pengerjaan_penalaran_analitik"
                            label="Penalaran Logis"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_penalaran_analitik}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_penalaran_analitik: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="waktu_pengerjaan_kepribadian"
                            label="Kepribadian"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_kepribadian}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_kepribadian: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="waktu_pengerjaan_inggris"
                            label="Bahasa Inggris"
                            type="number"
                            value={settingSoal.waktu_pengerjaan_inggris}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    waktu_pengerjaan_inggris: parseInt(e.target.value)
                                }))
                            }}
                        />
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader>
                        <CardTitle>
                            Pengaturan Maksimal Soal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-2">
                        <ItemInputSoal
                            name="max_soal_verbal"
                            label="Analogi Verbal"
                            type="number"
                            value={settingSoal.max_soal_verbal}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_verbal: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_antonim"
                            label="Antonim"
                            type="number"
                            value={settingSoal.max_soal_antonim}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_antonim: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_sinonim"
                            label="Sinonim"
                            type="number"
                            value={settingSoal.max_soal_sinonim}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_sinonim: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_antonim_sinonim"
                            label="Antonim Sinonim"
                            type="number"
                            value={settingSoal.max_soal_antonim_sinonim}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_antonim_sinonim: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_deret_angka"
                            label="Deret Angka"
                            type="number"
                            value={settingSoal.max_soal_deret_angka}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_deret_angka: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_hitung_cepat"
                            label="Hitung Cepat"
                            type="number"
                            value={settingSoal.max_soal_hitung_cepat}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_hitung_cepat: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_informasi_singkat"
                            label="Informasi Singkat"
                            type="number"
                            value={settingSoal.max_soal_informasi_singkat}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_informasi_singkat: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_kalimat_tak_teratur"
                            label="Kalimat Tak Teratur"
                            type="number"
                            value={settingSoal.max_soal_kalimat_tak_teratur}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_kalimat_tak_teratur: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_kemampuan_teknikal"
                            label="Kemampuan Teknikal"
                            type="number"
                            value={settingSoal.max_soal_kemampuan_teknikal}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_kemampuan_teknikal: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_ketelitian"
                            label="Ketelitian"
                            type="number"
                            value={settingSoal.max_soal_ketelitian}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_ketelitian: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_kuantitatif_analisis"
                            label="Kuantitatif Analisis"
                            type="number"
                            value={settingSoal.max_soal_kuantitatif_analisis}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_kuantitatif_analisis: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_penalaran_logis"
                            label="Penalaran Logis"
                            type="number"
                            value={settingSoal.max_soal_penalaran_logis}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_penalaran_logis: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_penalaran_analitik"
                            label="Penalaran Analitik"
                            type="number"
                            value={settingSoal.max_soal_penalaran_analitik}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_penalaran_analitik: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_kepribadian"
                            label="Kepribadian"
                            type="number"
                            value={settingSoal.max_soal_kepribadian}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_kepribadian: parseInt(e.target.value)
                                }))
                            }}
                        />

                        <ItemInputSoal
                            name="max_soal_bInggris"
                            label="Bahasa Inggris"
                            type="number"
                            value={settingSoal.max_soal_bInggris}
                            onValueChange={(e) => {
                                setSettingSoal((prev) => ({
                                    ...prev,
                                    max_soal_bInggris: parseInt(e.target.value)
                                }))
                            }}
                        />
                    </CardContent>
                </Card>
                <input type="hidden" name="id" readOnly value={settingSoal.id} />
                <div className="mt-5 flex w-full items-center justify-end space-x-4">
                    <Button variant="destructive" type="button" onClick={() => router.back()}>Batal</Button>
                    <Button type="submit">Simpan</Button>
                </div>
            </form>
        </div>
    )
}