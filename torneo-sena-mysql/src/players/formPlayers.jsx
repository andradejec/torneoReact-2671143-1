import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";

const FormPlayers = ({ buttonForm, player, URI, updateTextButton }) => {   // Agregar como parámetro el botón que llega desde el componente crudPlayers

    // Hooks para cada uno de los campos del formulario
    const [documento, setDocumento] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [genero, setGenero] = useState('')
    const [estado, setEstado] = useState('')
    const [foto, setFoto] = useState(null)

    const inputFoto = useRef(null)

    // Función que recibe los datos del formulario
    const sendForm = (e) => {

        e.preventDefault()

        if (buttonForm == 'Actualizar') {

            console.log('actualizando ando...')
            // Aquí va el código para actualizar
            axios.put(URI + player.id, {    // Método PUT de axios para actualizar, enviar id en URL con los datos del formulario
                documento: documento,
                nombres: nombres,
                apellidos: apellidos,
                genero: genero,
                estado: estado,
                foto: foto
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            updateTextButton('Enviar')  //  Cambiar el texto del botón

            clearForm() //  Limpiar el formulario

        } else if (buttonForm == 'Enviar') {
            console.log('guardando ando...' + foto)
            // Aquí va el código para guardar
            axios.post(URI, {
                documento: documento,
                nombres: nombres,
                apellidos, apellidos,
                genero: genero,
                estado: estado,
                foto: foto
            }, {
                //Esta es una propiedad para el form que permite el envío de archivos
                headers: { "Content-Type": "multipart/form-data" }
            })

            clearForm()
        }

    }

    const clearForm = () => {
        // Se vacía el elemento player
        setDocumento('')
        setNombres('')
        setApellidos('')
        setGenero('')
        setEstado('')
        setFoto(null)
        inputFoto.current.value = ''    //Restablecer el valor del input de la foto 
    }

    const setData = () => { // Función que establece los valores a los campos para que se muestren en el formulario cuando presionen el botón editar, los datos llegan del objeto 'player'
        setDocumento(player.documento)
        setNombres(player.nombres)
        setApellidos(player.apellidos)
        setGenero(player.genero)
        setEstado(player.estado)
        setFoto(player.foto)
    }

    useEffect(() => {   // useEffect escucha los cambios en el objeto 'player' y se ejecuta la función 'setData'
        setData()
    }, [player])



    return (
        <>
            <form id="playerForm" action="" onSubmit={sendForm}>
                <label htmlFor="documento">Documento</label>
                {/* Cuando se trabaja con formularios, los campos deben contar siempre con el evento onChange,
                    el cual, ejecuta la función de gestión de dicho campo */}
                <input type="text" id="documento" value={documento} onChange={(e) => setDocumento(e.target.value)} />
                <br />
                <label htmlFor="nombres">Nombres</label>
                <input type="text" id="nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                <br />
                <label htmlFor="apellidos">Apellidos</label>
                <input type="text" id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                <br />
                <label htmlFor="genero">Genero</label>
                <select name="" id="genero" value={genero} onChange={(e) => setGenero(e.target.value)}>
                    <option value="">Selecciona uno...</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                    <option value="O">Otro</option>
                </select>
                <br />
                <label htmlFor="genero">Estado</label>
                <select name="" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="">Selecciona uno...</option>
                    <option value="habilitado">Habilitado</option>
                    <option value="deshabilitado">Deshabilitado</option>
                </select>
                <br />
                <label htmlFor="foto"></label>
                <input type="file" id="foto" onChange={(e) => setFoto(e.target.files[0])} ref={inputFoto}></input>

                <input type="submit" id="boton" value={buttonForm} className="btn btn-success" />
            </form>
        </>
    )
}

export default FormPlayers