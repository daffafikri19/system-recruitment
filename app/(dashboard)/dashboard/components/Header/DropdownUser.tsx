import Link from "next/link";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Book, UserCheck2, UserCog2, WorkflowIcon } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
const DropdownUser = ({ children }: { children: React.ReactNode }) => {


  const { data: session, status } = useSession();
  console.log(session)
  const router = useRouter();
  useEffect(() => {
    if(status === "unauthenticated") {
      toast({
        title: 'Sesi telah berakhir',
        description: 'Silahkan login lagi untuk melanjutkan'
      })
      router.push('/signin')
    }
  }, [session])

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-4">
            <div className="hidden text-right md:flex md:flex-col md:items-end">
              <p className="font-medium">
                {session?.user.name ? session?.user.name : session?.user.email}
              </p>
              <p className="text-muted-foreground font-medium">{session?.user.role ? session.user.role : '-'}</p>
            </div>

            <span className="h-12 w-12 rounded-full bg-white dark:bg-white/40">
              <Image
                width={112}
                height={112}
                src={'/images/user/blank-user.png'}
                alt="User"
              />
            </span>

            <svg
              className="hidden fill-current sm:block"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                fill=""
              />
            </svg>
          </div>
        </PopoverTrigger>
        <PopoverContent className="mt-5 w-60 dark:bg-boxdark">
          <ul className="flex flex-col gap-5 border-b border-stroke dark:border-strokedark pb-2">
            <li className="flex items-start space-y-2 flex-col md:hidden border-b pb-4">
              <p className="flex items-center font-medium">
                <UserCheck2 className="w-5 h-5 mr-4" />{session?.user.name ? session?.user.name : session?.user.email}
              </p>
              <p className="flex items-center font-medium">
                <WorkflowIcon className="w-5 h-5 mr-4" /> {session?.user.role ? session.user.role : '-'}
              </p>
            </li>
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
               <Book className="w-5 h-5 mr-1" />
                Aktivitas
              </Link>
            </li>

            <li>
              <Link
                href="/pages/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <UserCog2 className="w-5 h-5 mr-1" />
                Account Settings
              </Link>
            </li>
          </ul>
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DropdownUser;
