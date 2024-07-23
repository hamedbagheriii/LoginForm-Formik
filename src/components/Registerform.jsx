import { ErrorMessage, FastField, Field, FieldArray, Form, Formik, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup'
import PersonalError from './personalError';
import FavoriteField from './FavoriteField';

const initialValues = {
    name : '',
    email : '',
    password : '',
    password2 : '',
    bio : '',
    address : {
        city : '',
        postalCode : ''
    },
    phone : ['',''],
    favorits : ['']
}

const onSubmit = (values , submitProps)=>{
    console.log(values);

    setTimeout(() => {
        submitProps.setSubmitting(false);
        submitProps.resetForm(initialValues)
    }, 3000);
}

const validationSchema = Yup.object({
    name:Yup.string().required('لطفا مقداری بنویسید .'),
    bio:Yup.string().required('لطفا مقداری بنویسید .'),
    email:Yup.string().required('لطفا مقداری بنویسید .').email('لطفا یک ایمیل صحیح وارد کنید .'),
    password:Yup.string().required('لطفا مقداری بنویسید .').min(5,'تعداد کاراکتر کم است .'),
    password2:Yup.string().required('لطفا مقداری بنویسید .').oneOf([Yup.ref('password'),null],'پسورد ها برابر نیستند .'),
    address : Yup.object({
        city : Yup.string().required('لطفا مقداری بنویسید .'),
        postalCode : Yup.string().required('لطفا مقداری بنویسید .'),
    }),
    phone : Yup.array().of(Yup.string().required('لطفا مقداری بنویسید .')),
    favorits : Yup.array().of(Yup.string().required('لطفا مقداری بنویسید .'))
    
})



const Registerform = () => {
    
    const attrs = (targetValue,targetType)=>{
        return ({
            name:targetValue,
            type: targetType,
            id:targetValue,
            className:'form-control',
        })
    }



    return (    
        <Formik 
         initialValues={initialValues} 
         validationSchema={validationSchema} 
         onSubmit={onSubmit} 
         validateOnMount
        >
            
            {formik=>{
                console.log(formik);
                return(
                    <div className='auth_container container-fluid d-flex justify-content-center align-items-center w-100 h-100-vh p-0'>
                        <div className="row w-100 justify-content-center align-items-center">
                            <div className='border border-primary border-2 bg-dark text-white rounded-3 py-4 mt-3 col-11 col-md-8 col-lg-6 col-xl-4 py-2 px-3'>
                                <Form className='row'>
                                    <h1 className='text-center'>
                                        <i className='fas fa-user-plus text-primary'></i>
                                    </h1>
                                    <div className="mb-3">
                                        <label htmlFor="name" className='form-label'>نام</label>
                                        <FastField {...attrs('name','text')} id='name' />
                                        <ErrorMessage name='name' component={PersonalError} />                       
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className='form-label'>ایمیل</label>
                                        <FastField {...attrs('email','email')} id='email' />
                                        <ErrorMessage name='email' component={PersonalError} /> 
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className='form-label'>رمز عبور</label>
                                        <FastField {...attrs('password','password')} id='password' />
                                        <ErrorMessage name='password' component={PersonalError} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password2" className='form-label'>تکرار رمز عبور</label>
                                        <FastField {...attrs('password2','password')} id='password2'  />
                                        <ErrorMessage name='password2' component={PersonalError} />                        
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password2" className='form-label'>بیوگرافی</label>
                                        <FastField {...attrs('bio','text')} id='bio' component='textarea' />
                                        <ErrorMessage name='bio' component={PersonalError} />                        
                                    </div>

                                    <div className="col-6">
                                        <label htmlFor="city" className='form-label'>شهر</label>
                                        <FastField {...attrs('address.city','text')} id='city' />
                                        <ErrorMessage name='address.city' component={PersonalError} />                        
                                    </div>
                                    <div className="col-6 mb-4">
                                        <label htmlFor="postalCode" className='form-label'>کد پستی</label>
                                        <FastField {...attrs('address.postalCode','number')} id='postalCode' />
                                        <ErrorMessage name='address.postalCode' component={PersonalError} />                        
                                    </div>

                                    <div className="col-6">
                                        <label htmlFor="mobilePhone" className='form-label'>شماره موبایل</label>
                                        <FastField {...attrs('phone[0]','number')} id='mobilePhone' />
                                        <ErrorMessage name='phone[0]' component={PersonalError} />                        
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label htmlFor="telePhone" className='form-label'>تلفن ثابت</label>
                                        <FastField {...attrs('phone[1]','number')} id='telePhone' />
                                        <ErrorMessage name='phone[1]' component={PersonalError} />                        
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="favorits" className='form-label'>علاقه مندی </label>
                                        <FieldArray {...attrs('favorits','text')} id='favorits' >
                                            {props=><FavoriteField {...props} />}
                                        </FieldArray>               
                                    </div>

                                    <div className="mb-2 d-flex ">
                                        <button className="btn btn-primary w-50 mx-auto" disabled={!formik.isValid || formik.isSubmitting}>
                                            {formik.isSubmitting ? 
                                                <div className="spinner-border text-white mt-1" style={{fontSize:10,width:25,height:25}}>
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            : 'ثبت نام'}
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Formik>  
    )
}

export default Registerform;
