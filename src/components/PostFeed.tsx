"use client";

import {GetPostsType} from "@/lib/validators";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useLayoutEffect, useRef, useState} from "react";
import AvatarIcon from "./AvatarIcon";
import {useOverflowDetector} from "react-detectable-overflow";

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

  return (
    <div className="bg-white flex flex-col shadow rounded p-3 ">
      <div className="grid grid-rows-2 grid-flow-col max-w-max gap-x-2 gap-y-0">
        <AvatarIcon image={post.author.image} className="row-span-2" />
        <div className="text-sm font-bold">{post.author.name}</div>
        <div className="text-gray-500 text-sm">Little bio coming soon...</div>
      </div>
      <div className="font-bold text-lg">{post.title}</div>
      <div className="line-clamp-2 relative pr-3 text-sm" ref={contentRef}>
        {post.content}
        {showMore && <div className="absolute bottom-0 right-0 pl-10 bg-gradient-to-r from-transparent to-white  to-[60%] text-emerald-600">(more)</div>}
      </div>
    </div>
  );
};
