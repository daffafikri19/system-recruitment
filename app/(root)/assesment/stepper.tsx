"use client"
import React, { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Box from '@mui/material/Box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { questionBank } from '@/constants/question-bank';

const steps = [
    { label: 'kategori organisasi', component: Step1 },
    { label: 'pertanyaan', component: Step2 },
    { label: 'selesai', component: Step3 },
];


// Komponen untuk Langkah 1
function Step1({ onNext }: { onNext?: any }) {
    
    const [value, setValue] = useState('');
    const handleNextStep = () => {
        if (value.trim() === '') {
            alert('Harap isi nilai pada langkah ini sebelum melanjutkan.');
        } else {
            onNext(value); // Meneruskan nilai ke fungsi onNext
        }
    };

    return (
        <Card className='w-full'>
            <CardContent className='p-4'>
                <RadioGroup defaultValue={value} onValueChange={(e) => setValue(e)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Kepala Dinas, Sekretaris, Kepala Bidang" id="r1" />
                        <h1>Kepala Dinas, Sekretaris, Kepala Bidang</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tenaga ahli" id="r2" />
                        <h1>Tenaga Ahli</h1>
                    </div>
                </RadioGroup>
            </CardContent>
        </Card>
    );
}

// Komponen untuk Langkah 2
function Step2({ valueFromStep1 }: { valueFromStep1?: string }) {
    return (
        <div className='w-full mb-20'>
            {/* card question */}
            {questionBank.map((item, index: number) => (
                <Card className='w-full' key={item.id}>
                    <CardHeader>
                        <CardDescription>
                            {index + 1}. {item.question}
                        </CardDescription>
                    </CardHeader>
                    {/* <CardContent>
                    </CardContent> */}
                    <CardFooter className='w-full flex items-start flex-col'>
                        <Label>jawaban anda</Label>
                        <Textarea className='mt-2' required={item.required} />
                    </CardFooter>
                </Card>
            ))}

        </div>
    );
}

// Komponen untuk Langkah 3
function Step3({ valueFromStep1 }: { valueFromStep1?: string }) {
    return (
        <div>
            <h1>Jawaban sudah direkam silahkan tunggu kabar selanjutnya</h1>
        </div>
    );
}

export const StepperAssesment = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
    const [showDialog, setShowDialog] = useState(false);
    const [valueFromStep1, setValueFromStep1] = useState('');
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

    const getStepComponent = () => {
        const CurrentStepComponent = steps[activeStep].component;

        if (activeStep === 0) {
            return <CurrentStepComponent onNext={setValueFromStep1} />;
        } else if (activeStep === 1) {
            return <CurrentStepComponent valueFromStep1={valueFromStep1} />;
        } else {
            return <CurrentStepComponent />;
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(({ label }, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            <div className='w-full'>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <h1>All steps completed - you&apos;re finished</h1>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <div className='mt-10 relative'>
                        <div className='w-full px-3 md:px-6'>
                            <div className='w-full'>
                                <div className='w-full flex items-center justify-start px-4'>
                                    {getStepComponent()}
                                </div>
                            </div>
                        </div>
                        <div className='w-full mb-5 px-8 md:px-10 fixed bottom-0 flex items-center'>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="outline">
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} className='text-white'>
                                {isLastStep() ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
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
        </Box>
    )
}