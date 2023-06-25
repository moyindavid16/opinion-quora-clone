"use client";

import Icons from "@/components/Icons";
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/Input";
import {Textarea} from "@/components/ui/textarea";
import {Toast} from "@/components/ui/toast";
import {toast} from "@/components/ui/use-toast";
import {CreatePostType, CreateSpaceType} from "@/lib/validators";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {Loader2} from "lucide-react";
import {revalidatePath} from "next/cache";
import Error from "next/error";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {z} from "zod";

export default function CreateSpaceModal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const {mutate: createPost, isLoading} = useMutation({
    mutationFn: async () => {
      
        const payload: CreatePostType = {title, content};
        const {data} = await axios.post("/api/posts/create", payload);
        return data;
    },
    onSuccess: () => {
      toast({
        title: `Congratulations!🎉`,
        description: `You have successfully created a post.`,
      });
      router.back();
      router.refresh();
    },
    onError: (error: any) => {
      toast({
        title: error.response.data,
        description: error.response.statusText,
        variant: "destructive",
      });
    },
  });

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-20">
        <div className="w-full h-full bg-transparent flex justify-center items-center">
          <div className="h-3/5 w-[45%] bg-white rounded-md shadow-md px-2 flex flex-col items-center justify-center">
            <Icons.spinner size={60} />
          </div>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20">
      <div className="w-full h-full bg-transparent flex justify-center items-center">
        <div className="h-3/5 w-[45%] bg-white rounded-md shadow-md px-2 flex flex-col items-start justify-around">
          <button onClick={() => router.back()}>
            <Icons.x />
          </button>
          <div>
            <h1 className="font-semibold text-lg">Create a Post</h1>
            <div className="text-gray-500">Share your interests, curate content, host discussions, and more.</div>
          </div>

          <div className="w-full">
            <h1 className="font-semibold text-md">Title</h1>
            <div className="text-gray-500 text-sm">This is the topic of your opinion.</div>
            <Input value={title} onChange={({target}) => setTitle(target.value)} />
          </div>

          <div className="w-full">
            <h1 className="font-semibold text-md">Your Opinion</h1>
            <div className="text-gray-500 text-sm">Speak or should we say, Write freely.</div>
            <Textarea value={content} onChange={({target}) => setContent(target.value)} />
          </div>

          <Button className="place-self-end" onClick={() => createPost()}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
