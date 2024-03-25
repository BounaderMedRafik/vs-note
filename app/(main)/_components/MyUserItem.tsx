"use client";
import { ChevronsLeftRight, LogOut } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const MyUserItem = () => {
  const { user } = useUser();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className=" flex items-center text-xs p-3 w-full hover:bg-[#EEEEEE] dark:hover:bg-[#EEEEEE]/10 "
          >
            <div className="gap-x-2 flex items-center max-w-[150px]">
              <Avatar className=" h-7 w-7 border-green-500 border-2">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <span className="text-start text-md font-medium line-clamp-1">
                {user?.fullName}
              </span>
            </div>
            <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className=" w-80 "
          align="start"
          alignOffset={11}
          forceMount
        >
          <div className="flex flex-col space-y-4 p-2">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </p>
            <div className="flex items-center gap-x-2">
              <div className="rounded-md bg-secondary p-1">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
              </div>
              <div className=" space-y-1">
                <p className="text-sm line-clamp-1">{user?.fullName}</p>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            className=" w-full bg-[#76885B]/75 text-xs flex justify-start items-center gap-2 text-white  cursor-pointer hover:opacity-90 transition-all "
          >
            <SignOutButton>
              <div className="">
                <LogOut size={15} />
                Log Out
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MyUserItem;
