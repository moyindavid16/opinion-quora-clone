"use client"

import {User} from "next-auth";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/Avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "./ui/Dropdown-menu";
import { signOut } from "next-auth/react";
import AvatarIcon from "./AvatarIcon";

export default function UserAvatar({user}: {user: User}) {
  const {image,name} = user;
  return (
    <DropdownMenu >
      <DropdownMenuTrigger>
        <AvatarIcon image={image!} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-5">
        <div className="flex flex-col p-2 gap-2">
          <AvatarIcon image={image!} />
          <h1 className="font-medium">{name}</h1>
        </div>
        <div className="w-[200px]"></div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={()=>signOut()}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


