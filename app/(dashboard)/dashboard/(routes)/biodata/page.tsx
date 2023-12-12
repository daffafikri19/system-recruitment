import React from 'react'
import { StepperAssesment } from './stepper'
import { StepWrapper } from './step'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/providers/auth'

const AssesmentPage = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        console.log(session)
        return (
            <div className="w-full h-full">
                <StepWrapper>
                    <StepperAssesment />
                </StepWrapper>
            </div>
        )
    }

    return window.location.href = "/signin"
}

export default AssesmentPage