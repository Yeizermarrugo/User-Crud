import React, { useState } from 'react'
import './modal.css'
const Modal = ({ createNewUser, updateUserById, handleSubmit, reset, register, objectUpdate }) => {
    const [modal, setModal] = useState(false)

    const defaultValuesForm = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birthday: ""
    }

    const submit = data => {
        if (objectUpdate !== undefined) {
            updateUserById(objectUpdate.id, data)
            reset(defaultValuesForm)
        } else {
            createNewUser(data)
        }
        reset(defaultValuesForm)
    }

    const toggleModal = () => {
        setModal(!modal)
    }


    return (
        <div>
            <button onClick={toggleModal}
                className="btn-modal">
                <div>Add new user <i className='bx bxs-user-plus' ></i></div>
            </button>
            {modal && (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-content">
                        <form onSubmit={handleSubmit(submit)}>
                            <div>
                                <label htmlFor="email">Email </label>
                            </div>
                            <div>
                            <input type="email" id='email' {...register('email')} />
                            </div>
                            <div>
                                <label htmlFor="password">Password  </label>
                            </div>
                            <div>
                            <input type="password" id='password' {...register('password')} />
                            </div>
                            <div>
                                <label htmlFor="first_name">First name  </label>
                            </div>
                            <div>
                            <input type="text" id='first_name' {...register('first_name')} />
                            </div>
                            <div>
                                <label htmlFor="last_name">Last name  </label>
                            </div>
                            <div>
                            <input type="text" id='last_name' {...register('last_name')} />
                            </div>
                            <div>
                                <label htmlFor="birthday">Birthday</label>
                            </div>
                            <div>
                            <input type="date" id='birthday' {...register('birthday')} />
                            </div>
                            <button className="submit">Submit</button>
                        </form>

                        <button className="close-modal" onClick={toggleModal}>
                            <i className='bx bx-x'></i>
                        </button>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Modal