import React from 'react';
import Input from './input';
import Textarea from './textarea';
import Select from './select';

const FormikControl = (props) => {
    switch (props.control) {
        case 'input':
            return <Input {...props} />
        case 'textarea':
            return <Textarea {...props} />
        case 'select':
            return <Select {...props} />
        default:
            break;
    }
}

export default FormikControl;
