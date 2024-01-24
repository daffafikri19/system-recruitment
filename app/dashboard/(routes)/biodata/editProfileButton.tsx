import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/utils"
import { Edit2Icon } from "lucide-react"

export const EditProfileButton = ({ className } : { className: string }) => {
    return (
        <div>
            <div className={cn(className)}>
                <Button className="rounded-full" size="icon" variant="default"><Edit2Icon className="w-4 h-4" /></Button>
            </div>

            <div>
                
            </div>
        </div>
    )
}