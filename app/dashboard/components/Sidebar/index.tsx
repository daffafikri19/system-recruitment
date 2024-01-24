"use client"
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./sidebarLinkGroup";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, ContactIcon, LayoutDashboardIcon, ListChecksIcon, ListIcon, ListTodoIcon, LucidePaperclip, PercentSquareIcon, Settings, SettingsIcon, Users2Icon } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { usePathname } from "next/navigation";
import { ReffLink } from "../ReffLink";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const reffcode = pathSegments[2];
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const KelolaSoalRoute = [
    {
      index: 1,
      name: "Analogi Verbal",
      link: `/dashboard/kelola-soal/verbal`,
    },
    {
      index: 2,
      name: "Antonim",
      link: `/dashboard/kelola-soal/antonim`,
    },
    {
      index: 3,
      name: "Sinonim",
      link: `/dashboard/kelola-soal/sinonim`,
    },
    {
      index: 4,
      name: "Antonim - Sinonim",
      link: `/dashboard/kelola-soal/antonim-sinonim`,
    },
    {
      index: 5,
      name: "Deret Angka",
      link: `/dashboard/kelola-soal/deret-angka`,
    },
    {
      index: 6,
      name: "Hitung Cepat",
      link: `/dashboard/kelola-soal/hitung-cepat`,
    },
    {
      index: 7,
      name: "Informasi Singkat",
      link: `/dashboard/kelola-soal/informasi-singkat`,
    },
    {
      index: 8,
      name: "Kalimat Tak Teratur",
      link: `/dashboard/kelola-soal/kalimat-tak-teratur`,
    },
    {
      index: 9,
      name: "Kemampuan Teknikal",
      link: `/dashboard/kelola-soal/kemampuan-teknikal`,
    },
    {
      index: 10,
      name: "Ketelitian",
      link: `/dashboard/kelola-soal/ketelitian`,
    },
    {
      index: 11,
      name: "Kuantitatif Analisis",
      link: `/dashboard/kelola-soal/kuantitatif-analisis`,
    },
    {
      index: 12,
      name: "Penalaran Analitik",
      link: `/dashboard/kelola-soal/penalaran-analitik`,
    },
    {
      index: 13,
      name: "Penalaran Logis",
      link: `/dashboard/kelola-soal/penalaran-logis`,
    },
    {
      index: 14,
      name: "Kepribadian",
      link: `/dashboard/kelola-soal/kepribadian`,
    },
  ]

  const PengaturanList = [
    {
      index: 1,
      name: "Pengaturan Soal",
      link: `/dashboard/settings`,
    },
    {
      index: 2,
      name: "Pengaturan Api",
      link: `/dashboard/settings`,
    },
    {
      index: 3,
      name: "Pengaturan Aplikasi",
      link: `/dashboard/settings`,
    },
  ]

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);


  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <ReffLink href="/dashboard">
          {/* <Image
            width={176}
            height={32}
            src={"/images/logo/logo.svg"}
            alt="Logo"
          /> */}
          <h1 className="text-white font-bold text-xl md:text-2xl lg:text-4xl">
            E-Recruitment
          </h1>
        </ReffLink>

        <Button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-white">
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              USER MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <ReffLink
                  href="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.endsWith("dashboard") && "bg-graydark dark:bg-meta-4"
                    }`}>
                  <LayoutDashboardIcon className="w-4 h-4" />
                  Dashboard
                </ReffLink>
              </li>
              <li>
                <ReffLink
                  href="/dashboard/biodata"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.endsWith("biodata") && "bg-graydark dark:bg-meta-4"
                    }`}
                >
                  <ContactIcon className="w-4 h-4" />
                  Biodata Diri
                </ReffLink>
              </li>
              <li>
                <ReffLink
                  href="/tes/psikotest"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.endsWith("psikotest") && "bg-graydark dark:bg-meta-4"
                    }`}
                >
                  <ListChecksIcon className="w-4 h-4" />
                  Tes
                </ReffLink>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              PT MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={pathname.includes("kelola-soal")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname.includes("/kelola-soal") || pathname.includes("/kelola-soal")) &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <ListTodoIcon className="w-4 h-4" />
                        <div className="w-full flex items-center justify-between">
                          Kelola Soal
                          <ChevronDown className={cn("", open ? "rotate-180" : "")} />
                        </div>
                      </Link>
                      <div
                        className={`translate transition-all transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          {KelolaSoalRoute.map((item) => (
                            <li key={item.index}>
                              <ReffLink
                                href={item.link}
                                className={cn("group relative flex items-center gap-2.5 rounded-md px-4 text-sm truncate font-medium text-white duration-300 ease-in-out hover:text-white", pathname === item.link ? "text-white" : "text-bodydark2")}
                              >
                                {item.name}
                              </ReffLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={pathname.endsWith("joblist")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname.endsWith("/joblist") || pathname.endsWith("/joblist")) &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <ListTodoIcon className="w-4 h-4" />
                        <div className="w-full flex items-center justify-between">
                           Joblist
                          <ChevronDown className={cn("", open ? "rotate-180" : "")} />
                        </div>
                      </Link>
                      <div
                        className={`translate transition-all transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ReffLink
                              href="/dashboard/joblist/deskripsi"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 text-sm truncate font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/dashboard/joblist/deskripsi" && "text-white"
                                }`}
                            >
                              Deskripsi
                            </ReffLink>
                          </li>
                          <li>
                            <ReffLink
                              href="/dashboard/joblist/kualifikasi"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 text-sm truncate font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/dashboard/joblist/kualifikasi" && "text-white"
                                }`}
                            >
                              Kualifikasi
                            </ReffLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* <li>
                <Link
                  href="/dashboard/daftar-peserta"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.endsWith("daftar-peserta") && "bg-graydark dark:bg-meta-4"
                    }`}
                >
                  <Users2Icon className="w-4 h-4" />
                  Daftar Peserta
                </Link>
              </li>
              <li>
                  <Link
                    href="/dashboard/daftar-admin"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.endsWith("daftar-admin") && "bg-graydark dark:bg-meta-4"
                      }`}
                  >
                    <Users2Icon className="w-4 h-4" />
                    Daftar Admin
                  </Link>
                </li> */}

                <SidebarLinkGroup
                activeCondition={pathname.endsWith("daftar-user")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname.endsWith("/daftar-user") || pathname.endsWith("/daftar-user")) &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <Users2Icon className="w-4 h-4" />
                        <div className="w-full flex items-center justify-between">
                          Daftar User
                          <ChevronDown className={cn("", open ? "rotate-180" : "")} />
                        </div>
                      </Link>
                      <div
                        className={`translate transition-all transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ReffLink
                              href="/dashboard/daftar-user/list-peserta"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 text-sm truncate font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/dashboard/daftar-user/list-peserta" && "text-white"
                                }`}
                            >
                              List Peserta
                            </ReffLink>
                          </li>
                          <li>
                            <ReffLink
                              href="/dashboard/daftar-user/list-admin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 text-sm truncate font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/dashboard/daftar-user/list-admin" && "text-white"
                                }`}
                            >
                              List Admin
                            </ReffLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <ReffLink
                  href="/dashboard/seleksi-berkas"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.endsWith("seleksi-berkas") && "bg-graydark dark:bg-meta-4"
                    }`}
                >
                  <LucidePaperclip className="w-4 h-4" />
                  Seleksi Berkas
                </ReffLink>
              </li>

                 <li>
                <ReffLink
                  href="/dashboard/hasil-tes-peserta"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.endsWith("hasil-tes-peserta") && "bg-graydark dark:bg-meta-4"
                    }`}
                >
                  <ListIcon className="w-4 h-4" />
                  Hasil Tes Peserta
                </ReffLink>
              </li>

              <SidebarLinkGroup
                    activeCondition={pathname.endsWith("kelola")}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname.endsWith("/tpa") || pathname.endsWith("/tkb")) &&
                              "bg-graydark dark:bg-meta-4"
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <SettingsIcon className="w-4 h-4" />
                            <div className="w-full flex items-center justify-between">
                              Pengaturan
                              <ChevronDown className={cn("", open ? "rotate-180" : "")} />
                            </div>
                          </Link>
                          <div
                            className={`translate transition-all transform overflow-hidden ${!open && "hidden"
                              }`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              {PengaturanList.map((item) => (
                                <li key={item.index}>
                                  <ReffLink
                                    href={item.link}
                                    className={cn("group relative flex items-center gap-2.5 rounded-md px-4 text-sm truncate font-medium text-white duration-300 ease-in-out hover:text-white", pathname === item.link ? "text-white" : "text-bodydark2")}
                                  >
                                    {item.name}
                                  </ReffLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              TIS MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <React.Fragment>

               
               
              </React.Fragment>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;