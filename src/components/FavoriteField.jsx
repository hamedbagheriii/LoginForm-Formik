import { ErrorMessage, FastField, Field } from 'formik';
import React from 'react';
import PersonalError from './personalError';

const FavoriteField = (props) => {
    const {form , remove , push} = props;
    const {favorits} = form.values;

    return(
        <>
            <div className="btn btn-sm btn-primary me-2" onClick={()=>push('')}>
                <i className="fas fa-plus mt-1 mx-1"></i>
            </div>
            {favorits.map((f,i)=>(
                <div key={i} className='mt-2 '>
                    <div className='d-flex'>
                        <FastField type='text' className='form-control w-100' name={`favorits[${i}]`} />
                        {favorits.length > 1  ?
                            <div className="btn btn-sm btn-danger me-2" onClick={()=>remove(i)}>
                                <i className="fas fa-minus mt-2 mx-1"></i>
                            </div>
                        : null }
                    </div>
                    <ErrorMessage component={PersonalError}  name={`favorits[${i}]`} />
                </div>
            ))}
        </>
    )
}

export default FavoriteField;
