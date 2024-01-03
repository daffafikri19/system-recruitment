import React from 'react'
import ContextPsikotest from './context-wrapper'
import { VerbalTes } from './verbal'
import { InformasiTesCard } from './informasi-tes'

const PsikotestPage = () => {
  return (
    <ContextPsikotest>
      <InformasiTesCard />
    </ContextPsikotest>
  )
}

export default PsikotestPage