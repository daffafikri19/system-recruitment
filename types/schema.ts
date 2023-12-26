import * as z from "zod";

export const PendidikanSchema = z.object({
  luar_negeri: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  tipe_pendidikan: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  pendidikan_terakhir: z.string().min(1, {
    message: 'minimal 3 karakter',
  }),
  provinsi: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  kota: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  nama_institusi: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  nama_jurusan: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  no_ijazah: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  tgl_terbit: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  tahun_masuk: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  tahun_lulus: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  ipk: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  username: z.string().min(3, {
    message: 'minimal 3 karakter',
  }).optional(),
});

export const KeluargaSchema = z.object({
  hubungan: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  nama_lengkap: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  jenis_kelamin: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  tanggal_lahir: z.string().min(3, {
    message: 'tidak valid',
  }),
  tempat_lahir: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  no_kk: z.string().min(16, {
    message: 'No KK tidak valid, (16 digit)',
  }).max(16, {
    message: 'No KK tidak valid, (16 digit)',
  }),
  no_nik: z.string().min(16, {
    message: 'No NIK tidak valid, (16 digit)',
  }).max(16, {
    message: 'No NIK tidak valid, (16 digit)',
  }),
  pekerjaan: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  pendidikan: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  username: z.string().min(3, {
    message: 'minimal 3 karakter',
  }).optional(),
});


export const PengalamanKerjaSchema = z.object({
  nama_perusahaan: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  posisi: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  gaji: z.string().min(3, {
    message: 'minimal 3 karakter',
  }),
  awal_masuk: z.string().min(4, {
    message: 'tahun tidak valid (4 digit)',
  }).max(4, {
    message: 'tahun tidak valid (4 digit)',
  }),
  keluar: z.string().min(4, {
    message: 'tahun tidak valid (4 digit)',
  }).max(4, {
    message: 'tahun tidak valid (4 digit)',
  }),
  uraian_pekerjaan: z.string().min(3, {
    message: 'Harap uraikan pekerjaan yang valid',
  }),
  alasan_pindah: z.string().min(5, {
    message: 'Harap berikan alasan yang valid',
  }),
  username: z.string().min(3, {
    message: 'minimal 3 karakter',
  }).optional(),
});

export const SertifikatSchema = z.object({
  nama_sertifikat: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  jenis_sertifikat: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  nama_org: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  no_serfifikat: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  negara_terbit: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  tanggal_terbit: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  tanggal_exp: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  username: z.string().min(3, {
    message: 'minimal 3 karakter',
  }).optional(),
});


export const KeterampilanSchema = z.object({
  tipe_keterampilan: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  nama_keterampilan: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  keterangan: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  username: z.string().min(3).optional()
});

export const DokumenSchema = z.object({
  no_urut: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  nama_dokumen: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  status_dokumen: z.string().min(3, {
    message: 'minimal 3 karakter'
  }).optional().nullable(),
  file: z.string().min(1, {
    message: 'harap upload dokumen'
  }),
  username: z.string().min(3).optional()
})


export const PengalamanOrganisasiSchema = z.object({
  nama_organisasi: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  jabatan: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  tahun_masuk: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  alasan: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  username: z.string().min(3, {
    message: 'minimal 3 karakter'
  }).optional()
});

export const TpaQuestionSchema = z.object({
  soal: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  a: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  b: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  c: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  d: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  kunci_jawaban: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  gambar: z.string().min(1, {
    message: 'harap tentukan gambar'
  }).optional().nullable(),
  isAktif: z.string().min(3, {
    message: 'minimal 3 karakter'
  })
});

export const TkbQuestionSchema = z.object({
  soal: z.string().min(3, {
    message: 'minimal 3 karakter'
  }),
  a: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  b: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  c: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  point_a: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  point_b: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  point_c: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  kunci_jawaban: z.string().min(1, {
    message: 'minimal 1 karakter'
  }),
  gambar: z.string().min(1, {
    message: 'minimal 1 karakter'
  }).optional().nullable(),
  isAktif: z.string().min(3, {
    message: 'minimal 3 karakter'
  })
})