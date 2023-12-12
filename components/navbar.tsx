import Link from "next/link"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/providers/auth"
import { DashboardButton } from "./dashboard-button"

export const Navbar = async () => {

    const session = await getServerSession(authOptions);

    return (
        <nav className="py-2 px-6 h-14 shadow-lg bg-white top-0 z-50 bg-transparent w-full">
            <div className="flex items-center py-1 justify-between">
                <div className="flex items-center">
                    <Search className="w-5 h-5 font-bold mr-1" /><h1 className="font-bold tracking-tighter text-xl md:text-2xl">Recruitment</h1>
                </div>
                {session?.user ? (
                    <DashboardButton />
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link href={"/signup"}>
                            <Button variant="outline">Daftar</Button>
                        </Link>
                        <Link href={"/signin"}>
                            <Button className="text-white">Masuk</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}