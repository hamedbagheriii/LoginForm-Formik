import { ErrorMessage, FastField, Field, FieldArray, Form, Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup'
import FavoriteField from './FavoriteField';
import FormikControl from './formikElement/formikControl';

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
    favorits : [''],
    education : 1,
}


const onSubmit = (values , submitProps)=>{
    console.log(values);

    setTimeout(() => {
        submitProps.setSubmitting(false)
        submitProps.resetForm()
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
    favorits : Yup.array().of(Yup.string().required('لطفا مقداری بنویسید .')),
})


const education = [
    {id : 1 , value : 'ابتدایی'} ,
    {id : 2 , value : 'سیکل'} ,
    {id : 3 , value : 'دیپلم'} ,
    {id : 4 , value : 'لیسانس'} ,
]




const Registerform = () => {
    const [savedData , setSavedData] = useState(null);
    const [myValues , setMyValues] = useState(null);

    useEffect(() => {
        const localSavedData = JSON.parse(localStorage.getItem('savedData'));
        setSavedData(localSavedData)
    }, []);


    const handleGetSaveData = ()=>{
        console.log(savedData);
        setMyValues(savedData)
    }


    const handleSetDate = (formik)=>{
        console.log(formik.values);
        localStorage.setItem('savedData' , JSON.stringify(formik.values));
    }
    
    const attrs = (targetType  , targetId , targetControl , targetLabel , targetName , targetClass)=>{
        return ({
            type : targetType ,
            className : targetClass ,
            id : targetId ,
            control : targetControl ,
            label : targetLabel ,
            name : targetName ,
        })
    }

   


    return (    
        <Formik 
         initialValues={myValues || initialValues} 
         validationSchema={validationSchema} 
         onSubmit={onSubmit} 
         validateOnMount
         enableReinitialize
         >

        {formik=>{
            // console.log(formik);
            return(
                <div className='auth_container container-fluid d-flex justify-content-center align-items-center w-100 h-100-vh p-0'>
                <div className="row w-100 justify-content-center align-items-center">
                    <div className='border border-primary border-2 bg-dark text-white rounded-3 py-4 mt-3 col-11 col-md-8 col-lg-6 col-xl-4 py-2 px-3'>
                        <Form className='row'>
                            <h1 className='text-center'>
                                <i className='fas fa-user-plus text-primary'></i>
                            </h1>
                            <FormikControl {...attrs('text','name','input','نام','name',null)} />
                       
                            <FormikControl {...attrs('email','email','input','ایمیل','email',null)} />

                            <FormikControl {...attrs('password','password','input','رمز عبور','password',null)} />

                            <FormikControl {...attrs('password','password2','input','تکرار رمز عبور','password2',null)} />

                            <FormikControl {...attrs('text','bio','textarea','بیوگرافی','bio',null)} />

                            <FormikControl {...attrs('text','city','input','شهر','address.city','col-6 mb-4')} />

                            <FormikControl {...attrs('number','postalCode','input','کد پستی','address.postalCode','col-6 mb-4')} />

                            <FormikControl {...attrs('number','mobilePhone','input','شماره موبایل','phone[0]','col-6')} />

                            <FormikControl {...attrs('number','telePhone','input','تلفن ثابت','phone[1]','col-6 mb-3')} />

                            <FormikControl {...attrs('','education','select','تحصیلات','education')} option={education} />

                            <div className="mb-4">
                                <label htmlFor="favorits" className='form-label'>علاقه مندی </label>
                                <FieldArray {...attrs('favorits','text')} >
                                    {props=><FavoriteField {...props} />}
                                </FieldArray>
                            </div>


                            <div className="mb-2 d-flex justify-content-around ">
                                <button className="btn btn-primary w-25 " disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>
                                    {formik.isSubmitting ? 
                                        <div className="spinner-border text-white mt-1" style={{fontSize:10,width:25,height:25}} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    : 'ثبت نام'}
                                </button>
                                 
                                {savedData ? 
                                    <button className="btn btn-warning" type='button' 
                                    onClick={handleGetSaveData}>دریافت از سیستم</button>
                                :
                                    <button className="btn btn-success" type='button' disabled={!(formik.isValid) || formik.isSubmitting}
                                    onClick={()=>handleSetDate(formik)}>ذخیره در سیستم</button>
                                }
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
