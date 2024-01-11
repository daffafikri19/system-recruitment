import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEventHandler, InputHTMLAttributes } from "react"

interface ItemInputSoalProps {
    label: string
    type: string
    name: string
    value: string | number | undefined
    onValueChange: ChangeEventHandler<HTMLInputElement>
}

export const ItemInputSoal = ({ 
    label,
    name,
    type,
    value,
    onValueChange,
 } : ItemInputSoalProps) => {
    return (
        <div>
            <Label>{label}</Label>
            <Input required type={type} name={name}
                value={value}
                onChange={onValueChange}
            />
        </div>
    )
}