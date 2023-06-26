"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";



export default function AvatarIcon({image, className}: {image: string, className?: string}){
  return (
    <Avatar className={className}>
      <AvatarImage src={image} />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
};