import { db } from '@/lib/db'
import { getIconCode } from 'next/dist/compiled/@vercel/og/emoji'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '../../../lib/session'

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user?.id) {
    return NextResponse.json({ message: 'Plse login' })
  }
  try {
    const topArticle = await db.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        Visit: true,
      },
      take: 3,
      orderBy: {
        Visit: {
          _count: 'desc',
        },
      },
    })
    return NextResponse.json(topArticle)
  } catch (error) {
    return NextResponse.json(
      { message: 'มีข้อผิดพลาดบางอย่าง' },
      { status: 500 }
    )
  }
}
