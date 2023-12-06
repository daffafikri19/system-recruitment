import React from 'react'
import { StepperAssesment } from './stepper'
import { Navbar } from '@/components/navbar'
import { StepWrapper } from './step'


const AssesmentPage = () => {
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

export default AssesmentPage