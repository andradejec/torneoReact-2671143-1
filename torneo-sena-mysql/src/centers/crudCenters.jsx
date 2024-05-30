import axios from "axios"
import { useState, useEffect } from "react"
import FormCenters from "./formCenters"

const URI_CENTERS = 'http://localhost:8000/centers/'

const CrudCenters = () => {

    const [centers, setCenters] = useState([])

    const getAllCenters = async () => {

        const response = await axios.get(URI_CENTERS)

        setCenters(response.data)

    }

    useEffect(() => {
        getAllCenters()
    }, [])

    return (
        <>
            <h1>Centros de formación</h1>
            <table>
                <thead>
                    <tr>
                        <th>Código de centro</th>
                        <th>Departamento</th>
                        <th>Municipio</th>
                        <th>Nombre del centro</th>
                    </tr>
                </thead>
                <tbody>
                    {centers.map((center) => (

                        <tr key={center.id}>
                            <td>{center.codigo_centro}</td>
                            <td>{center.deptos.DepNombre}</td>
                            <td>{center.id_municipio}</td>
                            <td>{center.nombre_centro}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormCenters />
        </>
    )
}

export default CrudCenters