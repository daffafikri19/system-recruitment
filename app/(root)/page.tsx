import { Navbar } from "@/components/navbar";
import { HeroSection } from "./hero";
import SignIn from "./(auth)/signin/page";

export default function Home() {
  return (
    <div className="w-full h-full">
      {/* <>
        <Navbar />
      </>
      <HeroSection /> */}
      <SignIn />
    </div>
  );
}
