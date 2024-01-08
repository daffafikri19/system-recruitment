import React from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/providers/auth"
import { TabBox } from "./tabs/tab-box"

const BiodataPage = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div>
            <TabBox name={session?.user.name} email={session?.user.email} id={session?.user.id} />
        </div>
    )
}

export default BiodataPage;