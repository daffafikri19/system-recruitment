import { Navbar } from "@/components/navbar";
import SignIn from "./(auth)/signin/page";

export default function Home() {
  return (
    <div className="w-full h-full">
      <SignIn />
    </div>
  );
}
