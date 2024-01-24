'use server'

import { revalidatePath } from "next/cache"
import { db } from "../db"



export async function Notification(userId:string,postId:string,body:string,path:string) {
    try {
    
        if(!userId){
        throw new Error("Not have account ")
    }

        const newNoti = await db.notification.create({
            data: {
                body,
                userId,
                postId,
            }
        })
        revalidatePath(path)
    }  catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }

}

export async function GetNotification(accountId:string) {
    try {

        if(!accountId){
        throw new Error("Cannot account")
        }else{
            await db.notification.findFirst({
                where:{
                    userId:accountId
                }
            })
        }

    } catch (error) {
        
    }
}