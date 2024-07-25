import React from 'react';
import PersonalError from '../personalError';
import { ErrorMessage, FastField } from 'formik';

const Input = ({type , label , name , id , className}) => {
    return (
        <div className={className || 'mb-3'}>
            <label htmlFor={id} className='form-label'>{label}</label>
            <FastField className='form-control' name={name} type={type} id={id} />
            <ErrorMessage name={name} component={PersonalError} />
        </div>
    );
}

export default Input;
