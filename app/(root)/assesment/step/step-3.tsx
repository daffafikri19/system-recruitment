import React from 'react'
import { useProfessionContext } from '.';

const Step3 = () => {

    const { selectedProfession } = useProfessionContext() as any;
    console.log('Selected Profession:', selectedProfession);
    
    return (
        <div>
            <h1>Jawaban sudah direkam silahkan tunggu kabar selanjutnya</h1>
        </div>
    )
}

export default Step3