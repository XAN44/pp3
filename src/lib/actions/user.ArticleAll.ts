import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { getCurrentUser } from '../session'

export async function getArticleAllTarvel() {
  try {
    const user = await getCurrentUser()
    if (!user?.id) {
      return []
    }

    const userJoin = await db.article.findMany({
      where: {
        tag: {
          some:{
            tag:'ท่องเที่ยว'
          }
        }
      },
      include: {
        tag: true,
        author: true,
        Visit:true
      }
    })
    revalidatePath('/')
    return userJoin
  } catch (error) {}
}

export async function getArticleAllResident() {
  try {
    const user = await getCurrentUser()
    if (!user?.id) {
      return []
    }

    const userJoin = await db.article.findMany({
      where: {
        tag: {
          some:{
            tag:'ชุมชน'
          }
        }
      },
      include: {
        tag: true,
        author: true,
        Visit:true
      }
    })
    revalidatePath('/')
    return userJoin
  } catch (error) {}
}

export async function getArticleAllBusines() {
  try {
    const user = await getCurrentUser()
    if (!user?.id) {
      return []
    }

    const userJoin = await db.article.findMany({
      where: {
        tag: {
          some:{
            tag:'ธุรกิจ'
          }
        }
      },
      include: {
        tag: true,
        author: true,
        Visit:true
      }
    })
    revalidatePath('/')
    return userJoin
  } catch (error) {}
}
