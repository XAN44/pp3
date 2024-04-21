import { Article, ArticleTag, User, Visit } from "@prisma/client";


export type Allevent = Article & {
    author: User | null
    tag:ArticleTag[]
    Visit:Visit []
}
