import {authOptions} from "@/lib/auth";
import {prisma} from "@/lib/client";
import {CreateSpaceValidator} from "@/lib/validators";
import {getServerSession} from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new Response("You are not Signed In.", {status: 401, statusText: "Sign in then try again."});
    }

    const body = await req.json();
    const {name, desc, userId} = CreateSpaceValidator.parse({...body, userId: session.user.id});

    const spaceExists = await prisma.space.findFirst({
      where: {name},
    });
    if (spaceExists) {
      return new Response("This Name has already been taken.", {status: 400, statusText: "Try using a different name."});
    }

    await prisma.space.create({
      data: {
        name,
        description: desc,
        userId: userId!,
      },
    });
    
    return new Response(name, {status: 200})
  } catch (error) {
    if(error instanceof z.ZodError){
      return new Response(error.message, {status: 400})
    }
    return new Response("Something went wrong", {status: 500 })
  }
}
