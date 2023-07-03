import { prisma } from "@/lib/client";

export async function GET(req:Request, {params}: {params: {id: string}}){
  try {
    const id = params.id
    const comments = await prisma.comment.findMany({
      where:{
        postId: id
      },
      include: {
        author: {
          select: {
            image: true,
            name: true
          }
        }
      }
    })

    return new Response(JSON.stringify(comments), {status: 200})
  } catch (error) {
    console.error(error)
    return new Response("Something went wrong.", {status: 500, statusText: "Please try again or report this issue."})
  }
}