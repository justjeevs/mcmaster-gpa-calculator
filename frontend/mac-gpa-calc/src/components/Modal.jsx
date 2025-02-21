import React, { useState } from 'react';
import '../styles/Modal.css';

const Modal = ({ closeModal, onSubmit, defaultValue }) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            course: '',
            description: '',
            term: '',
            grade: '',
            units: '',
        }
    );

    const [errors, setErrors] = useState('');

    const validateForm = () => {
        if (
            formState.course &&
            formState.description &&
            formState.term &&
            formState.grade &&
            formState.units
        ) {
            setErrors('');
            return true;
        } else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState)) {
                if (!value) {
                    errorFields.push(key);
                }
            }
            setErrors(errorFields.join(', '));
            return false;
        }
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        onSubmit(formState);
        closeModal();
    };

    return (
        <div
            className='modal-container'
            onClick={(e) => {
                if (e.target.className === 'modal-container') closeModal();
            }}
        >
            <div className='modal'>
                <form>
                    <div className='form-group'>
                        <label htmlFor='course'>Course</label>
                        <input
                            name='course'
                            value={formState.course}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            name='description'
                            value={formState.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='term'>Term</label>
                        <input
                            name='term'
                            value={formState.term}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='grade'>Letter Grade</label>
                        <input
                            name='grade'
                            value={formState.grade}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='units'>Units</label>
                        <input
                            name='units'
                            value={formState.units}
                            onChange={handleChange}
                        />
                    </div>
                    {errors && (
                        <div className='error'>{`Please include: ${errors}`}</div>
                    )}
                    <button
                        type='submit'
                        className='btn'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
