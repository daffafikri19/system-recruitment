"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { SessionProvider } from "next-auth/react";
import LeavePageConfirmation from "@/lib/providers/LeavePageConfirmation";
import { Toaster } from "@/components/ui/toaster";
import Loading from "@/app/loading";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, []);

  if(!mounted) {
    return (
      <Loading />
    )
  }

  return (
    <SessionProvider>
      <div className="dark:bg-boxdark-2 dark:text-bodydark" suppressHydrationWarning={true}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div>
              <div className="mx-auto max-w-screen-2xl p-2 md:p-4 2xl:p-8">
                {/* <LeavePageConfirmation /> */}
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </SessionProvider>
  );
}
