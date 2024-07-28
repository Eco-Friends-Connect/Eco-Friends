import style from './event-form.module.css';
import EcoButton from '../eco-button/eco-button';
import propTypes from 'prop-types';
import { useState } from 'react';

function EventForm(props) {
    const [formData, setForm] = useState({
        title: '',
        description: '',
        deadline: '',
    });
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
    const ecoButtonProps = {
        btnTitle: 'Save',
        btnSize: 'small',
        btnFontSize: 'medium',
    };
    return (
        <>
            <div className={style.container}>
                <div className={style.formContainer}>
                    <h1>New Event</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className={style.formTitle}>Title</label>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                type="text"
                                name="title"
                                value={formData.title}
                            />
                        </div>
                        <div className="form-group">
                            <label className={style.formTitle}>Description</label>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                type="text"
                                name="description"
                                value={formData.description}
                            />
                        </div>
                        <div className="form-group">
                            <label className={style.formTitle}>Deadline</label>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                type="date"
                                name="deadline"
                                value={formData.deadline}
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