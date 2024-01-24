"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Edit2Icon, EyeIcon, Trash2Icon } from "lucide-react"

interface ActionButtonProps {
    onPreview?: () => void
    onEdit?: () => void
    onDelete?: () => void
    openDialog?: boolean | undefined
    onOpenDialog?(open: boolean): void
    alertTitle?: string
    alertLabelCancel?: string
    alertLabelAction?: string
}

export const ActionsButton = ({
    onPreview,
    onEdit,
    onDelete,
    openDialog,
    onOpenDialog,
    alertTitle,
    alertLabelCancel,
    alertLabelAction,
}: ActionButtonProps) => {
    return (
        <div className='flex items-center justify-center space-x-2'>
            {onPreview &&
                <Button size="icon" className="w-7 h-7" variant="outline" onClick={onPreview}>
                    <EyeIcon className='w-4 h-4 cursor-pointer' />
                </Button>}
            <Button size="icon" className="w-7 h-7" variant="default" onClick={onEdit}>
                <Edit2Icon className='w-4 h-4 cursor-pointer' />
            </Button>
            {onDelete && (
                <AlertDialog open={openDialog} onOpenChange={onOpenDialog}>
                    <AlertDialogTrigger asChild>
                        <Button size="icon" className="w-7 h-7" variant="destructive">
                            <Trash2Icon className='w-4 h-4 cursor-pointer' />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="grid grid-cols-2 gap-2">
                            <AlertDialogCancel>{alertLabelCancel}</AlertDialogCancel>
                            <AlertDialogAction className="text-white" onClick={onDelete}>{alertLabelAction}</AlertDialogAction>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    )
}