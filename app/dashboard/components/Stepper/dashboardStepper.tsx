"use client"
import { Badge } from '@/components/ui/badge'
import { Stepper, StepperItem, useStepper } from '@/components/ui/stepper'
import React from 'react'

interface StepsProps {
    label: string | React.ReactNode
    description?: string | React.ReactNode
    optionalComponent?: string | React.ReactNode
    icon?: React.ReactNode
    optional?: boolean
}

export const DashboardStepper = () => {
    const {
        isDisabledStep,
        status,
        isFinished
    } = useStepper();

    const steps: StepsProps[] = [
        { label: "Kelengkapan Biodata & Berkas" },
        { label: "Tes Online Psikotes" },
        { label: "Tes Online Bahasa Inggris" },
        { label: "Review Berkas" },
        { label: "Hasil Akhir" },
    ];
    const initialStep = 0;

    return (
        <Stepper
            steps={steps}
            isClickable={true}
            initialStep={initialStep}
            labelOrientation='vertical'
            status={isFinished ? "default" : "loading"}
        >
            <StepperItem />
            <StepperItem />
            <StepperItem />
            <StepperItem />
            <StepperItem />
        </Stepper>
    )
}