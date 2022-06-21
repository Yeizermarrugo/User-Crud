import React from 'react'
import axios from 'axios'


const CardOfUsers = ({user, getAllUsers, URL, setObjectUpdate,reset, setIsShowForm}) => {

    const deleteMovie = id => {
        axios.delete(`${URL}${id}/`)
          .then(res => {
            console.log(res.data)
            getAllUsers()
          })
          .catch(err => console.log(err))
      }

      const updateUser = () => {
        setIsShowForm(true)
    
        const obj = {
            email: user.email,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            birthday: user.birthday
        }
    
        reset(obj)
        setObjectUpdate(user)
      }

  return (
    <div className="card">
        <h3>{`#${user.id}`}</h3>
      <ul>
        <li><b>First Name: </b>{user.first_name}</li>
        <li><b>Last Name: </b>{user.last_name}</li>
        <li><b>Email: </b>{user.email}</li>
        <li><b>Birthday: </b>{user.birthday}</li>
      </ul>
      <button className="delete" onClick={() => deleteMovie(user.id)}><i className='bx bx-trash' ></i></button>
      <button className="update" onClick={updateUser}><i className='bx bx-refresh'></i></button>
    </div>
  )
}

export default CardOfUsers