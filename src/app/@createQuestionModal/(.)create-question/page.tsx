"use client";

import Icons from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CreatePostType, CreateQuestionType } from "@/lib/validators";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import { z } from "zod";

export default function CreateSpaceModal() {
  const [content, setContent] = useState("");
  const router = useRouter();

  const {mutate: createQuestion, isLoading} = useMutation({
    mutationFn: async () => {
      const payload: CreateQuestionType = {content};
      const {data} = await axios.post("/api/questions/create", payload);
      return data;
    },
    onSuccess: () => {
      toast({
        title: `Congratulations!🎉`,
        description: `You have successfully asked for the opinions of other users on your question.`,
      });
      router.back();
      router.refresh();
    },
    onError: (error:any) => {
      
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
            <h1 className="font-semibold text-lg">Ask a question</h1>
            <div className="text-gray-500">Unravel your deepest curiosities.</div>
          </div>

          <div className="w-full">
            <Input placeholder='Start your question with "What", "How", "Why", etc.' value={content} onChange={({target}) => setContent(target.value)} />
          </div>

          <Button className="place-self-end" onClick={() => createQuestion()}>
            Ask
          </Button>
        </div>
      </div>
    </div>
  );
}
