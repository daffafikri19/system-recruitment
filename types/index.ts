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
    role: string,
    profession: string,
    foto_profile: string,
    isNewUser: string
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

export interface KeterampilanProps {
    id: string,
    nama_keterampilan: string,
    tipe_keterampilan: string,
    keterangan: string,
    createdAt: string,
    updatedAt: string
}

export interface SoalTPAProps {
    id: number;
    soal: string;
    a: string;
    b: string;
    c: string;
    d: string;
    kunci_jawaban: string;
    gambar: string | null;
    isAktif: string;
    createdAt: string;
    updatedAt: string;
}

export interface SoalTKBProps {
    id: number,
    soal: string,
    a: string,
    b: string,
    c: string,
    point_a: string | any,
    point_b: string | any,
    point_c: string | any,
    kunci_jawaban: string,
    isAktif: string,
    gambar: string | null,
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