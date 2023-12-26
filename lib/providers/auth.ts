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
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });
                if (!user) {
                    console.log("no email was found")
                    return null
                };
            
                const comparePassword = await bcrypt.compare(credentials.password, user.password);
                if (!comparePassword) {
                    console.log("invalid password")
                    return null
                };

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    foto_profile: user.foto_profile,
                    profession: user.profession,
                    isNewUser: user.isNewUser,
                    no_pendaftaran: user.no_pendaftaran
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
        signIn: '/signin'
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
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    profession: user.profession,
                    foto_profile: user.foto_profile,
                    isNewUser: user.isNewUser,
                    no_pendaftaran: user.no_pendaftaran
                }
            }
            return token
        },
        async session({ session, token }) {
            const context = {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    role: token.role,
                    profession: token.profession,
                    foto_profile: token.foto_profile,
                    isNewUser: token.isNewUser,
                    no_pendaftaran: token.no_pendaftaran
                }
            }
            return context
        }
    }
}
