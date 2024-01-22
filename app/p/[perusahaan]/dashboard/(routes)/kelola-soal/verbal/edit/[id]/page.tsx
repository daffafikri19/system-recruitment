"use client"

import { editSoal } from '@/actions/mutations/soal/verbal/editSoal'
import { FileManagerOpener } from '@/app/dashboard/components/FileManager/open'
import { TextEditor } from '@/app/dashboard/components/TextEditor'
import { useLoadingContext } from '@/lib/providers/loadingStateProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { Loader2, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface SoalVerbalProps {
  id: number;
  gambar: string | null;
  soal: string;
  A: string;
  B: string;
  C: string;
  D: string;
  E: string | null;
  kunci_jawaban: string;
  tipe_soal: any;
  aktif: string;
  createdAt: string;
  updatedAt: string;
}

const EditSoalVerbalPage = () => {
  const [media, setMedia] = useState<string | null>("");
  const [soal, setSoal] = useState("");
  const router = useRouter();
  const [question, setQuestion] = useState<SoalVerbalProps>({
    id: 0,
    gambar: "",
    soal: "",
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
    kunci_jawaban: "",
    tipe_soal: "Bahasa_Indonesia",
    aktif: "true",
    createdAt: "",
    updatedAt: "",
  });

  const { loading, setLoading } = useLoadingContext();

  const params = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post('/api/questions/verbal', {
          id: parseInt(id!)
        }, {
          headers: {
            "Content-Type": 'application/json'
          }
        });

        setQuestion(response.data)
        setSoal(response.data.soal)
        setMedia(response.data.gambar)
        console.log(response.data)
      } catch (error) {
        toast({
          title: 'Terjadi kesalahan server saat edit soal',
          variant: 'destructive'
        })
      }
    }

    getData();
  }, [id])

  function handleFileSelected(mediaUrl: string) {
    console.log(mediaUrl)
    setMedia(mediaUrl)
  }

  const handleTextEditorChange = (content: any, editor: any) => {
    setSoal(content)
  }

  return (
    <div className='w-full'>
      <Card>
        <CardContent className='py-4'>
          <form action={async formdata => {
            setLoading(true)
            const result = await editSoal(formdata);
            if (result.status === 200) {
              toast({
                title: result.message,
                variant: "default"
              });
              setLoading(false)
              return router.push('/dashboard/kelola-soal/verbal')
            } else {
              toast({
                title: result.message,
                variant: "destructive"
              });
              setLoading(false)
              console.log(result.error)
            }
          }}>
            <div>
              <Label>Gambar (opsional)</Label>
              <div className='border-dashed border-2 rounded-lg dark:border-white w-full'>
                {media ? (
                  <div className='w-full flex items-center justify-center py-4 relative'>
                    <Image src={`https://filemanager-e-recruitment.teinsolutions.com${media}`} alt='Preview' width={200} height={200} />
                    <Input type='hidden' name='gambar' value={media?.toString() ? media?.toString() : "null"} readOnly />
                    <div title='delete' className='w-8 h-8 rounded-bl-full flex items-center justify-center cursor-pointer border-2 border-dashed absolute top-0 right-0' onClick={() => setMedia(null)}>
                      <X className='w-5 h-5 text-red-700  ml-2 mb-2 ' />
                    </div>
                  </div>
                ) : (
                  <div>
                    <FileManagerOpener onFileSelected={handleFileSelected} />
                    <Input type='hidden' name='gambar' value={media?.toString() ? media?.toString() : "null"} readOnly />
                  </div>
                )}
              </div>
            </div>

            <div className='mt-5 w-full'>
              <Label>Soal / Pertanyaan</Label>
              <TextEditor handleEditorChange={handleTextEditorChange} initialValue={soal} />
              <Input type='hidden' name='soal' value={soal} readOnly />
            </div>

            <div className='mt-5 w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
              <div>
                <Label>Jawaban A</Label>
                <Textarea required name='A' value={question.A} onChange={(e) => {
                  setQuestion((prev) => ({
                    ...prev,
                    A: e.target.value
                  }))
                }} />
              </div>
              <div>
                <Label>Jawaban B</Label>
                <Textarea required name='B' value={question.B} onChange={(e) => {
                  setQuestion((prev) => ({
                    ...prev,
                    B: e.target.value
                  }))
                }} />
              </div>
              <div>
                <Label>Jawaban C</Label>
                <Textarea required name='C' value={question.C} onChange={(e) => {
                  setQuestion((prev) => ({
                    ...prev,
                    C: e.target.value
                  }))
                }} />
              </div>
              <div>
                <Label>Jawaban D</Label>
                <Textarea required name='D' value={question.D} onChange={(e) => {
                  setQuestion((prev) => ({
                    ...prev,
                    D: e.target.value
                  }))
                }} />
              </div>
              {question.E ? (
                <div>
                  <Label>Jawaban E</Label>
                  <Textarea name='E' value={question.E} onChange={(e) => {
                    setQuestion((prev) => ({
                      ...prev,
                      E: e.target.value
                    }))
                  }} />
                </div>
              ) : null}

            </div>
            <div className='mt-5'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div>
                  <Label>Kunci Jawaban</Label>
                  <Select required name='kunci_jawaban' value={question.kunci_jawaban} onValueChange={(e) => {
                    setQuestion((prev) => ({
                      ...prev,
                      kunci_jawaban: e
                    }))
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Bahasa</Label>
                  <Select required defaultValue='Bahasa_Indonesia' name='tipe_soal' value={question.tipe_soal} onValueChange={(e) => {
                    setQuestion((prev) => ({
                      ...prev,
                      tipe_soal: e
                    }))
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bahasa_Indonesia">Bahasa Indonesia</SelectItem>
                      <SelectItem value="Bahasa_Inggris">Bahasa Inggris</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status Soal</Label>
                  <Select required defaultValue='true' name='aktif' value={question.aktif} onValueChange={(e) => {
                    setQuestion((prev) => ({
                      ...prev,
                      aktif: e
                    }))
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Aktif</SelectItem>
                      <SelectItem value="false">Tidak Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <input type="hidden" name='id' value={id!} readOnly />
            <div className='mt-10 w-full flex items-center justify-end space-x-4'>
              <Button disabled={loading} type='button' variant="destructive" onClick={() => router.push('/dashboard/kelola-soal/verbal')}>Batal</Button>
              <Button type="submit" aria-disabled={loading} disabled={loading}>
                {loading ? (
                  <Loader2 className='w-5 h-5 mx-4 animate-spin' />
                ) : "Simpan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditSoalVerbalPage