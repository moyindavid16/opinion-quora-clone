"use client";

import {GetPostsType} from "@/lib/validators";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useLayoutEffect, useRef, useState} from "react";
import AvatarIcon from "./AvatarIcon";
import {useOverflowDetector} from "react-detectable-overflow";
import Icons from "./Icons";
import { VoteType } from "@prisma/client";

export default function PostFeed() {
  const {isLoading, data: posts} = useQuery({
    queryKey: ["getPosts"],
    queryFn: async () => {
      const {data} = await axios.get("/api/posts");
      return data as GetPostsType;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2">
      {posts!.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

const PostItem = ({post}: {post: GetPostsType[number]}) => {
  const contentRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  useLayoutEffect(() => {
    // @ts-expect-error
    if (contentRef.current.clientHeight < contentRef.current.scrollHeight) {
      setShowMore(true);
    }
  }, [contentRef]);

  const {mutate: vote} = useMutation({
    mutationFn: async(userVote: VoteType) => {
      const payload = {type: userVote, postId: post.id}
      const {data} = await axios.post("/api/vote", payload)
      return data
    },
    onError: (error) => {
      console.error(error)
    },
    onSuccess: () => {
      console.log("Success")
    }
  })

  return (
    <div className="bg-white flex flex-col gap-1 shadow rounded p-3 pb-1">
      <div className="grid grid-rows-2 grid-flow-col max-w-max gap-x-2 gap-y-0">
        <AvatarIcon image={post.author.image} className="row-span-2" />
        <div className="text-sm font-bold">{post.author.name}</div>
        <div className="text-gray-500 text-sm">Little bio coming soon...</div>
      </div>
      <div className="font-bold text-lg">{post.title}</div>
      <div className="line-clamp-2 relative pr-3 text-sm" ref={contentRef}>
        {post.content}
        {showMore && (
          <div className="absolute bottom-0 right-0 pl-10 bg-gradient-to-r from-transparent to-white  to-[60%] text-emerald-600">
            (more)
          </div>
        )}
      </div>
      <div className="flex gap-4 text-xs text-gray-500">
        <div className="flex rounded-2xl bg-gray-100 border border-gray-300 overflow-hidden">
          <button onClick={()=>vote("Up")} className="flex border-r border-gray-300 py-1 px-2 font-bold gap-1 items-center hover:bg-gray-200">
            <Icons.Upvote /> Upvote
          </button>
          <button onClick={()=>vote("Down")} className="py-1 px-2 hover:bg-gray-200">
            <Icons.Downvote />
          </button>
        </div>
        <button className="rounded-lg hover:bg-gray-100 flex items-center px-1">
          <Icons.Comment />1
        </button>
        <button className="rounded-lg hover:bg-gray-100 flex items-center gap-1 px-1">
          <Icons.Share />2
        </button>
      </div>
    </div>
  );
};
