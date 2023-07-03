import {getAuth} from "@/lib/auth";
import {prisma} from "@/lib/client";
import {VoteValidator} from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const session = await getAuth();
    if (!session?.user) {
      return new Response("You are not Signed In.", {status: 401, statusText: "Sign in then try again."});
    }
    const body = await req.json();
    const {userId, postId, type} = VoteValidator.parse({...body, userId: session.user.id!});
    const voteId = {userId: userId!, postId};

    const voteExists = await prisma.vote.findFirst({
      where: {
        userId,
        postId,
        type,
      },
    });

    if (voteExists) {
      await prisma.vote.delete({
        where: {
          voteId,
        },
      });
      return new Response("Successfully Unvoted.", {status: 200});
    }

    await prisma.vote.upsert({
      where: {
        voteId,
      },
      update: {
        type,
      },
      create: {
        userId: userId!,
        postId,
        type,
      },
    });
    return new Response("Success", {status: 200});
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong while voting", {status: 500, statusText: "Sorry there was an error processing your upvote/downvote."});
  }
}
