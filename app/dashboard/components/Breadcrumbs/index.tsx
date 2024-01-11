"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {

  const pathname = usePathname();
  const routeParts = pathname.split("/").filter((part) => part !== "");


  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
      <ol className="flex items-center gap-2">
          {routeParts.map((part, index) => (
            <React.Fragment key={index}>
              {index === 0 ? (
                // 
                null
              ) : (
                <span className="">-</span>
              )}
              {index === routeParts.length - 1 ? (
                <span className="font-medium text-primary cursor-not-allowed ">
                  {part}
                </span>
              ) : (
                <Link href={`/${routeParts.slice(0, index + 1).join("/")}`}>
                  <span className="font-medium cursor-pointer">
                    {part}
                  </span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
