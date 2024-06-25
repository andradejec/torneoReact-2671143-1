import { useEffect, useState } from 'react'

//Importar componentes necesarios para el sistema de rutas en REACT
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
//importar componentes que van en las rutas
import Home from './home/Home'
import CrudPlayers from './players/crudPlayers'
import CrudCenters from './centers/crudCenters'
import Auth from './auth/auth'
import axios from 'axios'
import ResetPassword from './auth/resetPassword'

const URI_AUTH = 'http://localhost:8000/auth/'

function App() {
  const [isAuth, setIsAuth] = useState(false) //Prop que muestra si hay usuario autenticado o no

  const navigate = useNavigate(); // Usa useNavigate para redirección

  useEffect(() => {

    //Verificar que hay usuario autenticado
    const user = JSON.parse(localStorage.getItem('userTorneo')) //Obtener variable del localStorage

    if (!user) {

      setIsAuth(false)  //Si no existe la variable se establece en falso la autenticación

    } else {
      //Si existe la variable en localStorage se verifica la autenticidad del token
      axios.get(URI_AUTH + 'verify', {
        headers: { Authorization: `Bearer ${user.tokenUser}` }
      }).then(response => {
        if (response.status === 200) {
          setIsAuth(true) // Si todo es correcto, se establece en TRUE la autenticación
        }
      }).catch(() => {
        setIsAuth(false)  // Si hay un error se establece en FALSE la autenticación
      })
    }


  }, [])



  const logOutUser = () => {

    localStorage.removeItem('userTorneo') //Borrar variable del localStorage

    setIsAuth(false)  //Establecer en falso el inicio de sesión

    navigate("/auth") //Redireccionar a la página de inicio de sesión


  }
  return (
    <>
      <nav>{/* Crear una barra sencilla de navegación temporalmente */}
        <ul>
          <li>
            <Link to="/">Principal</Link>  {/** En lugar de usar etiqueta <a> se utiliza el componente <Link></Link> */}
          </li>
          <li>
            <Link to="/players">Players</Link>
          </li>
          <li>
            <Link to="/centers">Centers</Link>
          </li>

          {
            !isAuth
              ?
              <li>
                <Link to="/auth">Sesión</Link>
              </li>
              :
              ''
          }


          {isAuth ? //operador ternario
            <li>
              <button onClick={() => logOutUser()} className='btn btn-secondary'><i className="fa-solid fa-door-closed"></i>Cerrar sesión</button>
            </li> : ''
          }

        </ul>
      </nav>
      {/*Aquí empieza la gestión de rutas */}

      <Routes>
        {/* en el componente Route van dos propiedades, la primera es path y la seguna es element, en path va la dirección donde queremos mostrar el componente, y en element va el componente que se quiere mostrar.*/}
        <Route path='/' element={<Home />} />

        {isAuth ?//Operador ternario para preguntar si hay sesión iniciada o no
          <>
            <Route path='/players' element={<CrudPlayers />} />
            <Route path='/centers' element={<CrudCenters />} />
          </>
          :
          <Route path='*' element={<Navigate to="/" />} />
        }

        {
          !isAuth //Si no está autenticado se deja acceso a la ruta de sesión
            ?
            <Route path='/auth' element={<Auth />} />
            :
            ''
        }

        <Route path='/reset-password' element={<ResetPassword />} />

      </Routes>
    </>
  )
}

export default App
