import { prisma } from "@/lib/client";
import { GetPostsValidator } from "@/lib/validators";

export async function GET(){
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      include: {
        author: true
      }
    })
    
    const validatedPosts = GetPostsValidator.parse(posts)
    
    return new Response(JSON.stringify(validatedPosts))
  } catch (error) {
    console.error(error)
    return new Response("Something went wrong", {status: 500})
  }
}