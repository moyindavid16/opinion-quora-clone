import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth/next";
import Link from "next/link";
import Icons from "./Icons";
import {buttonVariants} from "./ui/Button";
import UserAvatar from "./UserAvatar";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full bg-white shadow-sm p-3 px-20 flex items-center gap-10 justify-between mb-8">
      <div className="flex gap-16 text-emerald-500 font-bold text-2xl">
        <Link href="/">
          <div className="flex">
            <Icons.onion size={30} />
            <p className="pl-3">O</p>
            <p className="text-emerald-800">pi</p>
            <p>nion</p>
          </div>
        </Link>

        <div className="flex gap-7">
          <Link href="/">
            <Icons.home />
          </Link>

          <Icons.following />
          <Icons.answer />
          <Link href="/spaces">
            <Icons.spaces />
          </Link>
        </div>
      </div>

      {!session ? (
        <Link href="/sign-in" className={buttonVariants()}>
          Sign in
        </Link>
      ) : (
        <UserAvatar user={session.user} />
      )}
    </div>
  );
};

export default Nav;
