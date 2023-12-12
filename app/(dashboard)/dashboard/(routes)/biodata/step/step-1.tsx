import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User } from 'lucide-react';
import React, { useState } from 'react';
import { useProfessionContext } from '.';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';


const Step1 = () => {
  const { selectedProfession, setSelectedProfession, setIsRadioSelected, isRadioSelected } = useProfessionContext()!;
  return (
    <div className='space-y-4 w-full flex items-center flex-col justify-center'>
      <Card className='w-full'>
        <CardContent className='p-4'>
          <CardHeader>
            <CardTitle>Biodata Diri</CardTitle>
          </CardHeader>
          <div className='my-5 w-full'>
            <div>
              <Label>Nama Lengkap</Label>
              <Input type='text' />
            </div>
          </div>

          <div className='grid grid-cols-3 space-x-4 my-5'>
            <div>
              <Label>Jenis Kelamin</Label>
              <Input type='text' />
            </div>
            <div>
              <Label>Agama</Label>
              <Input type='text' />
            </div>
            <div>
              <Label>Tanggal Lahir</Label>
              <Input type='text' />
            </div>
          </div>

          <div className='grid grid-cols-3 space-x-4 my-5'>
            <div>
              <Label>Negara Kelahiran</Label>
              <Input type='text' />
            </div>
            <div>
              <Label>Provinsi Kelahiran</Label>
              <Input type='text' />
            </div>
            <div>
              <Label>Kota Kelahiran</Label>
              <Input type='text' />
            </div>
          </div>

          <div className='grid grid-cols-3 space-x-4 my-5'>
            <div>
              <Label>Kewarganegaraan</Label>
              <Input type='text' />
            </div>
            <div>
              <Label>Negara Asal</Label>
              <Input type='text' />
            </div>
            <div>
              <Label>Nomor Induk Kependudukan</Label>
              <Input type='text' />
            </div>
          </div>

          <div className='grid grid-cols-3 space-x-4 my-5'>
            <div>
              <Label>Status Pernikahan</Label>
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sudah Menikah">Sudah Menikah</SelectItem>
                  <SelectItem value="Belum Menikah">Belum Menikah</SelectItem>
                  <SelectItem value="Cerai">Cerai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tipe SIM</Label>
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SIM A">SIM A</SelectItem>
                  <SelectItem value="SIM B1">SIM B1</SelectItem>
                  <SelectItem value="SIM B2">SIM B2</SelectItem>
                  <SelectItem value="SIM C">SIM C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>No SIM</Label>
              <Input type='number' />
            </div>
          </div>

        </CardContent>
      </Card>

      <Card className='w-full'>
        <CardContent className='p-4'>
          <CardHeader>
            <CardTitle>Status Disabilitas</CardTitle>
          </CardHeader>
          <div className='grid grid-cols-2 space-x-4 my-5'>
            <div>
              <Label>Apakah anda buta warna ?</Label>
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="pilih" />
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
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="pilih" />
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
            <Input type='text' />
          </div>
          <div className='grid grid-cols-3 space-x-4 my-5'>
            <div>
              <Label>Provinsi</Label>
              <Input type='text' />
            </div>
            <div>
              <Label>Kota</Label>
              <Input type='text' />
            </div>
            <div>
              <Label>Kecamatan</Label>
              <Input type='text' />
            </div>
          </div>
          <div className='w-full'>
            <Label>Alamat</Label>
            <Textarea />
          </div>

          <div className='grid grid-cols-2 space-x-4 my-5'>
            <div>
              <Label>Kode Pos</Label>
              <Input type='number' />
            </div>
            <div>
              <Label>No Telepon Rumah</Label>
              <Input type='text' />
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
            <Input type='text' />
          </div>
          <div className='grid grid-cols-2 space-x-4 my-5'>
            <div>
              <Label>Nomor Ponsel</Label>
              <Input type='tel'/>
            </div>
            <div>
              <Label>Nomor Whatsapp</Label>
              <Input type='tel' />
              <div className='flex items-center space-x-2'>
              <Input type='checkbox' className='w-3 h-3 mt-1' />
              <p className='text-xs text-muted-foreground'>Nomor telp ponsel sama dengan no WhatsApp ?</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default Step1;
