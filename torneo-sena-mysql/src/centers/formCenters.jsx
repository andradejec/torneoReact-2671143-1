import axios from "axios"
import { useState, useEffect } from "react"

const URI_DEPTOS = 'http://localhost:8000/deptos/'
//esta uri ya debe estar definida en el backend (routerDeptos.js, deptosModel.js y deptoController)
const URI_MCIPIOS_POR_DEPTO = 'http://localhost:8000/mcipios/depto/'

const FormCenters = () => {
    //props para los campos del formulario
    const [codigoCentro, setCodigoCentro] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [municipio, setMunicipio] = useState('')
    const [nombreCentro, setNombreCentro] = useState('')

    //prop para departamentos
    const [datosDepartamentos, setDatosDepartamentos] = useState([])

    //prop para municipios
    const [municipiosPorDepto, setMunicipiosPorDepto] = useState([])

    //función para obtener los departamentos, con el fin de cargarlos en el select de departamentos
    const getDeptos = async () => {
        const deptos = await axios.get(URI_DEPTOS)
        // console.log(deptos.data)
        setDatosDepartamentos(deptos.data)
    }

    useEffect(() => {
        getDeptos() //Ejecutar al cargar la página para obtener los departamentos
    }, [])

    //Buscar municipios del departamento seleccionado
    const searhcMunicipio = async (id) => {

        //console.log(id) //Verificar que esta recibiendo correctamente el id del departamento
        const mcipios = await axios.get(URI_MCIPIOS_POR_DEPTO + id)
        // console.log(mcipios.data)
        setMunicipiosPorDepto(mcipios.data) //Cargar los municipios en la prop

    }

    return (
        <>
            <form>
                <label htmlFor="codigoCentro">Codigo: </label>
                <input type="number" value={codigoCentro} onChange={(e) => e.target.value} id="codigoCentro" />
                <br />
                <label htmlFor="departamento">Departamento: </label>
                <select value={departamento} onChange={(e) => { setDepartamento(e.target.value); searhcMunicipio(e.target.value) }} id="departamento">

                    <option value="">Selecciona uno..</option>
                    {datosDepartamentos.map(depto =>

                        <option key={depto.idDepartamento} value={depto.idDepartamento} >{depto.DepNombre}</option>

                    )}
                </select>
                <br />
                <label htmlFor="municipio">Municipio: </label>
                <select value={municipio} onChange={(e) => setMunicipio(e.target.value)} id="municipio">

                    <option value="">Seleccione uno...</option>

                    {municipiosPorDepto.map(mcipio =>

                        <option key={mcipio.id} value={mcipio.id}>{mcipio.mcipioNombre}</option>
                    )}

                </select>
            </form>
        </>
    )
}

export default FormCenters