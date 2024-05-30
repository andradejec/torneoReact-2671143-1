import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'  //importar Compontente BrowserRouter


import 'bootstrap/dist/css/bootstrap.min.css'
// import CrudPlayers from './players/crudPlayers' comentar o borrar la importación del componente que se establa usando

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolver el punto de entrada de la aplicación */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* <CrudPlayers /> comentar o borrar el componente que se estaba mostrando*/}
  </React.StrictMode>,
)
