import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authOptions } from "@/lib/providers/auth"
import { Edit2Icon } from "lucide-react"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { EditProfileButton } from "./editProfileButton"

export const ProfileBox = async () => {

    const session = await getServerSession(authOptions);

    return (
        <div className="p-1 w-full">
            <Card className="flex items-start text-center py-5 md:py-7 w-full bg-muted">
                <CardContent className="p-2 w-full bg-muted text-center dark:bg-boxdark">
                    <div className="cursor-pointer w-[150px] h-[150px] rounded-full mx-auto flex items-center justify-center border-2 relative group dark:border-white/80">
                        <Image src={"/images/user/blank_user.webp"} alt={session?.user.name} width={100} height={100} />
                        <EditProfileButton className="absolute opacity-0 top-0 right-0 md:group-hover:opacity-100" />
                    </div>
                    <div className="mt-5 w-full">
                        <h1 className="text-2xl font-bold">{session?.user.name}</h1>
                        <p className="text-xl text-muted-foreground">{session?.user.role}</p>
                        <p className="text-xl text-muted-foreground">{session?.user.no_pendaftaran}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}