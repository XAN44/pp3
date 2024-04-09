import {Conversation,Message,User, } from '@prisma/client'


export type FullmessageType = Message & {
    sender:User
}

export type FullconversationType = Conversation & {
    User:User[],
    messages:FullmessageType[],
}