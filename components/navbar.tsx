import { Button } from "./ui/button"

export const Navbar = () => {
    return (
        <nav className="py-2 px-6 h-14 shadow-lg sticky top-0 z-50">
            <div className="flex items-center py-1 justify-between">
                <div>
                    Logo
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="outline">Daftar</Button>
                    <Button className="text-white">Masuk</Button>
                </div>
            </div>
        </nav>
    )
}