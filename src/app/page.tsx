import AvatarIcon from "@/components/AvatarIcon";
import Icons from "@/components/Icons";
import PostFeed from "@/components/PostFeed";
import {Input} from "@/components/ui/Input";
import {getAuth} from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getAuth();

  return (
    <div className="w-full  flex px-10">
      <div className="w-1/5">Spaces</div>

      <div className="flex flex-col gap-2 w-1/2">
        <TopTaskBar />
        <PostFeed />
      </div>
    </div>
  );
}

const TopTaskBar = async() => {
  const session = await getAuth();
  return (
    <div className="bg-white flex border shadow rounded p-3 gap-2 items-center">
      <AvatarIcon image={session?.user.image || ""} />
      <div className="grow flex flex-col gap-2">
        <button className="w-full text-left px-3 py-1 text-gray-500 rounded-full bg-gray-100 border border-gray-300">
          What do you want to ask or share?
        </button>

        <div className="flex justify-around text-center text-gray-500 text-sm font-semibold">
          <Link href="/create-question" className="border-r grow flex items-center justify-center gap-1">
            <Icons.ask /> Ask
          </Link>
          <button className="border-r grow flex items-center justify-center gap-1 ">
            <Icons.answer2 /> Answer
          </button>
          <Link href="/create-post" className="grow flex items-center justify-center gap-1 ">
            <Icons.post /> Post
          </Link>
        </div>
      </div>
    </div>
  );
};


