'use server'
import { revalidatePath } from "next/cache";
import { db } from "../db";

export async function Visit(userId:string,pageId:string,path:string) {

    try {

   const visit = await db.visit.upsert({
            where: {
             id:pageId
            },
            update: {
                count: { increment: 1 }
            },
            create: {
                pageId,
                userId,
                count: 1
            },
        });
        revalidatePath(path)
        return true
    } catch (error) {
        console.log(error)
        throw new Error("Can not visit")
        
    }

}


export async function VisitArticle(userId:string,articleId:string,path:string) {

    try {

   const visit = await db.visit.upsert({
            where: {
             id:articleId
            },
            update: {
                count: { increment: 1 }
            },
            create: {
                articleId,
                userId,
                count: 1
            },
        });
        revalidatePath(path)
        return true
    } catch (error) {
        console.log(error)
        throw new Error("Can not visit")
        
    }

}


export async function TotalVisit(pageId:string) {
    try {
        const totalVisit = await db.visit.count({
            where:{
                pageId,
            }
        })
        return totalVisit
    } catch (error) {
        throw new Error("can not get count of like")
        
    }
}

export async function TotalVisit1(articleId:string) {
    try {
        const totalVisit = await db.visit.count({
            where:{
                articleId,
            }
        })
        return totalVisit
    } catch (error) {
        throw new Error("can not get count of like")
        
    }
}