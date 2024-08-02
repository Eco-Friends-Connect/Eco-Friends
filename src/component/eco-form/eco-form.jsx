import {React, useState} from 'react';
import propTypes from 'prop-types';
import style from './eco-form.module.scss';
import EcoButton from '../eco-button/eco-button';



function EcoForm(props) {
    // create a reusable form component tha can be used for different forms
    // make sure to add onSubmit function to the parent component
    const initFormData = props.fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {});
    const [formData, setForm] = useState(initFormData);
    const handleChange = (e) => {
        setForm({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(formData);
    };
    return (
        <>
            <div className={style.formContainer} >
                <h1>{props.title}</h1>
                <form onSubmit={handleSubmit}>
                    {
                        props.fields.map((field, index) => {
                            return (
        
                                <div key={index} className="form-group">
                                    <label  className={style.formTitle}>{field.label}</label>
                                    <input
                                        onChange={handleChange}
                                        className="form-control"
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name] || ""}
                                    />
                                </div>
                                
                            );
                        })
                    }
                    <EcoButton type='submit' ecoButtonProps={{
                        btnTitle: props.submitTitle || "Submit", 
                        btnSize: "small", 
                        btnFontSize: "small"
                        }}
                    />
                </form>
            </div>
        </>
    );
}

EcoForm.propTypes = {
    title: propTypes.string.isRequired,
    fields: propTypes.arrayOf(
        propTypes.shape({
            label: propTypes.string.isRequired,
            type: propTypes.string.isRequired,
            name: propTypes.string.isRequired,
        })
    ).isRequired,
    formData: propTypes.object.isRequired,
    submitTitle: propTypes.string,
    onSubmit: propTypes.func,
};


export default EcoForm;