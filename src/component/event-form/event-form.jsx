import style from './event-form.module.css';
import EcoButton from '../eco-button/eco-button';
import propTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';

function EventForm(props) {
    const [formData, setForm] = useState({
        title: '',
        description: '',
        deadline: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    });
    const handleChange = (e) => {
        e.preventDefault();
        setForm({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(formData);
    };
    const ecoButtonProps = {
        btnTitle: 'Save',
        btnSize: 'tiny',
        btnFontSize: 'small',
    };
    return (
        <>
            <div className={style.container}>
                <div className={style.formContainer}>
                    <h1>New Event</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={style['form-group']}>
                            <label className={style.formTitle}>Title</label>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                type="text"
                                name="title"
                                value={formData.title}
                            />
                        </div>
                        <div className={style['form-group']}>
                            <label className={style.formTitle}>Description</label>
                            <textarea
                                onChange={handleChange}
                                className="form-control"
                                type="text"
                                name="description"
                                value={formData.description}
                            />
                        </div>
                        <div className={style['form-group']}>
                            <label className={style.formTitle}>Deadline</label>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                            />
                        </div>
                        <div className={style['form-group']}>
                            <label className={style.formTitle}>Address</label>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                type="text"
                                name="address"
                                value={formData.address}
                            />
                        </div>
                        <div className={style['form-group']}>
                            <label className={style.formTitle}>City</label>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                type="text"
                                name="city"
                                value={formData.city}
                            />
                        </div>
                        <div className={style['form-group']}>
                            <label className={style.formTitle}>State</label>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                type="text"
                                name="state"
                                value={formData.state}
                            />
                        </div>
                        <div className={style['form-group']}>
                            <label className={style.formTitle}>Zip Code</label>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                            />
                        </div>
                        <EcoButton className={style.btn} ecoButtonProps={ecoButtonProps}>Save</EcoButton>
                    </form>
                </div>
            </div>
        </>
    );
}

EventForm.propTypes = {
    onSubmit: propTypes.func.isRequired,
};

export default EventForm;