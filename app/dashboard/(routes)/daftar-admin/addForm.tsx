"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { DatePicker } from "../../components/DatePicker"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useLoadingContext } from "@/lib/providers/loadingStateProvider"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { addNewAdminAccount } from "@/actions/mutations/admin/addNewAdmin"
import { toast } from "@/components/ui/use-toast"


export const AddForm = () => {

    const [date, setDate] = useState("");
    const { loading, setLoading } = useLoadingContext();

    const handleSelectedDate = (date: string) => {
        setDate(date)
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button>
                        Add New <Plus className="w-4 h-4 ml-2" />
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <form action={async formdata => {
                        setLoading(true)
                        await addNewAdminAccount(formdata).then(result => {
                            toast({
                                title: result.message,
                                variant: result.status === 200 ? "default" : 'destructive'
                            });
                            setLoading(false)
                        })
                    }}>
                        <div>
                            <Label>Nama Lengkap</Label>
                            <Input type="text" name="name" />
                        </div>

                        <div>
                            <Label>Email</Label>
                            <Input type="email" name="email" />
                        </div>

                        <div>
                            <Label>Role</Label>
                            <Select name="role">
                                <SelectTrigger>
                                    <SelectValue placeholder="pilih" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="superadmin">SuperAdmin</SelectItem>
                                    <SelectItem value="hrd">HRD</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Tanggal Lahir</Label>
                            <DatePicker disabled={false} selectedDate={handleSelectedDate} />
                            <input type="hidden" name="tgl_lahir" value={date} />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input type="password" name="password" />
                        </div>

                        <AlertDialogFooter className="mt-5 flex items-center space-x-4">
                            <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
                            <AlertDialogAction type="submit" disabled={loading}>Submit</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}