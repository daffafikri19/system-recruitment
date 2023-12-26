import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

export const useSession = async () => {
    const session = await getServerSession(authOptions);

    return {
        id: session?.user.id,
        name: session?.user.name,
        email: session?.user.email
    }
}   