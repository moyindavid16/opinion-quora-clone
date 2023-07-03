import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { CreateCommentValidator, CreatePostValidator } from "@/lib/validators";
import { z } from "zod";

export async function POST(req: Request){
  try {
    const session = await getAuth();
    if (!session?.user) {
      return new Response("You are not Signed In.", {status: 401, statusText: "Sign in then try again."});
    }

    const body = await req.json();
    const {content, userId, postId} = CreateCommentValidator.parse({...body, userId: session.user.id});

    await prisma.comment.create({
      data: {
        userId: userId!,
        content,
        postId
      }
    })
    return new Response("Success", {status: 200})
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid data", {status: 400, statusText: "Your comment should contain at least 3 characters"});
    }
    return new Response("Something went wrong.", {status: 500, statusText: "Please try again or report this issue."})
  }
}