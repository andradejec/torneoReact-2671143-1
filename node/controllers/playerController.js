import { Sequelize } from "sequelize";
import PlayerModel from "../models/playerModel.js";


//Mostrar todos los registros
export const getAllPlayers = async (req, res) => {
    try {
        const players = await PlayerModel.findAll()
        res.json(players)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Mostrar un registro
export const getPlayer = async (req, res) => {

    try {
        const player = await PlayerModel.findAll({
            where: { id: req.params.id }
        })
        res.json(player[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Crear un player
export const createPlayer = async (req, res) => {
    try {

        //Cambia la manera de leer los datos que llegan del formulario
        const { documento, nombres, apellidos, genero } = req.body
        //Operador ternario, si el archivo existe se toma su nombre, si no, se establece como null
        const foto = req.file ? req.file.filename : null

        await PlayerModel.create({
            documento,
            nombres,
            apellidos,
            genero,
            foto
        })
        res.json({ "message": "¡Registro creado exitosamente!" })

    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar un registro
export const updatePlayer = async (req, res) => {

    try {
        //Cambia la manera de leer los datos que llegan del formulario
        const { documento, nombres, apellidos, genero } = req.body

        //Operador ternario, si el archivo existe se toma su nombre, si no, se establece como null
        const foto = req.file ? req.file.filename : null

        if (foto != null) { //Si viene una foto actualizar teniendo en cuenta el campo foto

            await PlayerModel.update({
                documento,
                nombres,
                apellidos,
                genero,
                foto    // Aquí se tiene en cuenta el campo foto
            }, { where: { id: req.params.id } })

        } else {    //Si no viene la foto no se tiene en cuenta el campo foto porque de lo contrario borraría el nombre de la foto en la base de datos

            await PlayerModel.update({
                documento,
                nombres,
                apellidos,
                genero
            }, { where: { id: req.params.id } })
        }

        res.json({ "message": "¡Registro actualizado exitosamente!" })

    } catch (error) {
        res.json({ message: error.message })
    }
}

//Borrar un registro
export const deletePlayer = async (req, res) => {
    console.log('detele player con id ' + req.params.id)
    try {
        await PlayerModel.destroy({
            where: { id: req.params.id }
        })
        res.json({ "message": "¡Registro borrado exitosamente!" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Consultar player por documento
export const getQueryPlayer = async (req, res) => {

    try {
        const player = await PlayerModel.findAll({
            where: {
                documento: {
                    [Sequelize.Op.like]: `%${req.params.documento}%`
                    // Esta instrucción reemplaza al LIKE de una consulta en MySQL
                    // Ej: SELECT * FROM players WHERE documento LIKE '1%'
                    // Ej: SELECT * FROM players WHERE nombres LIKE '%u%'
                }

            }
        })

        res.json(player)    // Obtener la respuesta
    } catch (error) {
        res.json({ message: error.message })
    }

}