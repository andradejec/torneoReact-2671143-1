import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FormPlayers from './formPlayers'
import Pagination from '../pagination'

import Swal from 'sweetalert2'
import FormQueryPlayer from './formQueryPlayer'

const URI = 'http://localhost:8000/players/'
const PATH_FOTOS = 'http://localhost:8000/public/uploads/'

const CrudPlayers = () => {

    //uso del Hook useState
    const [playerList, setPlayerList] = useState([])
    //inicializar la lista con un arreglo vacío

    //Definir el texto del botón del formulario el cual varía entre 'Enviar' y 'Actualizar'
    const [buttonForm, setButtonForm] = useState('Enviar')

    // Definir prop para el registro de un player
    const [player, setPlayer] = useState({
        id: '',
        documento: '',
        nombres: '',
        apellidos: '',
        genero: '',
        foto: null,
        estado: ''
    })

    //props para PAGINACIÓN
    const [desde, setDesde] = useState(0)   // prop para determinar en qué registro empezar para cada página
    const [hasta, setHasta] = useState(0)   // prop para determinar en qué registro finalizar para cada página


    // Hook useEffect: es un hook que recibe como primer parámetro una función que se ejecutará cada vez que nuestro componente se renderice, 
    // ya sea por un cambio de estado, por recibir props nuevas o, y esto es importante, porque es la primera vez que se MONTA.
    useEffect(() => {
        getAllPlayers() //Ejecuta la función getAllPlayers
    }, [playerList])    //Cada vez que haya un cambio en la lista de players se ejecuta la función getAllPlayers()
    // o sea, cuando se crea, se actualiza o elimina un registro

    const getAllPlayers = async () => {
        const respuesta = await axios.get(URI)
        //A través de AXIOS se logra la conexión con el backend
        //Recuerde que la variable URI tiene la dirección del servidor NODE que creamos anteriormente
        //A través de esta dirección se realizan las peticiones CRUD
        setPlayerList(respuesta.data)
    }

    const getPlayer = async (idPlayer) => { //Función para consultar un player

        setButtonForm('Enviar')
        // Cambiar el nombre del botón a 'enviar' y luego a 'actualizar', es un truco que permite mejorar la reacción del
        // componente formQueryPlayer (desaparecer la tabla del resultado de la búsqueda), esto ocurre porque se había programado
        // que se limpiara la tabla cuando el botón cambiara su valor

        const respuesta = await axios.get(URI + idPlayer) // concatenar a la ruta principal el / y el id

        setButtonForm('Actualizar') // Cambiar el texto del botón


        setPlayer({
            ...respuesta.data   // Llenar el objeto player con los datos consultados
        })
    }

    const updateTextButton = (texto) => {   // Función que actualiza el texto del botón del formulario
        setButtonForm(texto)
    }

    const deletePlayer = (idPlayer) => {
        console.log(idPlayer)
        Swal.fire({
            title: "Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(URI + idPlayer)
                Swal.fire({
                    title: "Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <>
            <Pagination URI={URI} setDesde={setDesde} setHasta={setHasta} />    {/**Enviar al componente de paginación la uri y las funciones para modificar las prop */}
            <table>
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Genero</th>
                        <th>Foto</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* En el contexto de React y firestore, se utiliza map en lugar de foreEach porque genera un nuevo array de elementos que pueden ser renderizados en JSX.  */}
                    {playerList.map((player, indice) => (   //se incluye el indice para trabajar la PAGINACIÓN
                        //con el paréntesis en lugar de llaves se ejecuta un return de manera explícita, o sea, no hay necesidad de digitar la palabra return
                        indice >= desde && indice < hasta ? (   //Este operador ternario es para la PAGINACIÓN
                            <tr key={player.id}>
                                <td>{player.documento}</td>
                                <td>{player.nombres}</td>
                                <td>{player.apellidos}</td>
                                <td>{player.genero}</td>
                                <td>
                                    {/* <a href={PATH_FOTOS + player.foto} target='_blank'>{player.foto}</a> */}
                                    <img width="80px" src={PATH_FOTOS + player.foto} alt='foto'></img>
                                </td>
                                <td>{player.estado}</td>
                                <td>
                                    <span className="btn btn-primary" onClick={() => getPlayer(player.id)}><i className="fa-solid fa-pen-to-square"></i></span>
                                    <span className="btn btn-danger m-1" onClick={() => deletePlayer(player.id)}><i className="fa-solid fa-pen-to-square"></i></span>
                                </td>
                            </tr>) : '' //fin operador ternario para PAGINACIÓN
                    ))}
                </tbody>
            </table>
            <hr />
            {/* Incluir el componente FormPlayers y enviarle el botón como "parámetro" */}
            <FormPlayers buttonForm={buttonForm} player={player} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            {/* Incluir el componente de FormQueryPlayer */}
            <FormQueryPlayer URI={URI} getPlayer={getPlayer} deletePlayer={deletePlayer} buttonForm={buttonForm} />
        </>
    )
}

export default CrudPlayers