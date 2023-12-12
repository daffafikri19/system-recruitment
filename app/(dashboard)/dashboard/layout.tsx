import { Metadata } from "next";
import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Sistem Requirements",
  // other metadata
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <div>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
