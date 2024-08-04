import { useState } from 'react';
import styles from './badge-form.module.css';
import EcoButton from '../eco-button/eco-button';
import propTypes from 'prop-types';
import React from 'react';

// make sure to add onSubmit function to the parent component

function BadgeForm(props) {
  const [formData, setForm] = useState({
    title: '',
    description: '',
    image: '',
    criteria: '',
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
        <div className={styles.container}>

            <div className={styles.formContainer} >
            <h1>New Badge</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label className={styles.formTitle}>Title</label>
                <input
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    name="title"
                    value={formData.title}
                />
                </div>

                <div className="form-group">
                <label className={styles.formTitle}>Description</label>
                <input
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    name="description"
                    value={formData.description}
                />
                </div>

                <div className="form-group">
                <label className={styles.formTitle}>Image</label>
                <input
                    type='file'
                    onChange={handleChange}
                    className="form-control"
                    name="image"
                    value={formData.image}
                />
                </div>

                <div className="form-group">
                <label className={styles.formTitle}>Criteria</label>
                <input
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    name="criteria"
                    value={formData.criteria}
                />
                </div>
                <EcoButton type='submit' ecoButtonProps={ecoButtonProps}/>
                {/* <button type='submit' className="btn btn-primary">Save</button> */}
            </form>
            </div>
        </div>
    </>
  );
}

BadgeForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default BadgeForm;
