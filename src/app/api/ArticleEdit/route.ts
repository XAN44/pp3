import { SessionProvider } from 'next-auth/react';
import { db } from "../../../lib/db";
import { getCurrentUser } from "../../../lib/session";
import { NextResponse } from 'next/server';

import parse from 'html-react-parser'

export async function PUT(request:Request) {
    try {
        const user= await getCurrentUser()
        const body = await request.json()
        const { id,title,articleContent } = body
        
    
 
        const findArticle = await db.article.findFirst({
            where:{
                id
            },
            select:{
                authorId:true,
                id:true
            }
        })
        const authorId = findArticle?.authorId
        if(findArticle && user?.id === authorId){
            await db.article.update({
                where:{
                    id:findArticle.id
                },
                data:{
                    title,
                    articleContent
                }
            })
        }
        return NextResponse.json(findArticle)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}