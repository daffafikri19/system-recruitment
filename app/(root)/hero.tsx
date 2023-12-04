import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export const HeroSection = () => {
    return (
        <section className="w-full h-full flex items-center justify-center p-6 bg-primary/5">
            <div className="flex flex-col items-center ">
                <h1 className="text-2xl md:text-4xl text-center font-bold text-muted-foreground">Aplikasi System Recruitment</h1>
                <Image src="/images/requirements-illustration.png" alt="Recruitment" width={300} height={300} />
                <div className="mt-5">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" className="shadow-8">Daftar</Button>
                        <Button variant="default" className="text-white shadow-8" asChild>
                            <Link href={'/assesment'}>Assesment Mandiri</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}