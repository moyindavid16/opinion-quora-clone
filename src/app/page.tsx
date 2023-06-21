"use client"
import { Button } from "@/components/ui/Button";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  

  return (
    <div>
      <Button onClick={()=>signOut()}>Sign out</Button>
    </div>
  );
}
