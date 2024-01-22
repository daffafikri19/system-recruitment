import React from 'react'
import ContextPsikotest from './context-wrapper'
import { VerbalTes } from './verbal'

const PsikotestPage = () => {
  return (
    <ContextPsikotest>
      <VerbalTes />
    </ContextPsikotest>
  )
}

export default PsikotestPage