import React from 'react'
import { StepperAssesment } from './stepper'
import { Navbar } from '@/components/navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/providers/auth'
import { StepWrapper } from './step'

const AssesmentPage = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        return (
            <div className="w-full h-full">
                <Navbar />
                <div>
                    <StepWrapper>
                        <StepperAssesment />
                    </StepWrapper>
                </div>
            </div>
        )
    }

    return window.location.href = "/signin"
}

export default AssesmentPage