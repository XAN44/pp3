import { getCurrentUser } from '@/lib/session'
import exp from 'constants'
import { NextResponse } from 'next/server'
import { UTApi } from 'uploadthing/server'
const utapi = new UTApi()

export async function POST(req: Request) {
  const { imageKey } = await req.json()
  try {
    const res = await utapi.deleteFiles(imageKey)
    return NextResponse.json(res)
  } catch (error) {
    return new NextResponse('error', { status: 500 })
  }
}
