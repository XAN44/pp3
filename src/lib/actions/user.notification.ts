import { text } from 'body-parser';
'use server'

import { revalidatePath } from "next/cache"
import { db } from "../db"
import { getCurrentUser } from '../session';



export async function Notification(userId:string,postId:string,body:string,path:string) {
    try {

        const user = await getCurrentUser()
        if(!user?.id){
        throw new Error("Not have account ")
    }

        const newNoti = await db.notification.create({
            data: {
                body,
                userId,
                postId,
                current:user.name
            },
            include:{
                user:{
                    select:{
                        name:true
                    }
                },
                post:{
                    select:{
                        content:true
                    }
                }
              
            }
        })
        
        revalidatePath(path)
        console.log(`ผู้ใช้ ${user.name} ได้แสดงความคิดเห็นในโพสต์ ${newNoti.post?.content} ของ ${newNoti.user?.name} ด้วยข้อความ ${body}`, 
        )
        

        
    }  catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }

}


export async function GetNotification(accountId: string ) {
  try {
    console.log("Fetching notifications for accountId:", accountId);
    const getNoti = await db.notification.findMany({
      where: {
        userId: accountId,
    },
       include:{
        comment:{
            select:{
                text:true
            }
        },
        post:{
            select:{
                content:true
            }
        },
        user:{
            select:{
                name:true
            }
        }
    }
    });
    console.log("Fetched notifications:", getNoti);
    return getNoti;
  } catch (error:any) {
    console.error(`Error fetching notifications: ${error.message}`);
    throw new Error("Failed to fetch notifications");
  }
}