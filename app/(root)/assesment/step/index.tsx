"use client"
import { toast } from '@/components/ui/use-toast';
import React, { createContext, useContext, useState } from 'react';

interface professionType {
  selectedProfession: string;
  setSelectedProfession: React.Dispatch<React.SetStateAction<string>>;
  isRadioSelected: boolean;
  setIsRadioSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const professionContext = createContext<professionType | undefined>(undefined);

export const StepWrapper = ({ children }: { children: React.ReactNode }) => {
  const [selectedProfession, setSelectedProfession] = useState("");
  const [isRadioSelected, setIsRadioSelected] = useState(false);

  return (
    <professionContext.Provider value={{ selectedProfession, setSelectedProfession, isRadioSelected, setIsRadioSelected }}>
      {children}
    </professionContext.Provider>
  );
};

export const useProfessionContext = () => {
  const context = useContext(professionContext);
  if (!context) {
    toast({
      title: 'harap tentukan pilihan'
    })
  }
  return context;
};
