import {authOptions} from "@/lib/auth";
import {prisma} from "@/lib/client";
import {CreateQuestionValidator} from "@/lib/validators";
import {getServerSession} from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new Response("You are not Signed In.", {status: 401, statusText: "Sign in then try again."});
    }

    const body = await req.json();
    const {content, userId} = CreateQuestionValidator.parse({...body, userId: session.user.id});
    

    const questionExists = await prisma.question.findFirst({
      where: {
        content,
      },
    });
    if (questionExists) {
      return new Response("This question has been asked already.", {
        status: 400,
        statusText: "Search up the question and find out more there!",
      });
    }

    await prisma.question.create({
      data: {
        content,
        userId: userId!,
      },
    });
    return new Response("Success", {status: 200});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("invalid data", {
        status: 400,
        statusText: "Your question must contain at least 3 characters",
      });
    }
    return new Response("Something went wrong", {status: 500});
  }
}
