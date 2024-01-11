import { Metadata } from "next";
import Breadcrumb from "../../components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/utils/prisma";
import { SettingSoalForm } from "./settingSoalForm";
import { Loader } from "@/components/loader";
import { settinganSoal } from "@prisma/client";
export const metadata: Metadata = {
  title: "E-Recruitment - Settings",
};

const Settings = async () => {

  const dataSettingSoal = await prisma.settinganSoal.findFirst() as settinganSoal;
  
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div>
          <SettingSoalForm dataSetting={dataSettingSoal} />
        </div>
      </div>
    </>
  );
};

export default Settings;
