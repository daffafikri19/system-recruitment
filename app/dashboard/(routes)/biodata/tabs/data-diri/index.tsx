"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { biodataProps } from '@/types';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { Edit2Icon } from 'lucide-react';
import { useCountries, useProvinces, useCities, useDistrict } from '@/hooks/useDataLocation';
import { DatePicker } from '@/app/dashboard/components/DatePicker';

interface dataDiriTabProps {
    sessionUserId: string,
    username: string,
    email: string
}

export const DataDiriTab = ({ sessionUserId, username, email }: dataDiriTabProps) => {
    const [biodata, setBiodata] = useState<biodataProps>({
        id: "",
        id_user: "",
        nama_lengkap: username,
        jenis_kelamin: "",
        agama: "",
        tanggal_lahir: "",
        negara_lahir: "INDONESIA",
        provinsi_lahir: "",
        kota_lahir: "",
        kewarganegaraan: "",
        negara_asal: "",
        nik: "",
        no_paspor: "",
        buta_warna: "",
        kebutuhan_khusus: "",
        negara: "",
        provinsi: "",
        kota: "",
        kecamatan: "",
        alamat: "",
        kode_pos: "",
        no_telp_rumah: "",
        email: email,
        status_pernikahan: "",
        no_ponsel: "",
        no_wa: ""
    });
    const [isSameNumber, setIsSameNumber] = useState(false);
    const { countries, getListCountry } = useCountries();
    const { provinces, getProvincesList } = useProvinces();
    const { cities, getCitiesList } = useCities();
    const { districts, getDistrictsList } = useDistrict();

    // validation
    const [isInvalidNik, setIsInvalidNik] = useState(false);
    const [modeEdit, setModeEdit] = useState(true);

    const getCurrentUser =  useCallback(async () => {
        try {
            const user = await axios.post('/api/biodata/get', {
                username: username
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            setBiodata(user.data)
            return user.data
        } catch (error: any) {
            toast({
                title: error.message,
                variant: 'destructive'
            })
        }
    }, [username])

    useEffect(() => {
        getCurrentUser();

        getListCountry();
        getProvincesList();

        if (biodata.no_ponsel === biodata.no_wa) {
            setIsSameNumber(!isSameNumber)
        };
    }, [getCurrentUser, getListCountry, getProvincesList, biodata.no_ponsel, biodata.no_wa, isSameNumber]);

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBiodata((prev) => ({
            ...prev,
            no_ponsel: value
        }));

        if (isSameNumber) {
            setBiodata((prev) => ({
                ...prev,
                no_wa: value
            }))
        }
    };
    const handleCheckboxChange = () => {
        setIsSameNumber((prev) => !prev);

        if (!isSameNumber) {
            setBiodata((prev) => ({
                ...prev,
                no_wa: biodata.no_wa
            }))
        }
    };

    const handleSubmitBiodata = async () => {

        if (biodata.nik.length < 16) {
            setIsInvalidNik(true);
            return
        } else {
            try {
                const response = await axios.post('/api/biodata/upsert', {
                    id_user: sessionUserId,
                    nama_lengkap: biodata.nama_lengkap,
                    jenis_kelamin: biodata.jenis_kelamin,
                    agama: biodata.agama,
                    tanggal_lahir: biodata.tanggal_lahir,
                    negara_lahir: biodata.negara_lahir,
                    provinsi_lahir: biodata.provinsi_lahir,
                    kota_lahir: biodata.kota_lahir,
                    kewarganegaraan: biodata.kewarganegaraan,
                    negara_asal: biodata.negara_asal,
                    nik: biodata.nik,
                    no_paspor: biodata.no_paspor,
                    buta_warna: biodata.buta_warna,
                    kebutuhan_khusus: biodata.kebutuhan_khusus,
                    negara: biodata.negara,
                    provinsi: biodata.provinsi,
                    kota: biodata.kota,
                    kecamatan: biodata.kecamatan,
                    alamat: biodata.alamat,
                    kode_pos: biodata.kode_pos,
                    no_telp_rumah: biodata.no_telp_rumah,
                    email: biodata.email,
                    status_pernikahan: biodata.status_pernikahan,
                    no_ponsel: biodata.no_ponsel,
                    no_wa: biodata.no_wa,
                }, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
                setModeEdit(!modeEdit);
                return response.data
            } catch (error: any) {
                if (error) {
                    toast({
                        title: error.response.data.message,
                        description: error.message,
                        variant: 'destructive'
                    });
                    setModeEdit(!modeEdit);
                }
            }
        }
    }

    const handleSelectedDate = (date: any) => {
        console.log("selected date", date)
        setBiodata((prev) => ({
            ...prev,
            tanggal_lahir: date
        }))
    }

    return (
        <div className='dark:bg-boxdark'>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmitBiodata();
            }} className='flex flex-col space-y-4'>
                <Card className='w-full'>
                    <CardContent className='p-4'>
                        <CardHeader className='flex flex-row w-full items-center justify-between'>
                            <CardTitle>Biodata Diri</CardTitle>
                            {modeEdit ? (
                                <Button type='button' onClick={() => setModeEdit(!modeEdit)} className='text-white'>Edit <Edit2Icon className='w-4 h-4 ml-2' /></Button>
                            ) : (
                                <></>
                            )}
                        </CardHeader>
                        <div className='my-5 w-full'>
                            <div>
                                <Label>Nama Lengkap</Label>
                                <Input required type='text' name='nama_lengkap'
                                    value={biodata.nama_lengkap} onChange={(e) => {
                                        setBiodata((prev) => ({
                                            ...prev,
                                            nama_lengkap: e.target.value
                                        }))
                                    }}
                                    disabled={modeEdit}
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-3 sm:space-x-4 my-5'>
                            <div>
                                <Label>Jenis Kelamin</Label>
                                <Select required name='jenis_kelamin'
                                    defaultValue={biodata.jenis_kelamin}
                                    value={biodata.jenis_kelamin}
                                    onValueChange={(e) => {
                                        setBiodata((prev) => ({
                                            ...prev,
                                            jenis_kelamin: e
                                        }))
                                    }}
                                    disabled={modeEdit}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Agama</Label>
                                <Select required name='agama'
                                    value={biodata.agama}
                                    onValueChange={(e) => {
                                        setBiodata((prev) => ({
                                            ...prev,
                                            agama: e
                                        }))
                                    }}
                                    disabled={modeEdit}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Islam">Islam</SelectItem>
                                        <SelectItem value="Kristen Protestan">Kristen Protestan</SelectItem>
                                        <SelectItem value="Kristen Katolik">Kristen Katolik</SelectItem>
                                        <SelectItem value="Hindu">Hindu</SelectItem>
                                        <SelectItem value="Buddha">Buddha</SelectItem>
                                        <SelectItem value="Konghucu">Konghucu</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Tanggal Lahir</Label>
                                <DatePicker disabled={modeEdit} selectedDate={handleSelectedDate} />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-3 sm:space-x-4 my-5'>
                            <div>
                                <Label>Negara Kelahiran</Label>
                                <Select required name='negara_lahir'
                                    value={biodata.negara_lahir.toUpperCase()}

                                    onValueChange={(e) => {
                                        setBiodata((prev) => ({
                                            ...prev,
                                            negara_lahir: e.toUpperCase(),
                                        }));
                                    }}
                                    disabled={modeEdit}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country: any) => (
                                            <SelectItem key={country.name.common.toUpperCase()} value={country.name.common.toUpperCase()}>{country.name.common.toUpperCase()}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {biodata.negara_lahir === 'INDONESIA' ? (
                                <>
                                    <div>
                                        <Label>Provinsi Kelahiran</Label>
                                        <Select required name='provinsi_lahir'
                                            value={biodata.provinsi_lahir}
                                            onValueChange={(e) => {
                                                const selectedProvince: any = provinces.find((province: any) => province.name === e);
                                                const selectedProvinceId = selectedProvince ? selectedProvince.id : 36;
                                                getCitiesList(selectedProvinceId)
                                                setBiodata((prev) => ({
                                                    ...prev,
                                                    provinsi_lahir: e,
                                                }));
                                            }}
                                            disabled={modeEdit}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {provinces.map((province: any, index: number) => (
                                                    <SelectItem key={index} value={province.name} onClick={() => {
                                                    }}>{province.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Kabupaten / Kota Kelahiran</Label>
                                        <Select required name='kota_lahir'
                                            value={biodata.kota_lahir}
                                            onValueChange={(e) => {
                                                setBiodata((prev) => ({
                                                    ...prev,
                                                    kota_lahir: e
                                                }))
                                            }}
                                            disabled={modeEdit}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cities.map((city: any, index: number) => (
                                                    <SelectItem key={index} value={city.name}>{city.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <Label>Provinsi Kelahiran</Label>
                                        <Input required type='text' name='provinsi_lahir'
                                            value={biodata.provinsi_lahir}
                                            onChange={(e) => {
                                                setBiodata((prev) => ({
                                                    ...prev,
                                                    provinsi_lahir: e.target.value
                                                }))
                                            }} disabled />
                                    </div>

                                    <div>
                                        <Label>Kabupaten / Kota Kelahiran</Label>
                                        <Input required type='text' name='kota_lahir'
                                            value={biodata.kota_lahir} onChange={(e) => {
                                                setBiodata((prev) => ({
                                                    ...prev,
                                                    kota_lahir: e.target.value
                                                }))
                                            }} disabled />
                                    </div>
                                </>
                            )}


                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-3 sm:space-x-4 my-5'>
                            <div>
                                <Label>Kewarganegaraan</Label>
                                <Select required name='kewarganegaraan'
                                    value={biodata.kewarganegaraan.toUpperCase()}
                                    onValueChange={(e) => {
                                        setBiodata((prev) => ({
                                            ...prev,
                                            kewarganegaraan: e.toUpperCase()
                                        }))
                                    }} disabled={modeEdit}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country: any) => (
                                            <SelectItem key={country.name.common.toUpperCase()} value={country.name.common.toUpperCase()}>{country.name.common.toUpperCase()}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Negara Asal</Label>
                                <Select required name='negara_lahir'
                                    value={biodata.negara_asal.toUpperCase()}
                                    onValueChange={(e) => {
                                        setBiodata((prev) => ({
                                            ...prev,
                                            negara_asal: e.toUpperCase()
                                        }))
                                    }} disabled={modeEdit}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country: any) => (
                                            <SelectItem key={country.name.common.toUpperCase()} value={country.name.common.toUpperCase()}>{country.name.common.toUpperCase()}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Nomor Induk Kependudukan</Label>
                                <Input required type='number' name='nik'
                                    value={biodata.nik} onChange={(e) => {
                                        setBiodata((prev) => ({
                                            ...prev,
                                            nik: e.target.value
                                        }));
                                    }} disabled={modeEdit} />
                                {isInvalidNik && (
                                    <p className='text-red-500 text-xs'>NIK tidak valid (min 16 digit)</p>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-3 sm:space-x-4 my-5'>
                            <div>
                                <Label>Status Pernikahan</Label>
                                <Select required name='status_pernikahan'
                                    value={biodata.status_pernikahan}
                                    onValueChange={(e) => {
                                        setBiodata((prev) => ({
                                            ...prev,
                                            status_pernikahan: e
                                        }))
                                    }} disabled={modeEdit}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sudah Menikah">Sudah Menikah</SelectItem>
                                        <SelectItem value="Belum Menikah">Belum Menikah</SelectItem>
                                        <SelectItem value="Cerai">Cerai</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                <Card className='w-full'>
                    <CardContent className='p-4'>
                        <CardHeader>
                            <CardTitle className='text-center sm:text-left'>Status Disabilitas</CardTitle>
                        </CardHeader>
                        <div className='grid grid-cols-1 sm:grid-cols-2 sm:space-x-4 my-5'>
                            <div>
                                <Label>Apakah anda buta warna ?</Label>
                                <Select required name='buta_warna' value={biodata.buta_warna} onValueChange={(e) => {
                                    setBiodata((prev) => ({
                                        ...prev,
                                        buta_warna: e
                                    }))
                                }} disabled={modeEdit}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Ya">Ya</SelectItem>
                                        <SelectItem value="Tidak">Tidak</SelectItem>
                                        <SelectItem value="Parsial">Parsial</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                            <div>
                                <Label>Apakah Anda berkebutuhan khusus ?</Label>
                                <Select required name='kebutuhan_khusus' value={biodata.kebutuhan_khusus} onValueChange={(e) => {
                                    setBiodata((prev) => ({
                                        ...prev,
                                        kebutuhan_khusus: e
                                    }))
                                }} disabled={modeEdit}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Ya">Ya</SelectItem>
                                        <SelectItem value="Tidak">Tidak</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className='w-full'>
                    <CardContent className='p-4'>
                        <CardHeader>
                            <CardTitle>Data Alamat</CardTitle>
                        </CardHeader>
                        <div className='w-full'>
                            <Label>Negara</Label>
                            <Select required name='negara'
                                value={biodata.negara.toUpperCase()}
                                onValueChange={(e) => {
                                    setBiodata((prev) => ({
                                        ...prev,
                                        negara: e.toUpperCase()
                                    }))
                                }} disabled={modeEdit}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    {countries.map((country: any) => (
                                        <SelectItem key={country.name.common.toUpperCase()} value={country.name.common.toUpperCase()}>{country.name.common.toUpperCase()}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            {biodata.negara === 'INDONESIA' ? (
                                <div className='grid grid-cols-1 sm:grid-cols-3 sm:space-x-4 my-5'>
                                    <div>
                                        <Label>Provinsi</Label>
                                        <Select required name='provinsi'
                                            value={biodata.provinsi}
                                            onValueChange={(e) => {
                                                const selectedProvince: any = provinces.find((province: any) => province.name === e);
                                                const selectedProvinceId = selectedProvince ? selectedProvince.id : 36;
                                                getCitiesList(selectedProvinceId)
                                                setBiodata((prev) => ({
                                                    ...prev,
                                                    provinsi: e,
                                                }));
                                            }}
                                            disabled={modeEdit}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {provinces.map((province: any, index: number) => (
                                                    <SelectItem key={index} value={province.name} onClick={() => {
                                                    }}>{province.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Kabupaten / Kota</Label>
                                        <Select required name='kota'
                                            value={biodata.kota}
                                            onValueChange={(e) => {
                                                const selectedCity: any = cities.find((city: any) => city.name === e);
                                                const selectedCityId = selectedCity ? selectedCity.id : 3672;
                                                console.log(selectedCity)
                                                getDistrictsList(selectedCityId)
                                                setBiodata((prev) => ({
                                                    ...prev,
                                                    kota: e,
                                                }));
                                            }}
                                            disabled={modeEdit}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cities.map((city: any, index: number) => (
                                                    <SelectItem key={index} value={city.name}>{city.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Kecamatan</Label>
                                        <Select required name='kecamatan'
                                            value={biodata.kecamatan.toUpperCase()}
                                            onValueChange={(e) => {
                                                setBiodata((prev) => ({
                                                    ...prev,
                                                    kecamatan: e.toUpperCase()
                                                }))
                                            }}
                                            disabled={modeEdit}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {districts.map((city: any, index: number) => (
                                                    <SelectItem key={index} value={city.name.toUpperCase()}>{city.name.toUpperCase()}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>
                            ) : (
                                <div className='grid grid-cols-1 sm:grid-cols-3 sm:space-x-4 my-5'>
                                    <div>
                                        <Label>Provinsi</Label>
                                        <Input required type='text' name='provinsi'
                                            value={biodata.provinsi} onChange={(e) => {
                                                setBiodata((prev) => ({
                                                    ...prev,
                                                    provinsi: e.target.value
                                                }))
                                            }} disabled={modeEdit} />
                                    </div>
                                    <div>
                                        <Label>Kabupaten / Kota</Label>
                                        <Input required type='text' name='kota'
                                            value={biodata.kota} onChange={(e) => {
                                                setBiodata((prev) => ({
                                                    ...prev,
                                                    kota: e.target.value
                                                }))
                                            }} disabled={modeEdit} />
                                    </div>

                                    <div>
                                        <Label>Kecamatan</Label>
                                        <Input required type='text' name='kecamatan'
                                            value={biodata.kecamatan} onChange={(e) => {
                                                setBiodata((prev) => ({
                                                    ...prev,
                                                    kecamatan: e.target.value
                                                }))
                                            }} disabled={modeEdit} />
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className='w-full'>
                            <Label>Alamat</Label>
                            <Textarea required name='alamat'
                                value={biodata.alamat}
                                onChange={(e) => {
                                    setBiodata((prev) => ({
                                        ...prev,
                                        alamat: e.target.value
                                    }))
                                }} disabled={modeEdit} />
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 sm:space-x-4 my-5'>
                            <div>
                                <Label>Kode Pos</Label>
                                <Input required type='number' name='kode_pos'
                                    value={biodata.kode_pos}
                                    onChange={(e) => {
                                        setBiodata((prev) => ({
                                            ...prev,
                                            kode_pos: e.target.value
                                        }))
                                    }} disabled={modeEdit} />
                            </div>
                            <div>
                                <Label>No Telepon Rumah (tidak wajib)</Label>
                                <Input type='tel' name='no_telp_rumah'
                                    value={biodata.no_telp_rumah}
                                    onChange={(e) => {
                                        setBiodata((prev) => ({
                                            ...prev,
                                            no_telp_rumah: e.target.value
                                        }))
                                    }} disabled={modeEdit} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className='w-full'>
                    <CardContent className='p-4'>
                        <CardHeader>
                            <CardTitle>Data Kontak</CardTitle>
                        </CardHeader>
                        <div className='w-full'>
                            <Label>Email</Label>
                            <Input required type='email' name='email'
                                value={biodata.email}
                                onChange={(e) => {
                                    setBiodata((prev) => ({
                                        ...prev,
                                        email: e.target.value
                                    }))
                                }} disabled={modeEdit} />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 sm:space-x-4 my-5'>
                            <div>
                                <Label>Nomor Ponsel</Label>
                                <Input required type='tel' name='no_ponsel'
                                    value={biodata.no_ponsel} onChange={handlePhoneChange} disabled={modeEdit} />
                            </div>
                            <div>
                                <Label>Nomor Whatsapp</Label>
                                <Input type='tel' value={biodata.no_wa} onChange={(e) => {
                                    setBiodata((prev) => ({
                                        ...prev,
                                        no_wa: e.target.value
                                    }))
                                }} disabled={modeEdit} />
                                <div className='flex items-center space-x-2'>
                                    <Input
                                        type='checkbox'
                                        className='w-3 h-3 mt-1'
                                        checked={isSameNumber}
                                        onChange={handleCheckboxChange}
                                        disabled={modeEdit}
                                    />
                                    <p className='text-[10px] mt-1 sm:text-xs text-muted-foreground'>* Ceklis jika nomor telp ponsel sama dengan nomor WhatsApp</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {modeEdit ? (
                    <></>
                ) : (
                    <div className='mt-5 w-full flex items-center justify-end space-x-4'>
                        <Button variant="destructive" onClick={() => setModeEdit(!modeEdit)}>Batal</Button>
                        <Button className='text-white' type='submit'>
                            Simpan Perubahan
                        </Button>
                    </div>
                )}
            </form>
        </div >
    )
}
