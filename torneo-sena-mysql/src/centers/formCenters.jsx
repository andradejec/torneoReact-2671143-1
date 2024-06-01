import axios from "axios"
import { useState, useEffect } from "react"

const URI_DEPTOS = 'http://localhost:8000/deptos/'
//esta uri ya debe estar definida en el backend (routerDeptos.js, deptosModel.js y deptoController)
const URI_MCIPIOS_POR_DEPTO = 'http://localhost:8000/mcipios/depto/'

const FormCenters = ({ buttonForm, URI_CENTERS, centerParaForm, updateTextButton }) => {
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

    const setDataCenterParaForm = () => {   //Esta función recibe los datos que llegan después de presionar el botón de editar y los establece para mostrarlos en el form
        setCodigoCentro(centerParaForm.codigo_centro)
        setDepartamento(centerParaForm.idDepto)
        setMunicipio(centerParaForm.id_municipio)
        setNombreCentro(centerParaForm.nombre_centro)
        searhcMunicipio(centerParaForm.idDepto)
    }

    useEffect(() => {

        getDeptos() //Ejecutar al cargar la página para obtener los departamentos

        if (centerParaForm) {
            //En el useEffect una sentencia IF permite controlar lo que se quiere ejecutar dependiendo de la variable que se actualice
            //En este caso se ejecutará setDataCenterParaForm solamente cuando la prop centerParaForm tenga un cambio, o sea, cuando precionen el botón editar
            setDataCenterParaForm()

        }
    }, [centerParaForm])

    //Buscar municipios del departamento seleccionado
    const searhcMunicipio = async (id) => {

        if (id) {  //Es necesario validar si existe el id, porque el useEffect ejecuta esta función cuando se carga la página y en ese momento aún no está definido el id

            const mcipios = await axios.get(URI_MCIPIOS_POR_DEPTO + id)

            setMunicipiosPorDepto(mcipios.data) //Cargar los municipios en la prop
        }


    }

    // Función que recibe los datos del formulario
    const sendForm = (e) => {

        e.preventDefault()

        if (buttonForm == 'Actualizar') {

            console.log('actualizando ando...')

            // Aquí va el código para actualizar
            axios.put(URI_CENTERS + centerParaForm.id, {    // Método PUT de axios para actualizar, enviar id en URL con los datos del formulario
                codigo_centro: codigoCentro,
                idDepto: departamento,
                id_municipio: municipio,
                nombre_centro: nombreCentro
            })

            updateTextButton('Enviar')  //  Cambiar el texto del botón

            clearForm() //  Limpiar el formulario

        } else if (buttonForm == 'Enviar') {
            console.log('guardando ando...')
            // Aquí va el código para guardar
            axios.post(URI_CENTERS, {
                codigo_centro: codigoCentro,
                idDepto: departamento,
                id_municipio: municipio,
                nombre_centro: nombreCentro
            })

            clearForm()
        }

    }

    const clearForm = () => {
        // Se vacía el elemento center
        setCodigoCentro('')
        setDepartamento('')
        setMunicipio('')
        setNombreCentro('')
    }



    return (
        <>
            <form onSubmit={sendForm}>
                <label htmlFor="codigoCentro">Codigo: </label>
                <input type="number" value={codigoCentro} onChange={(e) => setCodigoCentro(e.target.value)} id="codigoCentro" />
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
                <br />
                <label htmlFor="nombreCentro">Nombre Centro: </label>
                <input type="text" value={nombreCentro} onChange={(e) => setNombreCentro(e.target.value)} id="nombreCentro" />
                <br />
                <input type="submit" value={buttonForm} />
            </form>
        </>
    )
}

export default FormCenters