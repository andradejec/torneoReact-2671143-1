import axios from "axios"
import { useState, useEffect } from "react"

const Pagination = ({ URI, setDesde, setHasta }) => {   //Recibir variables desde el componente padre

    const [numRegistros, setNumRegistros] = useState(0) // prop para establecer el número de registros que tiene la tabla en la base de datos
    const [registrosPorPagina, setRegistrosPorPagina] = useState(5) //número de registros a mostrar por página
    const [paginaActual, setPaginaActual] = useState(1) //prop para saber la página actual, inicia siempre en 1
    const [paginas, setPaginas] = useState(0)   //prop para calcular la cantidad de páginas que se deben crear, por ejemplo, si hay 15 registros y se quieren mostrar 5 por páginas, el total de páginas sería 3
    const [ocultarMostrarAnterior, setOcultarMostrarAnterior] = useState('') // prop para mostrar y ocultar, aquí se pondrá el nombre de una clase de bootstrap para DESHABILITAR el botón de anterior
    const [ocultarMostrarSiguiente, setOcultarMostrarSiguiente] = useState('') // prop para mostrar y ocultar, aquí se pondrá el nombre de una clase de bootstrap para HABILITAR el botón de siguiente
    const [botones, setBotones] = useState([])

    const getAllPlayers = async () => {

        const respuesta = await axios.get(URI)  //usar la URI que llega del componente PADRE

        let cantidadRegistros = respuesta.data.length
        setNumRegistros(cantidadRegistros)  //Obtener la cantida de registros de la tabla

        //calcular la cantidad de páginas (botones)
        let pages = Math.ceil(cantidadRegistros / registrosPorPagina)   //suponga que hay 8 registros y se han asignado 5 registros por página, al hacer la división el resultado es 8 / 5 = 1,6. La función ceil de JS lo que hace es redondear el resultado a la cifra siguiente, o sea a 2 páginas
        setPaginas(pages)
        /*Aquí pasa algo interesante, tal vez se intente realizar el cálculo de páginas con la siguiente instrucción, la cuál no funcionaría:

        let pages = Math.ceil(numRegistros / registrosPorPagina)
        
        ¿Por qué no funciona si se usa directamente la prop `numRegistros`?
        
        NO se puede usar en el cálculo directamente la prop `numRegistros` porque `numRegistros` es una variable de estado (state) que se actualiza de manera asíncrona. Cuando se intenta usar `numRegistros` para calcular pages, el estado no se ha actualizado todavía.
        */

    }

    useEffect(() => {
        getAllPlayers()
        paginar(paginaActual)  //inicializar con la página 1
    }, [paginas, paginaActual])// el useEffect se ejecutará al cargar la página y cuando las prop paginas y página actual se actualicen

    const paginar = (pagina) => {   //recibe el número de la página actual, esta función se encarga de mostrar el contenido de la nueva página

        setPaginaActual(pagina) //establecer la página actual
        let desdePagina = ((paginaActual - 1) * registrosPorPagina)//suponga que la página actual es 2, 2 - 1 = 1, y 1 * 5 = 5 (quiere decir que la página 2 inicia desde el registro número 5)
        setDesde(desdePagina)
        let hastaPagina = paginaActual * registrosPorPagina //suponga que la página actual es 2, 2 * 5 = 10 (quiere decir que la página 2 termina en el registro 1)
        setHasta(hastaPagina)
        //Si la página actual es la primera, entonces se deshabilita el botón de anterior
        if (paginaActual == 1) {

            setOcultarMostrarAnterior('page-item disabled')

        } else {

            setOcultarMostrarAnterior('page-item')
        }

        //Si la página actual es la última, entonces se deshabilita el botón de siguiente
        if (paginaActual == paginas) {

            setOcultarMostrarSiguiente('page-item disabled')

        } else {

            setOcultarMostrarSiguiente('page-item')

        }

        let arregloAuxiliar = []
        //pintar de color azul el botón actual (página actual)
        //crear un ciclo for que vaya desde cero hasta que sea menor a la cantidad de páginas existentes
        for (var i = 0; i < paginas; i++) {


            //Objetivo: si la página actual es igual a la posición del arreglo de los botones, entonces se cambia la clase del <li> a active

            if ((i + 1) == paginaActual) { //se le suma 1 a la i porque i empieza en cero (0) y no hay página cero, por eso se iguala a 1 para poder comparar

                arregloAuxiliar[i] = 'page-item active'

            } else {

                arregloAuxiliar[i] = 'page-item'

            }



        }

        setBotones(arregloAuxiliar)

    }// Fin función paginar

    //Función para navegar con el botón de anterior (Previous)
    const anterior = () => {

        let newPage = paginaActual - 1

        setPaginaActual(newPage)

        paginar(newPage)

    }
    //Función para navegar con el botón de siguiente (Next)
    const siguiente = () => {

        let newPage = paginaActual + 1

        setPaginaActual(newPage)

        paginar(newPage)

    }

    const goToPage = (numPage) => { 

        setPaginaActual(numPage)

        paginar(numPage)

    }
    return (
        <>
            <nav aria-label="...">
                <ul className="pagination justify-content-center">
                    <li className={ocultarMostrarAnterior}>
                        <a className="page-link" href="#" tabIndex="-1" aria-disabled="true" onClick={() => anterior()}>Previous</a>
                    </li>
                    {
                        botones.map((valorDeClase, key) => (
                            <li key={key} className={valorDeClase}><a className="page-link" href="#" onClick={() => goToPage(key + 1)}>{key + 1}</a></li>
                        ))
                    }

                    <li className={ocultarMostrarSiguiente}>
                        <a className="page-link" href="#" onClick={() => siguiente()}>Next</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination