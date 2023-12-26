"use client"
import React, { useState } from 'react';
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
import Step4 from './step/step-4';
import Step5 from './step/step-5';
import { useDataDiriStepContext } from './step';
import { BookAIcon, BookIcon, Briefcase, User2Icon, UsersIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const steps = [
    { label: 'DATA DIRI', component: <Step1 />, logo: <User2Icon /> },
    { label: 'PENDIDIKAN', component: <Step2 />, logo: <BookAIcon /> },
    { label: 'KELUARGA', component: <Step3 />, logo: <UsersIcon /> },
    { label: 'PEKERJAAN', component: <Step4 />, logo: <Briefcase /> },
    { label: 'SERTIFIKAT', component: <Step5 />, logo: <BookIcon /> },
];

export const StepperAssesment = () => {
    const router = useRouter();
    const { submittedStep1, setSubmittedStep1 } = useDataDiriStepContext();
    const { submittedStep2, setSubmittedStep2 } = useDataDiriStepContext();
    const { username } = useDataDiriStepContext();
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

    const handleSubmitGenerateIdPendaftaran = async () => {
        try {
            const response = await axios.post('/api/pendaftaran/create', {
                username: username
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(response.data)
            router.push('/dashboard')
        } catch (error : any) {
            if(error) {
                toast({
                    title: error.message,
                    description: error.response.data.message,
                    variant: 'destructive'
                });
            }
        }
    }

    return (
        <div className='w-full h-full bg-primary/5 rounded-lg'>
            <Stepper activeStep={activeStep} alternativeLabel className='h-full flex items-center rounded-md pt-5 pb-2 w-full overflow-x-scroll flex-1 min-w-[100px] max-w-full overflow-y-hidden whitespace-nowrap'>
                {steps.map((item, index : number) => ( 
                    <Step key={item.label} completed={completed[index]}>
                        <StepButton className='' onClick={handleStep(index)}>
                            <p className='text-muted-foreground text-sm font-bold'>{item.label}</p>
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
                                            ) : activeStep === 2 ? (
                                                <Step3 />
                                            ) : activeStep === 3 ? (
                                                <Step4 />
                                            ) : activeStep === 4 && (
                                                <Step5 />
                                            )}        
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center w-full justify-between px-4 mt-10 mb-10'>
                                <Button
                                    disabled={activeStep === 0}
                                    className='px-10'
                                    onClick={handleBack}
                                    variant="outline">
                                        
                                    Kembali
                                </Button>
                               
                                <Button onClick={handleNext} className='text-white px-10'>
                                    {isLastStep() ? 'Selesai' : 'Lanjutkan'}
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah semua data sudah benar ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmitGenerateIdPendaftaran}>Lanjutkan</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}