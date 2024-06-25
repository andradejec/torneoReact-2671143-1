import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

const URI_AUTH = 'http://localhost:8000/auth/'

const Auth = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [buttonForm, setButtonForm] = useState('Registrar')

    const [signInOrLogIn, setSignInOrLogIn] = useState('signIn')

    const [resetPass, setResetPass] = useState(false)

    const sendForm = async (e) => {

        e.preventDefault()

        if (buttonForm == 'Registrar') {

            console.log('Registrando ando ...')

            await axios.post(URI_AUTH, {
                name: name,
                email: email,
                password: password
            }).then(response => {
                if (response.data.tokenUser) {

                    localStorage.setItem('userTorneo', JSON.stringify(response.data))   //Recibir el token y registrarlo en el localStorage

                }
            })

        } else if (buttonForm == 'Iniciar Sesión') {

            console.log('Iniciando ando ...')

            await axios.post(URI_AUTH + 'login', {
                email: email,
                password: password
            }).then(response => {
                if (response.data.tokenUser) {

                    localStorage.setItem('userTorneo', JSON.stringify(response.data))   //Recibir el token y registrarlo en el localStorage
                    let miHost = window.location.host   //Trae la dirección del servidor junto con el puerto, en este caso http://localhost:5173/
                    console.log(miHost)
                    window.location.href = miHost.toString  //Convertir en texto la dirección del host y cargarla
                }
            })

        }

    }

    const switchForm = (opcion) => {

        setSignInOrLogIn(opcion)

    }


    const resetPassword = async (e) => {

        e.preventDefault()

        console.log('reseteando ando ...')

        const sendLink = await axios.post(URI_AUTH + 'request-password-reset', {
            email: email
        })

        alert(sendLink.data.message)
    }

    return (
        <>
            {
                resetPass == false ?// si no se ha presionado el botón para restablecer contraseña se muestran los botones para inicio o registro
                    signInOrLogIn == 'signIn'
                        ?   //Operador ternario para mostrar u ocultar botones para registro o inicio de sesión
                        <button className="btn btn-primary" onClick={() => { switchForm('logIn'); setButtonForm('Iniciar Sesión') }}>Iniciar sesión</button>
                        :
                        <span className="btn btn-primary" onClick={() => { switchForm('signIn'); setButtonForm('Registrar') }}>Registrarse</span>
                    : ''
            }
            {
                resetPass == false ?// si no se ha presionado el botón para restablecer contraseña se muestra el form para inicio o registro
                    <>
                        <form onSubmit={sendForm}>
                            {
                                signInOrLogIn == 'signIn'
                                    ?   //Operador ternario para ocultar el input para el nombre, solo se muestra si se quiere registrar
                                    <>
                                        <label htmlFor="name">Nombre completo: </label>
                                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </>
                                    : ''
                            }
                            <br />
                            <label htmlFor="email">Correo electrónico: </label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <br />
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <br />
                            <input type="submit" value={buttonForm} className="btn btn-success" />
                        </form>
                        <Link onClick={() => { setResetPass(!resetPass) }}>Restablecer contraseña</Link>
                    </>
                    :
                    <>
                        <form onSubmit={resetPassword}>
                            <label htmlFor="email">Correo electrónico: </label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <br />
                            <input type="submit" value="Enviar" />
                        </form>
                        <Link onClick={() => { setResetPass(!resetPass) }}>Volver</Link>
                    </>
            }
        </>
    )
}

export default Auth