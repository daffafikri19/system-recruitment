"use server"

import prisma from "@/lib/utils/prisma"
import { revalidatePath } from "next/cache";

export const UploadKtp = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            ktp: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload KTP",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                ktp: file
            }
        });

        revalidatePath('/dashboard/biodata');

        return {
            message: 'Berhasil upload ktp',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload KTP',
            status: 500
        }
    }
}

export const UploadCV = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            cv: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload CV",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                cv: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload CV',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload CV',
            status: 500
        }
    }
}

export const UploadNPWP = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            npwp: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload NPWP",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                npwp: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload NPWP',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload NPWP',
            status: 500
        }
    }
}

export const UploadSIM = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            sim: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload SIM",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                sim: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload SIM',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload SIM',
            status: 500
        }
    }
}

export const UploadIjazah = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            ijazah: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload ijazah",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                ijazah: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload ijazah',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload ijazah',
            status: 500
        }
    }
}

export const UploadTranskripNilai = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            transkrip_nilai: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload Transkrip Nilai",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                transkrip_nilai: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload Transkrip Nilai',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload Transkrip Nilai',
            status: 500
        }
    }
}

export const UploadKK = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            kartu_keluarga: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload KK",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                kartu_keluarga: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload KK',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload KK',
            status: 500
        }
    }
}

export const UploadSKCK = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            skck: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload SKCK",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                skck: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload SKCK',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload SKCK',
            status: 500
        }
    }
}

export const UploadKartuKuning = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            kartu_kuning: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload Kartu Kuning",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                kartu_kuning: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload Kartu Kuning',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload Kartu Kuning',
            status: 500
        }
    }
}

export const UploadSPK = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            surat_pengalaman_kerja: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload SPK",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                surat_pengalaman_kerja: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload SPK',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload SPK',
            status: 500
        }
    }
}

export const UploadAktaKelahiran = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            akta_kelahiran: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload Akta Kelahiran",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                akta_kelahiran: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload Akta Kelahiran',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload Akta Kelahiran',
            status: 500
        }
    }
}

export const UploadPasFoto = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            pas_foto: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload Pas Foto",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                pas_foto: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload Pas Foto',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload Pas Foto',
            status: 500
        }
    }
}

export const UploadSK = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            sertifikat_keahlian: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload SK",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                sertifikat_keahlian: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload SK',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload SK',
            status: 500
        }
    }
}

export const UploadSB = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            sertifikat_bahasa: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload SB",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                sertifikat_bahasa: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload SB',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload SB',
            status: 500
        }
    }
}

export const UploadBukuNikah = async (file: any, username: string) => {

    const existingData = await prisma.dokumenUser.findFirst({
        where: {
            biodata: {
                some: {
                    nama_lengkap: username
                }
            }
        }
    });

    const duplicateCheck = await prisma.dokumenUser.findUnique({
        where: {
            buku_nikah: file
        }
    });

    if(duplicateCheck) {
        return {
            message: "Anda sudah upload Buku Nikah",
            status: 400
        }
    }

    const existingBiodata = await prisma.biodataUser.findUnique({
        where: {
            nama_lengkap: username
        }
    });

    if(!existingBiodata) {
        return {
            message: "Harap lengkapi biodata sebelum upload berkas",
            status: 400
        }
    }

    if(!existingData) {
        await prisma.dokumenUser.create({
            data: {
                user_id: existingBiodata.id_user,
                createdAt: new Date(Date.now()).toLocaleString(),
                updatedAt: new Date(Date.now()).toLocaleString(),
                biodata: {
                    connect: {
                        id_user: existingBiodata.id_user!
                    }
                }
            }
        });
    }

    try {
        await prisma.dokumenUser.update({
            where: {
                user_id: existingBiodata.id_user!
            },
            data: {
                buku_nikah: file
            }
        });

        revalidatePath('/dashboard/biodata');
        
        return {
            message: 'Berhasil upload Buku Nikah',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Terjadi kesalahan server saat upload Buku Nikah',
            status: 500
        }
    }
}