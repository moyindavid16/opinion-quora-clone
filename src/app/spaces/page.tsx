import Icons from "@/components/Icons";
import {buttonVariants} from "@/components/ui/Button";
import {authOptions} from "@/lib/auth";
import {prisma} from "@/lib/client";
import {getServerSession} from "next-auth";
import Link from "next/link";
import {ReactNode} from "react";

export default function Spaces() {
  return (
    <div className="flex w-full justify-around">
      <div className="w-3/5 ">
        <YourSpaces />
        <div>
          <h1>Discover Spaces</h1>
        </div>
      </div>

      <div>1</div>
    </div>
  );
}

const YourSpaces = () => {
  const GreenButton = ({children, href}: {children: ReactNode; href: string}) => {
    return (
      <Link
        href={href}
        className="text-emerald-500 hover:bg-emerald-500 hover:bg-opacity-5 h-7 border-emerald-500 border-[1.5px] text-center text-sm font-medium flex items-center justify-around gap-1 rounded-full my-0 py-0 px-2"
      >
        {children}
      </Link>
    );
  };
  return (
    <div className="w-full bg-white px-5 py-3 pb-0 shadow-md rounded flex flex-col gap-2">
      <h1 className="font-semibold text-xl">Your Spaces</h1>
      <div className="flex gap-2">
        <GreenButton href="/spaces/create">
          <Icons.plus className="h-5 w-5 fill-emerald-500 stroke-2 stroke-emerald-500" />
          Create a Space
        </GreenButton>
        <GreenButton href="">
          <Icons.compass className="h-5 w-5 fill-emerald-500 stroke-1 stroke-emerald-500" />
          Discover Spaces
        </GreenButton>
      </div>
      <ListOfSpaces />
    </div>
  );
};

const ListOfSpaces = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const mySpaces = await prisma.space.findMany({
    where: {userId: session.user.id},
  });

  return (
    <div className="flex flex-col">
      {mySpaces.map(space => {
        return (
          <Link href="" key={space.id}>
            <div className="py-3 hover:bg-black hover:bg-opacity-[.02] font-bold text-sm">{space.name}</div>
            <hr />
          </Link>
        );
      })}
    </div>
  );
};
