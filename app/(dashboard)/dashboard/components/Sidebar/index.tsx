"use client"
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRightIcon } from "lucide-react";

const SidebarRoute = [
  {
    category: 'Dashboard',
    items: [
      {
        label: 'Dashboard',
        url: '/dashboard'
      }
    ]
  },
  {
    category: 'Aktivitas',
    items: [
      {
        label: 'Assesment',
        url: '/dashboard/assesment'
      },
      {
        label: 'Recruitment',
        url: '/dashboard/recruitment'
      }
    ]
  },
  {
    category: 'Biodata Diri',
    items: [
      {
        label: 'Biodata',
        url: '/dashboard/biodata'
      }
    ]
  },
  {
    category: 'ManageContent',
    items: [
      {
        label: 'Bank Soal',
        url: '/question-banks'
      }
    ]
  }
];


const Sidebar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(
    JSON.parse(localStorage.getItem("isMenuOpen") || "{}") || {}
  );
  
  const toggleAccordion = (category : string) => {
    setIsMenuOpen((prev : any) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  useEffect(() => {
    localStorage.setItem("isMenuOpen", JSON.stringify(isMenuOpen));
  }, [isMenuOpen]);

  return (
    <aside className={'absolute left-0 top-0 z-9999 hidden h-screen w-50 flex-col overflow-y-hidden bg-black text-black duration-300 ease-linear dark:bg-boxdark lg:flex lg:static lg:translate-x-0'}>
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="mb-4 ml-4 w-full text-center text-xl font-semibold text-bodydark2">
          Dashboard
        </Link>
      </div>

      <div className="flex flex-col text-center align-middle overflow-y-auto duration-300 ease-linear">
        <div className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            {SidebarRoute.map((categoryItem, index: number) => (
              <Accordion type="multiple" className="text-bodydark2 no-underline" key={index}>
              <AccordionItem value={categoryItem.category} key={categoryItem.category} >
                <AccordionTrigger className="focus:no-underline">
                  <h3 className="text-sm font-semibold text-bodydark2">
                    {categoryItem.category}
                  </h3>
                </AccordionTrigger>
                {categoryItem.items.map((menu, menuIndex) => (
                  <AccordionContent className="flex items-center" key={menu.label}>
                    <Link href={menu.url} className="flex items-center space-x-3">
                    <ChevronRightIcon className="w-4 h-4 mr-2" /> {menu.label}
                    </Link>
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
            ))}

            <ul className="mb-6 flex flex-col gap-1.5 text-sm">
              adsad
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
