import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardOfUsers from './components/CardOfUsers'
import { useForm } from 'react-hook-form'
import Paginacion from './components/Paginacion'
import Loading from './components/Loading'
import Modal from '../src/modal/Modal'


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
      email: "",
        password: "",
        first_name: "",
        last_name: "",
        birthday: ""
    }
    reset(obj)
    setIsShowForm(!isShowForm)
  }


  return (
    <>
    {isLoading ?
          <Loading /> :
    <div>
      <Modal
      createNewUser={createNewUser}
      updateUserById={updateUserById}
      handleSubmit={handleSubmit}
      reset={reset}
      register={register}
      objectUpdate={objectUpdate}/>
      <div className="form">
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
