import NextAuth from "next-auth";

declare module "next-auth" {

    interface User {
        id?: any
        name?: any
        email?: any
        role?: any
        profession?: any
        foto_profile?: any
        isNewUser?: any
        no_pendaftaran?: any
    }

    interface Session {
        user: User & {
            id?: any
            name?: any
            email?: any
            role?: any
            profession?: any
            foto_profile?: any
            isNewUser?: any
            no_pendaftaran?: any
        }
        token: {
            id?: any
            name?: any
            email?: any
            role?: any
            profession?: any
            foto_profile?: any
            isNewUser?: any
            no_pendaftaran?: any
        }
    }
}