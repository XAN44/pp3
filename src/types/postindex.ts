import { Post, User } from "@prisma/client";

export type DataPost = Post & {
   author: User
}