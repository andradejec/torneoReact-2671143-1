import { useState } from "react"
import axios from "axios"

const URI_AUTH = 'http://localhost:8000/auth/'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('');

    //recibir el token que viene desde la URL, en este caso la variable se llama 'llave'
    const tokenForPassword = new URLSearchParams(location.search).get('llave'); //tokenForPassword es el nombre con el que la función del controlador espera el token
    const updatePassword = async (e) => {   //Función que se activa con el envío del formulario
        e.preventDefault();
        try {

            const response = await axios.post(`${URI_AUTH}reset-password`, { tokenForPassword, newPassword })
            setMessage(response.data.message)
            setNewPassword('')

        } catch (error) {   

            setMessage(error.data.message)

        }
    }

    return (
        <>
            <form onSubmit={updatePassword}>
                <label>Nueva contraseña:</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <button type="submit">Reset Password</button>
                {message && <p className="bg-info" >{message}, por favor vuelva al inicio de sesión.</p>}
            </form>
        </>
    )
}

export default ResetPassword