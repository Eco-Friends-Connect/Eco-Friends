import { useState } from 'react';
import styles from './badge-form.module.css';
import EcoButton from '../button/button';


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

  return (
    <>
        <div className={styles.formContainer} >
        <h1>New Attendant</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Title</label>
            <input
                onChange={handleChange}
                className="form-control"
                type="text"
                name="title"
                value={formData.title}
            />
            </div>

            <div className="form-group">
            <label>Description</label>
            <input
                onChange={handleChange}
                className="form-control"
                type="text"
                name="description"
                value={formData.description}
            />
            </div>

            <div className="form-group">
            <label>Image</label>
            <input
                onChange={handleChange}
                className="form-control"
                name="image"
                value={formData.image}
            />
            </div>

            <div className="form-group">
            <label>Criteria</label>
            <input
                onChange={handleChange}
                className="form-control"
                type="text"
                name="criteria"
                value={formData.criteria}
            />
            </div>
            <EcoButton type='submit' text='Save' />
            {/* <button type='submit' className="btn btn-primary">Save</button> */}
        </form>
        </div>
    </>
  );
}

export default BadgeForm;