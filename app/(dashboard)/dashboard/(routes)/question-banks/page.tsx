import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { QuestionDataTable } from './question-data'
import { Actions } from './actions'

const QuestionBankPage = () => {
    return (
        <>
            <Breadcrumb pageName="question-banks" />
            <Actions />
            <div className='mt-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark '>
                <QuestionDataTable />
            </div>
        </>
    )
}

export default QuestionBankPage