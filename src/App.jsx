import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardOfUsers from './components/CardOfUsers'
import Form from './components/Form'
import { useForm } from 'react-hook-form'
import Paginacion from './components/Paginacion'
import Loading from './components/Loading'


const URL = 'https://users-crud1.herokuapp.com/users/'

function App() {

  const [users, setUsers] = useState()
  const { handleSubmit, register, formState: { errors }, reset } = useForm()
  const [isShowForm, setIsShowForm] = useState(false)
  const [objectUpdate, setObjectUpdate] = useState()
  const [pagina, setPagina] = useState(1)
  const [porPagina, setPorPagina] = useState(10)
  const [isLoading, setIsLoading] = useState(true)

  const maximo = Math.ceil(users?.length / porPagina)

  const getAllUsers = () => {
    axios.get(URL)
      .then(res => {
        console.log(res.data)
        setUsers(res.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const createNewUser = newUser => {
    axios.post(URL, newUser)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const updateUserById = (id, updateUser) => {

    axios.patch(`${URL}${id}/`, updateUser)
      .then(res => {
        console.log(res.data)
        getAllUsers()
        setObjectUpdate()
        setIsShowForm(false)
      })
      .catch(err => console.log(err))
  }

  const showForm = () => {

    const obj = {
      duration: "",
      genre: "",
      name: "",
      release_date: ""
    }
    reset(obj)
    setIsShowForm(!isShowForm)
  }


  return (
    <>
    {isLoading ?
          <Loading /> :
    <div>
      <div className="create">
        <button className="btn" onClick={showForm}>{isShowForm ? 'Hide Form' : 'Create a new user'}</button>
      </div>
      <div className="form">
        {
          isShowForm &&
          <Form
            createNewUser={createNewUser}
            updateUserById={updateUserById}
            handleSubmit={handleSubmit}
            reset={reset}
            register={register}
            objectUpdate={objectUpdate} />
        }
      </div>
      <div className="App">
        {
          users?.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).map(user => (
            <CardOfUsers
              user={user}
              timeout={3000}
              key={user.id}
              URL={URL}
              getAllUsers={getAllUsers}
              updateUserById={updateUserById}
              setIsShowForm={setIsShowForm}
              reset={reset}
              setObjectUpdate={setObjectUpdate}
            />
          ))
        }
      </div>
      <div className="paginacion">
        <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
        />
      </div>
    </div>
}
    </>
  )
}

export default App
