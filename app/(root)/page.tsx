import { Metadata } from "next";
import { HeroSection } from "./hero";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Sistem Requirements",
  // other metadata
};

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
