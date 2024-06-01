import axios from "axios"
import { useState, useEffect } from "react"

import FormCenters from "./formCenters"

import Swal from "sweetalert2"

const URI_CENTERS = 'http://localhost:8000/centers/'

const CrudCenters = () => {

    const [centers, setCenters] = useState([])

    //Definir el texto del botón del formulario el cual varía entre 'Enviar' y 'Actualizar'
    const [buttonForm, setButtonForm] = useState('Enviar')

    // Definir prop para la edición de un centro de formación
    const [centerParaForm, setCenterParaForm] = useState({
        id: '',
        codigo_centro: '',
        idDepto: '',
        id_municipio: '',
        nombre_centro: ''
    })

    const getAllCenters = async () => {

        const response = await axios.get(URI_CENTERS)

        setCenters(response.data)

    }

    useEffect(() => {
        getAllCenters()
    }, [centers])   //Agregar elemento al useEffect para que se ejecute la función getAllCenters después de actualizar un registro

    //Función para obtener el centro de formación que se va a editar
    const getCenter = async (idCenter) => {

        // console.log(idCenter)

        setButtonForm('Enviar')
        const response = await axios.get(URI_CENTERS + idCenter)
        setButtonForm('Actualizar')
        // console.log(response.data)

        setCenterParaForm({ ...response.data }) //Llenar la prop centerParaForm con los datos y así mostrarlos en el form

    }

    const updateTextButton = (texto) => {   // Función que actualiza el texto del botón del formulario
        setButtonForm(texto)
    }
    //Uso de sweet alert
    const deleteCenter = (idCenter) => {
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
                await axios.delete(URI_CENTERS + idCenter)
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
            <h1>Centros de formación</h1>
            <table>
                <thead>
                    <tr>
                        <th>Código de centro</th>
                        <th>Departamento</th>
                        <th>Municipio</th>
                        <th>Nombre del centro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {centers.map((center) => (

                        <tr key={center.id}>
                            <td>{center.codigo_centro}</td>
                            <td>{center.deptos.DepNombre}</td>
                            <td>{center.id_municipio}</td>
                            <td>{center.nombre_centro}</td>
                            <td>
                                <span className="btn btn-primary" onClick={() => getCenter(center.id)}><i className="fa-solid fa-pen-to-square"></i></span>
                                <span className="btn btn-danger m-1" onClick={() => deleteCenter(center.id)}><i className="fa-solid fa-pen-to-square"></i></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormCenters buttonForm={buttonForm} URI_CENTERS={URI_CENTERS} centerParaForm={centerParaForm} updateTextButton={updateTextButton} />
        </>
    )
}

export default CrudCenters