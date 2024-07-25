import React from 'react';
import PersonalError from '../personalError';
import { ErrorMessage, FastField } from 'formik';

const Select = ({label , name , id , option}) => {
    return (
        <div className={'mb-3'}>
            <label htmlFor={id} className='form-label'>{label}</label>
            <FastField as='select' className='form-control' name={name} id={id} >
                {
                    option.map(i=>(
                        <option key={i.id} value={i.id}>{i.value}</option>
                    ))
                }
            </FastField>
            <ErrorMessage name={name} component={PersonalError} />
        </div>
    );
}

export default Select;
