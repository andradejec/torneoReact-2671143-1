import nodeMailer from 'nodemailer'

export const transportador = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'jorgejecp@gmail.com',
        pass: 'afzurzwptosqufeo'
    }
})

export const sendPasswordResetEmail = async (email, tokenForPassword) => {

    const RESET_URL = `http://localhost:5173/reset-password?llave=${tokenForPassword}`  //El host es donde se ejecuta el FRONT-END no el BACK-END
    const mailOptions = {
        from: 'jorgejecp@gmail.com',
        to: email,
        subject: 'Restablecer contraseña',
        text: `Por favor use el siguiente enlace para restablecer su contraseña: ${RESET_URL}`
    }

    await transportador.sendMail(mailOptions)

}
