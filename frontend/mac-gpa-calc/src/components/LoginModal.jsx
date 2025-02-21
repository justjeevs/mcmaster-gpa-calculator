import React, { useState } from 'react';
import '../styles/Modal.css';

const LoginModal = ({ closeModal, onSubmit }) => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState('');

    const validateForm = () => {
        if (formState.username && formState.password) {
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
                        <label htmlFor='username'>Username</label>
                        <input
                            name='username'
                            value={formState.username}
                            onChange={handleChange}
                            placeholder='macid'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            name='password'
                            value={formState.password}
                            onChange={handleChange}
                            type='password'
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
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
