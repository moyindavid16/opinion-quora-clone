"use client";

import {Button} from "@/components/ui/Button";
import {Loader2} from "lucide-react";
import {signIn} from "next-auth/react";
import {useState} from "react";
import Icons from "./Icons";
import { useRouter } from "next/navigation";

export default function SignInButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
      //router.push('/')
    }
  };

  return (
    <Button disabled={isLoading} className="w-full" onClick={()=>loginWithGoogle()}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Icons.google />}
      Google
    </Button>
  );
}
