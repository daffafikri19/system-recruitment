import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User } from 'lucide-react';
import React, { useState } from 'react';
import { useProfessionContext } from '.';

const ProfessionList = [
  {
    label: 'Kepala Dinas',
    value: 'Kepala Dinas',
    id: 'kepala-dinas',
    icon: <User />,
  },
  {
    label: 'Sekretaris',
    value: 'Sekretaris',
    id: 'sektretaris',
    icon: <User />,
  },
  {
    label: 'Kepala Bidang',
    value: 'Kepala Bidang',
    id: 'kepala-bidang',
    icon: <User />,
  },
  {
    label: 'Tenaga Ahli',
    value: 'Tenaga Ahli',
    id: 'tenaga-ahli',
    icon: <User />,
  },
];

const Step1 = () => {
  const { selectedProfession, setSelectedProfession, setIsRadioSelected, isRadioSelected } = useProfessionContext()!;

  return (
    <Card className='w-full'>
      <CardContent className='p-4'>
        <RadioGroup
          defaultValue=''
          onValueChange={(e) => {
            setSelectedProfession(e)
            setIsRadioSelected(true);
          }}
          className='grid grid-cols-2 gap-4 text-center'
        >
          {ProfessionList.map((data) => (
            <div key={data.id} className='space-y-2'>
              <RadioGroupItem value={data.value} id={data.id}  className='peer sr-only' />
              <Label
                htmlFor={data.id}
                className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${
                  selectedProfession === data.value ? 'border-primary' : ''
                } [&:has([data-state=checked])]:border-primary`}
              >
                {data.icon}
                <p>{data.label}</p>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default Step1;
