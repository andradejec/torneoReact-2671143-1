import bcryptjs from 'bcryptjs'
import UserModel from '../models/userModel.js'

import jwt from 'jsonwebtoken'
import { sendPasswordResetEmail } from '../servicios/emailService.js'
import { where } from 'sequelize'

export const createUser = async (req, res) => { //Función para crear usuarios

    try {
        //Cambia la manera de leer los datos que llegan del formulario
        const { name, email, password } = req.body
        //Validar si ya existe un usuario con el mismo correo
        let user = await UserModel.findOne({ where: { email: email } })
        if (user) { //Si el usuario existe, no permite la creación del usuario
            res.json({ "message": "El usuario ya existe" })
        } else {    //Si el usuario no existe, permite la creación
            //encriptar el password
            let passHash = await bcryptjs.hash(password, 6) //el número representa la cantidad de veces que se ejecuta el hash para encriptar la clave
            //enviar datos a base de datos
            const userOk = await UserModel.create({
                "name": name,
                "email": email,
                "password": passHash
            })
            //Para generar el token se asignan 3 elementos en este caso: 1ro los datos que se obtienen del usuario, 2do la llave del archivo .env y 3ro la duración de la sesión
            const tokenUser = jwt.sign({ user: { email: userOk.email } }, process.env.JWT_LLAVE, { expiresIn: '4h' })

            // console.log("TOKEN: " + tokenUser)

            res.json({ tokenUser })

        }

    } catch (error) {

        res.json({ "message": error })

    }
}


export const verifyToken = (req, res) => {

    const token = req.header('Authorization').replace('Bearer ', '')    //Borrar cabecera y dejar limpio el token para compararlo después con la llave definida en el .env
    if (!token) {
        res.status(401).json({ message: 'Acceso denegado' })
    }

    try {
        const decodificado = jwt.verify(token, process.env.JWT_LLAVE)   //Verificar que el token no ha sido manipulado, se revisa con la llave creada en .env
        req.user = decodificado
        res.status(200).json({ message: 'Token valido' })
    } catch (error) {
        res.status(400).json({ message: 'Token invalido' })
    }

}

export const logInUser = async (req, res) => {

    const { email, password } = req.body    //Recibir los datos del form

    try {

        const userOk = await UserModel.findOne({ where: { email: email } }) //Buscar el usuario con ese correo

        if (!userOk || !bcryptjs.compareSync(password, userOk.password)) {  //preguntar si no existe o si el password es incorrecto

            res.status(401).json({ message: 'Usuario o clave inválidos' })

        } else {
            //Si el usuario y el password son correctos, se crea la variable token
            const tokenUser = jwt.sign({ user: { email: userOk.email } }, process.env.JWT_LLAVE, { expiresIn: '4h' })

            res.json({ tokenUser }) // se retorna el token
        }

    } catch (error) {

        res.status(500).json({ message: error.message })
    }

}

export const getResetPassword = async (req, res) => {   //función para 
    const { email } = req.body  //recibir el correo

    const user = await UserModel.findOne({ where: { email: email } })  //consultar al usuario con ese correo

    if (!user) {

        res.status(404).json({ message: 'usuario no encontrado' })  //si el usuario no existe se envía este mensaje

    } else {
        console.log(user.id)
        const tokenForPassword = jwt.sign({ user: { id: user.id, name: user.name, email: user.email } }, process.env.JWT_LLAVE, { expiresIn: '30m' })
        // console.log(tokenForPassword)

        //en este token, a manera de ejemplo, se traen más datos del usuario (id, name, email)
        await sendPasswordResetEmail(email, tokenForPassword)

        res.status(200).json({ message: 'El mensaje para restablecer contraseña fue enviado correctamente' })

    }

}

export const setNewPassword = async (req, res) => { //Función que recibe la nueva contraseña

    const { tokenForPassword, newPassword } = req.body

    try {
        // extrae los datos que se enviarion en el token, estos datos reciben el nombre de payload
        const decodificado = jwt.verify(tokenForPassword, process.env.JWT_LLAVE)
        
        const user = await UserModel.findByPk(decodificado.user.id)  //la función findByPk del modelo, buscar un registro por su Primary Key
        //recuerde que cuando se creo el token se puso una variable llamada user y dentro los campos, por ese motivo la instrucción es 'decodificado.user.id'

        if (!user) {

            res.status(404).json({ message: 'Usuario no encontrado' })

        } else {
            //si el usuario existe, se hace el proceso para encriptar el nuevo password
            let passHash = await bcryptjs.hash(newPassword, 6) //el número representa la cantidad de veces que se ejecuta el hash para encriptar la clave
            //se actualiza el password del usuario
            await UserModel.update({
                password: passHash
            }, { where: { id: decodificado.user.id } })

            res.status(200).json({ message: 'Contraseña actualizada correctamente' })
        }

    } catch (error) {

        res.status(400).json({ message: 'Información inválida o el tiempo ha expirado' })
    }

}

