import { useState } from 'react'

//Importar componentes necesarios para el sistema de rutas en REACT
import { Routes, Route, Link } from 'react-router-dom'
//importar componentes que van en las rutas
import Home from './home/Home'
import CrudPlayers from './players/crudPlayers'
import CrudCenters from './centers/crudCenters'

function App() {
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
        </ul>
      </nav>
      {/*Aquí empieza la gestión de rutas */}

      <Routes>
        {/* en el componente Route van dos propiedades, la primera es path y la seguna es element, en path va la dirección donde queremos mostrar el componente, y en element va el componente que se quiere mostrar.*/}
        <Route path='/' element={<Home />} />
        <Route path='/players' element={<CrudPlayers />} />
        <Route path='/centers' element={<CrudCenters />} />
      </Routes>
    </>
  )
}

export default App
