import {React, useState} from 'react';
import propTypes from 'prop-types';
import style from './eco-form.module.scss';
import EcoButton from '../eco-button/eco-button';



function EcoForm(props) {
    // create a reusable form component tha can be used for different forms
    // make sure to add onSubmit function to the parent component
    const initFormData = props.fields.reduce((acc, field) => {
        if(field.type === "checkbox") {
            acc[field.name] = false;
        }else if(field.type === "select") {
            acc[field.name] = field.options[0];
        }
        else {
            acc[field.name] = "";
        }
        return acc;
    }, {});
    const [formData, setForm] = useState(initFormData);
    function targetTypes(e) {
        if(e.target.type === "checkbox") {
            return e.target.checked;
        }else if(e.target.type === "select") {
            return e.target.options[e.target.selectedIndex].value;
        }
        return e.target.value;
    }
    const handleChange = (e) => {
        console.log(e.target.name, targetTypes(e));
        if(e.target.type === "file"){
            setForm({
                ...formData,
                [e.target.name]: e.target.files[0]
            });
            return;
        }
        setForm({
            ...formData,
            [e.target.name]: targetTypes(e)
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
                                    {
                                        field.type !== "select" && field.type !== "file" && (<input
                                        onChange={handleChange}
                                        className="form-control"
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name] }
                                        // add for select field
                                        // value={formData[field.name] || field.options[0]}
                                        
                                    />)
                                    }
                                    {
                                        field.type === "select" && (
                                            <select
                                                onChange={handleChange}
                                                className="form-control"
                                                name={field.name}
                                                value={formData[field.name] || field.options[0]}
                                            >
                                                {
                                                    field.options.map((option, index) => {
                                                        return (
                                                            <option key={index} value={option}>{option}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        )
                                    }
                                    {
                                        field.type === "file" && (
                                            <input
                                                onChange={handleChange}
                                                className="form-control"
                                                type={field.type}
                                                name={field.name}
                                            />
                                        )
                                    }
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
            options: propTypes.arrayOf(propTypes.string)
        })
    ).isRequired,
    formData: propTypes.object.isRequired,
    submitTitle: propTypes.string,
    onSubmit: propTypes.func,
};


export default EcoForm;