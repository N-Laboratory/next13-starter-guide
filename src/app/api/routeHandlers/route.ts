import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const userSchema = z.object({
  postId: z.string(),
})

type TestResponse = {
  userId: string
  id: string
  title: string
  body: string
}

type RouteHandlerRequest = {
  postId: string
}

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as RouteHandlerRequest
    const result = userSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({}, { status: 400 })
    }

    const postId = result.data.postId.trim()
    const post = (await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) =>
      res.json(),
    )) as TestResponse
    if (!post || Object.keys(post).length === 0) {
      return NextResponse.json({}, { status: 500 })
    }

    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    return NextResponse.json({}, { status: 500 })
  }
}
