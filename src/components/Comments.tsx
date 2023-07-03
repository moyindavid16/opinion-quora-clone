"use client";

import {cn} from "@/lib/utils";
import {CreateCommentType, GetCommentsType} from "@/lib/validators";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useSession} from "next-auth/react";
import {useState} from "react";
import AvatarIcon from "./AvatarIcon";
import Icons from "./Icons";
import {Input} from "./ui/Input";
import {toast} from "./ui/use-toast";

export default function Comments({postId}: {postId: string}) {
  const {data: session} = useSession();
  const [userComment, setUserComment] = useState("");

  const {
    data: comments,
    refetch: refetchComments,
    isLoading,
  } = useQuery({
    queryKey: ["getComment" + postId],
    queryFn: async () => {
      const {data: comments} = await axios.get(`/api/comments/${postId}`);
      console.log(comments);
      return comments as GetCommentsType;
    },
  });

  const {mutate: createComment} = useMutation({
    mutationFn: async () => {
      const payload: CreateCommentType = {postId, userId: session?.user.id, content: userComment};
      const {data} = await axios.post("/api/comments/create", payload);
      return data;
    },
    onError: (error: any) => {
      return toast({
        title: error.response?.data,
        description: error.response?.statusText,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: `Congratulations!🎉`,
        description: `You have successfully created a comment`,
      });
      setUserComment("");
      refetchComments();
    },
  });

  if (isLoading || true)
    return (
      <div>
        <Icons.spinner />
      </div>
    );

  return (
    <div className="flex flex-col w-full bg-white shadow-md">
      <div className="flex bg-gray-100 w-full p-3 py-2 justify-between">
        <AvatarIcon className="h-9 w-9 shadow-sm" image={session?.user.image || ""} />
        <Input
          value={userComment}
          onChange={({target}) => setUserComment(target.value)}
          placeholder="Add a comment..."
          className="bg-white w-2/3 rounded-full h-1/2"
        />
        <button
          onClick={() => createComment()}
          className="bg-emerald-500 h-4/5 self-center rounded-full px-3 py-1.5 text-white text-xs font-semibold"
        >
          Add Comment
        </button>
      </div>

      {comments?.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

const CommentItem = ({comment}: {comment: GetCommentsType[number]}) => {
  return (
    <div className="flex gap-1 px-3 py-2 border-b w-full">
      <AvatarIcon className="" image={comment.author.image} />
      <div className="flex flex-col">
        <div className="text-xs font-bold">{comment.author.name}</div>
        <div className="">{comment.content}</div>

        <div className="flex mt-1">
          <div className="flex h-4/5 items-center rounded-2xl bg-gray-100 border border-gray-300 text-gray-500 text-xs fill-none overflow-hidden">
            <button
              className={cn("flex border-r border-gray-300 p-2 gap-1 font-medium items-center hover:bg-gray-200")}
            >
              <Icons.Upvote height={17} />
              104
            </button>
            <button className={cn("p-2 hover:bg-gray-200 stroke-gray-500")}>
              <Icons.Downvote height={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
