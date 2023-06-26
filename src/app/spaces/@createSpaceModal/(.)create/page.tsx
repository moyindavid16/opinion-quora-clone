"use client";

import Icons from "@/components/Icons";
import LoadingModal from "@/components/LoadingModal";
import Modal from "@/components/Modal";
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/Input";
import {Toast} from "@/components/ui/toast";
import {toast} from "@/components/ui/use-toast";
import {CreateSpaceType} from "@/lib/validators";
import {useMutation} from "@tanstack/react-query";
import axios, {Axios, AxiosError} from "axios";
import {Loader2} from "lucide-react";
import {revalidatePath} from "next/cache";
import Error from "next/error";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {z} from "zod";

export default function CreateSpaceModal() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const {mutate: createSpace, isLoading} = useMutation({
    mutationFn: async () => {
      const payload: CreateSpaceType = {
        name,
        desc,
      };
      const {data} = await axios.post("/api/spaces/create", payload);
      return data;
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        return toast({
          title: error.response?.data,
          description: error.response?.statusText,
          variant: "destructive",
        });
      }
    },
    onSuccess: data => {
      toast({
        title: `Congratulations!🎉`,
        description: `You have successfully created the ${data} Space. Invite your friends over and let the fun begin!`,
      });
      router.back();
      router.refresh();
    },
  });

  if (isLoading) return <LoadingModal />;

  return (
    <Modal>
      <button onClick={() => router.back()}>
        <Icons.x />
      </button>
      <div>
        <h1 className="font-semibold text-lg">Create your space</h1>
        <div className="text-gray-500">Share your interests, curate content, host discussions, and more.</div>
      </div>

      <div className="w-full">
        <h1 className="font-semibold text-md">Name</h1>
        <div className="text-gray-500 text-sm">This can be changed later.</div>
        <Input value={name} onChange={({target}) => setName(target.value)} />
      </div>

      <div className="w-full">
        <h1 className="font-semibold text-md">Brief description</h1>
        <div className="text-gray-500 text-sm">Include a few keywords to show people what to expect if they join.</div>
        <Input value={desc} onChange={({target}) => setDesc(target.value)} />
      </div>

      <Button className="place-self-end" onClick={() => createSpace()}>
        Create
      </Button>
    </Modal>
  );
}
