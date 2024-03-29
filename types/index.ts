export interface CategoryType {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface biodataProps {
    id: string,
    id_user: string,
    nama_lengkap: string,
    jenis_kelamin: string,
    agama: string,
    tanggal_lahir: string,
    negara_lahir: string,
    provinsi_lahir: string,
    kota_lahir: string,
    kewarganegaraan: string,
    negara_asal: string,
    nik: string,
    no_paspor: string,
    buta_warna: string,
    kebutuhan_khusus: string,
    negara: string,
    provinsi: string,
    kota: string,
    kecamatan: string,
    alamat: string,
    kode_pos: string,
    no_telp_rumah: string,
    email: string,
    status_pernikahan: string,
    no_wa?: string,
    no_ponsel?: string
}

export interface sessionProps {
    name: string,
    email: string,
    image: string | null,
    id: string,
    role?: string,
    profession?: string,
    foto_profile?: string,
    isNewUser?: string
}

export interface PendidikanUserProps {
    id: string,
    luar_negeri: string,
    tipe_pendidikan: string,
    pendidikan_terakhir: string,
    provinsi: string,
    kota: string,
    nama_institusi: string,
    nama_jurusan: string,
    no_ijazah: string,
    tgl_terbit: string,
    tahun_masuk: string,
    tahun_lulus: string,
    ipk: string,
    createdAt: string,
    updatedAt: string,
    biodata: []
}

export interface PengalamanKerjaProps {
    id: string,
    nama_perusahaan: string,
    posisi: string,
    gaji: string,
    awal_masuk: string,
    keluar: string,
    uraian_pekerjaan: string,
    alasan_pindah: string,
    createdAt: string,
    updatedAt: string
}

export interface DataKeluargaProps {
    id: string,
    nama_lengkap: string,
    hubungan: string,
    jenis_kelamin: string,
    tempat_lahir: string,
    tanggal_lahir: string,
    no_kk: string,
    no_nik: string,
    pekerjaan: string,
    pendidikan: string,
    createdAt: string,
    updatedAt: string
}

export interface SerfitikatUserProps {
    id: string,
    jenis_sertifikat: string,
    nama_sertifikat: string,
    nama_org: string,
    no_sertifikat: string,
    negara_terbit: string,
    tanggal_terbit: string,
    tanggal_exp: string,
    createdAt: string,
    updatedAt: string
}

export interface PengalamanOrganisasiProps {
    id: string,
    nama_organisasi: string,
    jabatan: string,
    tahun_masuk: string,
    tahun_keluar: string,
    detail: string,
    createdAt: string,
    updatedAt: string
}

export interface DokumenProps {
    id: string,
    no_urut: string,
    nama_dokumen: string,
    status_dokumen: string,
    file: string,
    createdAt: string,
    updatedAt: string
}

export interface ScoreTotalPsikotestProps {
    id: string,
    id_user: string,
    average: number,
    user: {
        id: string
        name: string,
        email: string,
        role: string,
        foto_profile: string,
        no_pendaftaran: string | undefined
    },
    scoreVerbal: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scoreAntonim: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scoreSinonim: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scoreAntonimSinonim: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scoreDeretAngka: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scoreHitungCepat: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scoreInformasiSingkat: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scoreKalimatTakTeratur: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scoreKemampuanTeknikal: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scoreKetelitian: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scoreKuantitatifAnalisis: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scorePenalaranLogis: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number
    },
    scorePenalaranAnalitik: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number 
    },
    scoreKepribadian: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number 
    },
    scoreInggris: {
        id: number
        benar: number
        salah: number
        score: number
        kosong: number | undefined
        maxScore: number 
    },
    scoreTotal: number
}