import React from 'react'

const Form = ({ createNewUser, updateUserById, handleSubmit, reset, register, objectUpdate }) => {


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

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <label htmlFor="email">Email:  </label>
                <input type="email" id='email' {...register('email')} />
            </div>
            <div>
                <label htmlFor="password">Password:  </label>
                <input type="password" id='password' {...register('password')} />
            </div>
            <div>
                <label htmlFor="first_name">First name:  </label>
                <input type="text" id='first_name' {...register('first_name')} />
            </div>
            <div>
                <label htmlFor="last_name">Last name:  </label>
                <input type="text" id='last_name' {...register('last_name')} />
            </div>
            <div>
            <label htmlFor="birthday">Birthday:  </label>
                <input type="date" id='birthday' {...register('birthday')} /> 
            </div>
            <button>Submit</button>
        </form>
    )
}

export default Form