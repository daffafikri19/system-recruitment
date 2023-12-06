"use client"
import React, { useEffect, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Box from '@mui/material/Box';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Step1 from './step/step-1';
import Step2 from './step/step-2';
import Step3 from './step/step-3';
import { StepWrapper } from './step';
import { useProfessionContext } from './step';

export const steps = [
    { label: 'profesi', component: <Step1 /> },
    { label: 'Pertanyaan', component: <Step2 /> },
    { label: 'Selesai', component: <Step3 /> },
];

export const StepperAssesment = () => {
    const { selectedProfession } = useProfessionContext()!;
    const { isRadioSelected } = useProfessionContext() || {};

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
    const [showDialog, setShowDialog] = useState(false);
    const totalSteps = steps.length;

    const isLastStep = () => activeStep === totalSteps - 1;
    const allStepsCompleted = () => Object.keys(completed).length === totalSteps;



    const handleNext = () => {
        const newActiveStep = isLastStep() && !allStepsCompleted()
            ? steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;

        if (isLastStep()) {
            console.log('All steps are finished!');
            setShowDialog(true);
        } else {
            setActiveStep(newActiveStep);
        }
    };

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleStep = (step: any) => () => setActiveStep(step);

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <div className='w-full h-screen flex-1 bg-primary/5'>
            <Stepper activeStep={activeStep} alternativeLabel className='rounded-md pt-5'>
                {steps.map(({ label }, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton className='rounded-non' color="" onClick={handleStep(index)}>
                            <p className='text-muted-foreground text-sm font-bold'>{label}</p>
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            <div className='w-full relative'>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <h1>All steps completed - you&apos;re finished</h1>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <>
                        <div className='h-full mt-10 relative flex flex-col items-center justify-between'>
                            <div className='w-full px-3 md:px-6'>
                                <div className='w-full'>
                                    <div className='w-full flex items-center justify-start px-4'>
                                    
                                            {activeStep === 0 ? (
                                                <Step1 />
                                            ) : activeStep === 1 ? (
                                                <Step2 />
                                            ) : activeStep === 2 && (
                                                <Step3 />
                                            )}
                                    
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center w-full justify-between mt-10 px-5'>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="outline">
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext} className='text-white' disabled={!isRadioSelected}>
                                    {isLastStep() ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleReset}>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}