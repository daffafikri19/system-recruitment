"use client"
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { toast } from '@/components/ui/use-toast';

interface DataDiriContext {
  submittedStep1: boolean;
  setSubmittedStep1: Dispatch<SetStateAction<boolean>>;
  submittedStep2: boolean;
  setSubmittedStep2: Dispatch<SetStateAction<boolean>>;
  submittedStep3: boolean;
  setSubmittedStep3: Dispatch<SetStateAction<boolean>>;
  submittedStep4: boolean;
  setSubmittedStep4: Dispatch<SetStateAction<boolean>>;
  submittedStep5: boolean;
  setSubmittedStep5: Dispatch<SetStateAction<boolean>>;
  sessionUserId: string;
  setSessionUserId: Dispatch<SetStateAction<string>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

const DataDiriContext = createContext<DataDiriContext | undefined>(undefined);

interface StepWrapperProps {
  children: ReactNode;
  sessionId: string;
  sessionUsername: string;
}

export const StepWrapper: React.FC<StepWrapperProps> = ({ children, sessionId, sessionUsername }) => {
  const [submittedStep1, setSubmittedStep1] = useState<boolean>(true);
  const [submittedStep2, setSubmittedStep2] = useState<boolean>(true);
  const [submittedStep3, setSubmittedStep3] = useState<boolean>(true);
  const [submittedStep4, setSubmittedStep4] = useState<boolean>(true);
  const [submittedStep5, setSubmittedStep5] = useState<boolean>(true);
  const [sessionUserId, setSessionUserId] = useState<string>(sessionId);
  const [ username, setUsername] = useState<string>(sessionUsername);

  return (
    <DataDiriContext.Provider value={{
      setSubmittedStep1,
      setSubmittedStep2,
      setSubmittedStep3,
      setSubmittedStep4,
      setSubmittedStep5,
      submittedStep1,
      submittedStep2,
      submittedStep3,
      submittedStep4,
      submittedStep5,
      sessionUserId,
      setSessionUserId,
      username,
      setUsername
    }}>
      {children}
    </DataDiriContext.Provider>
  );
};

export const useDataDiriStepContext = (): DataDiriContext => {
  const context = useContext(DataDiriContext);
  if (!context) {
    toast({
      title: 'harap isi formulir yang dibutuhkan'
    });
  }
  return context as DataDiriContext;
};
