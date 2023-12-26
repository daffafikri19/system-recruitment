import { authOptions } from "@/lib/providers/auth"
import { getServerSession } from "next-auth"

export const ContextWrapper = async ({ children } : { children: React.ReactNode }) => {

    const session = getServerSession(authOptions)
    
    return (
        <div>
            {children}
        </div>
    )
}