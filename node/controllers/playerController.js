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
        await PlayerModel.create(req.body)
        res.json({ "message": "¡Registro creado exitosamente!" })

    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar un registro
export const updatePlayer = async (req, res) => {
    try {
        await PlayerModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({ "message": "¡Registro actualziado exitosamente!" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Borrar un registro
export const deletePlayer = async (req, res) => {
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