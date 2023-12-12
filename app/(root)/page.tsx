import { Navbar } from "@/components/navbar";
import { HeroSection } from "./hero";

export default function Home() {
  return (
    <div className="w-full h-full">
      <>
        <Navbar />
      </>
      <HeroSection />
    </div>
  );
}
