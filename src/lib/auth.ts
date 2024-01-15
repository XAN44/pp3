import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "xa@gmail.com  " },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            password: true,
            bio: true,
            nickname: true,
          },
        });
        if (!existingUser) {
          return null;
        }
        if (existingUser.password) {
          const passwordMatch = await compare(
            credentials.password,
            existingUser.password,
          );
          if (!passwordMatch) {
            return null;
          }
        }
        const userProfileImage = existingUser.image;
        const userBio = existingUser.bio;
        const userNickname = existingUser.nickname;

        return {
          id: `${existingUser.id}`,
          name: existingUser.name,
          email: existingUser.email,
          image: userProfileImage,
          bio: userBio,
          nickname: userNickname,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.bio) {
        token.bio = session.bio;
      }

      if (trigger === "update" && session?.image) {
        token.picture = session.image;
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      if (trigger === "update" && session?.nickname) {
        token.nickname = session.nickname;
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          image: user.image,
          bio: user.bio,
          nickname: user.nickname,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          image: token.picture,
          bio: token.bio,
          nickname: token.nickname,
        },
      };
    },
  },
};
