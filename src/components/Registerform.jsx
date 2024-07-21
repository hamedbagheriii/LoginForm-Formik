import { ErrorMessage, FastField, Field, Form, Formik, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup'

const initialValues = {
    name : 'hamed',
    email : '',
    password : '',
    password2 : '',
}

const onSubmit = (values)=>{
    console.log(values);
}

const validationSchema = Yup.object({
    name:Yup.string().required('لطفا مقداری بنویسید .'),
    email:Yup.string().required('لطفا مقداری بنویسید .').email('لطفا یک ایمیل صحیح وارد کنید .'),
    password:Yup.string().required('لطفا مقداری بنویسید .').min(5,'تعداد کاراکتر کم است .'),
    password2:Yup.string().required('لطفا مقداری بنویسید .').oneOf([Yup.ref('password'),null],'پسورد ها برابر نیستند .')
})



const Registerform = () => {

    
    const attrs = (targetValue,targetType)=>{
        return ({
            type: targetType,
            id:targetValue,
            className:'form-control',
            name:targetValue
        })
    }



    return (    
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
            <div className='auth_container container-fluid d-flex justify-content-center align-items-center w-100 h-100-vh p-0'>
                <div className="row w-100 justify-content-center align-items-center">
                    <div className='border border-primary border-2 bg-dark text-white rounded-3 py-4 mt-3 col-11 col-md-8 col-lg-6 col-xl-4 py-2 px-3'>
                        <Form>
                            <h1 className='text-center'>
                                <i className='fas fa-user-plus text-primary'></i>
                            </h1>
                            <div className="mb-3">
                                <label htmlFor="name" className='form-label'>نام</label>
                                <FastField {...attrs('name','text')} />
                                <ErrorMessage name='name' />                       
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className='form-label'>ایمیل</label>
                                <FastField {...attrs('email','email')} />
                                <ErrorMessage name='email' />                       
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className='form-label'>رمز عبور</label>
                                <FastField {...attrs('password','password')}  />
                                <ErrorMessage name='password' />                       
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password2" className='form-label'>تکرار رمز عبور</label>
                                <FastField {...attrs('password2','password')}  />
                                <ErrorMessage name='password2' />                        
                            </div>

                            <div className="mb-2 d-flex ">
                                <button className="btn btn-primary w-50 mx-auto">ارسال</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Formik>  
    )
}

export default Registerform;
