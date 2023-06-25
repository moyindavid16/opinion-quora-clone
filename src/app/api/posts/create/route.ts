import {getAuth} from "@/lib/auth";
import {prisma} from "@/lib/client";
import {CreatePostValidator} from "@/lib/validators";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuth();
    if (!session?.user) {
      return new Response("You are not Signed In.", {status: 401, statusText: "Sign in then try again."});
    }

    const body = await req.json();
    const {title, content, userId} = CreatePostValidator.parse({...body, userId: session.user.id});

    await prisma.post.create({
      data: {
        title,
        content,
        userId: userId!,
      },
    });

    return new Response(title, {status: 200});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid data", {status: 400, statusText: "Your title and post content should be at least 3 characters"});
    }
    return new Response("Something went wrong", {status: 500});
  }
}
