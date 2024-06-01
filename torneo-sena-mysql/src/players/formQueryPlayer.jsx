import axios from "axios"
import { useEffect, useState } from "react"

const FormQueryPlayer = ({ URI, getPlayer, deletePlayer, buttonForm }) => { //importar elementos del componente crudPlayers

    const [playerQuery, setPlayerQuery] = useState([])  // prop para el listado de registros consultados
    const [documento, setDocumento] = useState('')  // prop para el documento que se digita en el input del formulario

    const sendFormQuery = async (documento) => {    // Función que se ejecuta cada vez que el usuario digita algo en el input

        if (documento) {    //Si el input está vacío no realizará la consulta a la db
            //incluir axios para la consulta
            const respuesta = await axios.get(URI + 'documento/' + documento)
            // console.log(respuesta.data)

            setPlayerQuery(
                respuesta.data
            )

            console.log(playerQuery)


        } else {
            //Si el input está vacío se establece de nuevo como vacío el arreglo playerQuery
            setPlayerQuery([])
        }
    }

    useEffect(() => {
        setPlayerQuery([])  // Limpiar la lista consultada
        setDocumento('')    // Limpiar el input

    }, [buttonForm])    // el useEffect se ejecuta cada vez que haya un cambio en el botón



    return (
        <>

            <form action="" id="queryForm">
                <label htmlFor="documentoQuery">Documento</label>
                <input type="number" id="documentoQuery" value={documento} onChange={(e) => { sendFormQuery(e.target.value); setDocumento(e.target.value) }} />

            </form>

            {/**Uso del operador ternario: si hay datos en el arreglo de consulta se muestra la tabla, si no, no se muestra */
                /* condicion ? ejecuto algo: ejecuto otra cosa */
                playerQuery.length > 0 ? <table>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Genero</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* En el contexto de React, se utiliza map en lugar de foreEach porque genera un nuevo array de elementos que pueden ser renderizados en JSX.  */}
                        {playerQuery.map((player) => (
                            //con el paréntesis en lugar de llaves se ejecuta un return de manera explícita, o sea, no hay necesidad de digitar la palabra return
                            <tr key={player.id}>
                                <td>{player.documento}</td>
                                <td>{player.nombres}</td>
                                <td>{player.apellidos}</td>
                                <td>{player.genero}</td>
                                <td>{player.estado}</td>
                                <td>
                                    <button onClick={() => getPlayer(player.id)}>Editar</button>
                                    <button onClick={() => deletePlayer(player.id)}>Borrar</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table> : ''

            }

        </>
    )
}

export default FormQueryPlayer