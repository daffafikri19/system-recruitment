import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { signOut, useSession } from "next-auth/react";
import { Book, File, UserCheck2, UserCog2, WorkflowIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";

const DropdownUser = () => {

  const { data: session, status } = useSession();
  const pathname = usePathname();
  const routeParts = pathname.split("/").filter((part) => part !== "");
  const reffcode = routeParts[1];

  const getLetterFallback = (name: string) => {
    if (name) {
      const names = name.split(" ");
      if (names.length >= 2) {
        const firstName = names[0];
        const lastName = names[names.length - 1];
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName.charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
      } else if (names.length === 1) {
        const firstName = names[0];
        const firstInitial = firstName.charAt(0).toUpperCase();
        return firstInitial;
      }
    }

    return "";
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-4">
            <div className="hidden text-right md:flex md:flex-col md:items-end">
              <p className="font-medium text-sm">
                {session?.user.name ? session.user.name : (<Skeleton className="w-14 h-4 animate-pulse mb-1" />)}
              </p>
              <p className="text-muted-foreground font-medium text-xs">
                {session?.user.role ? session.user.role : (<Skeleton className="w-14 h-4 animate-pulse" />)}
              </p>
            </div>

            <div className="flex items-center justify-center border rounded-full dark:border-white">
              {/* <Image
                width={112}
                height={112}
                src={'/images/user/blank_user.webp'}
                alt="User"
              /> */}
              <Avatar>
                <AvatarImage className="object-cover w-full h-full" src="/images/user/blank_user.webp" alt={session?.user.name} width={100} height={100} />
                <AvatarFallback>{getLetterFallback(session?.user.name)}</AvatarFallback>
              </Avatar>
            </div>

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
                <UserCheck2 className="w-5 h-5 mr-4" />
                {session?.user.name ? session.user.name : (<Skeleton className="w-10 h-4 animate-pulse" />)}
              </p>
              <p className="flex items-center font-medium">
                <WorkflowIcon className="w-5 h-5 mr-4" />
                {session?.user.role ? session.user.role : (<Skeleton className="w-10 h-4 animate-pulse" />)}
              </p>
              <p className="flex items-center font-medium">
                <File className="w-5 h-5 mr-4" />
                {session?.user.no_pendaftaran ? session.user.no_pendaftaran : "belum menyelesaikan pendataan"}
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
          <div className="mt-4 w-full">
            <Link href={`#`}
              onClick={() => {
                signOut({
                  redirect: true,
                  callbackUrl: `${window.location.origin}/signin?reff=${reffcode}`
                })
              }}
              className="flex w-full items-center gap-3.5 px-2 py-2 text-sm font-medium duration-300 ease-in-out lg:text-base">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                  fill=""
                />
                <path
                  d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                  fill=""
                />
              </svg>
              Log Out
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DropdownUser;
