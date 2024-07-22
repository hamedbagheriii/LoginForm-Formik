import React from 'react';

const PersonalError = ({children}) => {
    return (
        <small className='d-block text-end pe-1 mt-1 text-danger'>
            {children}
        </small>
    );
}

export default PersonalError;
