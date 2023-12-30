"use client"
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { SessionProvider } from "next-auth/react";
import LeavePageConfirmation from "@/lib/providers/LeavePageConfirmation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider>
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div>
            <div className="mx-auto max-w-screen-2xl p-2 md:p-4 2xl:p-8">
            <LeavePageConfirmation />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
    </SessionProvider>
  );
}
