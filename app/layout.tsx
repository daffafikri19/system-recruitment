import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recruitment",
  description: "Sistem Recruitment",
  // other metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main className="w-full h-full">
            <div className="h-full w-full">
              {children}
            </div>
            <Toaster />
          </main>
      </body>
    </html>
  );
}
