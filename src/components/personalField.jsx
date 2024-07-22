import React from 'react';

const PersonalField = ({field, form , meta}) => {
    return (
        <>
            <input type="password" className='form-control' id="password" {...field} /> 
            {meta.touched && meta.error ?
                <small className='text-end mt-1 pe-1 d-block text-danger'>
                    {meta.error}
                </small>
            : null}
        </>
    )
}

export default PersonalField;
