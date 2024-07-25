import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import PersonalError from '../personalError';

const Textarea = ({label , name , control , id , className}) => {
    return (
        <div className={className || 'mb-3'}>
            <label htmlFor={id} className='form-label'>{label}</label>
            <FastField className='form-control' component={control} name={name} id={id} />
            <ErrorMessage name={name} component={PersonalError} />
        </div>
    );
}

export default Textarea;
