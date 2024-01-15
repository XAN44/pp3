import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string | null;
    bio: string | null;
    image: string | null;
    nickname: string | null;
  }
  interface Session {
    user: User & {
      image: string;
      bio: string;
      nickname: string;
      name: string;
    };
    token: {
      name: string;
      bio: string;
      image: string;
      nickname: string;
    };
  }
}
