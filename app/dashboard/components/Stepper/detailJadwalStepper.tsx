"use client"
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Stepper, StepperItem, useStepper } from '@/components/ui/stepper'
import React from 'react'

interface StepsProps {
    label: string | React.ReactNode
    description?: string | React.ReactNode
    optionalComponent?: string | React.ReactNode
    icon?: React.ReactNode
    optional?: boolean
}

export const DetailJadwalStepper = () => {
    const {
        isDisabledStep,
        status,
        isFinished
    } = useStepper();

    const steps: StepsProps[] = [
        {
            label: "",
            optionalComponent: (
                <Card>
                    <CardContent>
                        Jadwal Seleksi Berkas
                    </CardContent>
                </Card>
            )
        },
        { label: "" },
        { label: "" },
        { label: "" },
        { label: "" },
    ];
    const initialStep = 0;

    return (
        <Stepper
            orientation='vertical'
            steps={steps}
            isClickable={true}
            initialStep={initialStep}
            labelOrientation='vertical'
            status={isFinished ? "default" : "loading"}
        >
            <StepperItem>
                <Card>
                    <CardContent>
                        Jadwal Seleksi Berkas
                    </CardContent>
                </Card>
            </StepperItem>
            <StepperItem />
            <StepperItem />
            <StepperItem />
            <StepperItem />
        </Stepper>
    )
}