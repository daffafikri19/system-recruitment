import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import prisma from "@/lib/utils/prisma"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'example@gmail.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, request) {
                if (!credentials?.email || !credentials?.password) {
                    console.log("no credentials provided")
                    return null
                }
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });
                if (!existingUser) {
                    console.log("no email was found")
                    return null
                };
            
                const comparePassword = await bcrypt.compare(credentials.password, existingUser.password);
                if (!comparePassword) {
                    console.log("invalid password")
                    return null
                };

                return {
                    id: existingUser.id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role,
                    foto_profile: existingUser.foto_profile,
                    profession: existingUser.profession
                }
            }
        }),
        EmailProvider({
            secret: process.env.NEXTAUTH_SECRET,
            server: process.env.SMTP_SERVER!,
            from: process.env.SMTP_LOGIN,
            maxAge: 2 * 60 * 60, // email are valid for 2 hour before authenticated
        })
    ],
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    profession: user.profession,
                    foto_profile: user.foto_profile
                }
            }
            return token
        },
        async session({ session, token }) {
            const context = {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    email: token.email,
                    role: token.role,
                    profession: token.profession,
                    foto_profile: token.foto_profile
                }
            }
            return context
        }
    }
}
