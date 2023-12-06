import Link from "next/link"
import { Button } from "./ui/button"

export const Navbar = () => {
    return (
        <nav className="py-2 px-6 h-14 shadow-lg bg-white top-0 z-50 bg-transparent w-full">
            <div className="flex items-center py-1 justify-between">
                <div>
                    Logo
                </div>
                <div className="flex items-center space-x-4">
                    <Link href={"/signup"}>
                        <Button variant="outline">Daftar</Button>
                    </Link>
                    <Link href={"/signin"}>
                        <Button className="text-white">Masuk</Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}