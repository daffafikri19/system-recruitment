"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"
import { useRouter } from "next/navigation"



export const DashboardButton = () => {
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false)

    const navigateToDashboard = () => {
        router.push('/dashboard')
    }

    return (
        <div>
        <div className="flex items-center">
            <Button className="text-white" onClick={() => setOpenDialog(true)}>
                Dashboard
            </Button>
        </div>

        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi Tindakan</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Apakah Anda yakin untuk pindah halaman ? <br />
                    Semua proses tidak akan tersimpan
                </AlertDialogDescription>
                <div className="flex items-center space-x-4">
                <AlertDialogCancel asChild className="w-1/2">
                    <Button variant="outline">Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction onClick={navigateToDashboard} asChild className="w-1/2">
                    <Button className="text-white">Lanjutkan</Button>
                </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
        </div>
    )
}