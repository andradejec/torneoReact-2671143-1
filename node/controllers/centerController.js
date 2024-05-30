import { Sequelize } from "sequelize";
import CenterModel from "../models/centerModel.js";
import { DeptosModel } from "../app.js";    // Importar modelo modificado en el archivo app.js

//Mostrar todos los registros
export const getAllCenters = async (req, res) => {
    try {
        const centers = await CenterModel.findAll({
            //El include permite relacinar el modelo de centros de formación con el de los departamentos
            //El include hace el papel del JOIN de las consultas SQL
            include: [{
                model: DeptosModel,
                as: 'deptos'
            }]
        })
        res.json(centers)
    } catch (error) {
        res.json({ message: error.message })

    }
}
//Mostrar un registro
export const getCenter = async (req, res) => {
    try {
        const center = await CenterModel.findAll({
            where: { id: req.params.id }
        })
        res.json(center[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Crear un centro
export const createCenter = async (req, res) => {
    try {
        await CenterModel.create(req.body)
        res.json({ "message": "¡Registro creado exitosamente !" })
    } catch (error) {
        res.json({ message: error.message })
    }

}

//Actualizar un registro
export const updateCenter = async (req, res) => {
    try {
        await CenterModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({ "message": "¡Registro actualziado exitosamente!" })
    } catch (error) {
        res.json({ message: error.message })
    }

}

//Borrar un registro
export const deleteCenter = async (req, res) => {
    try {

        await CenterModel.destroy({
            where: { id: req.params.id }
        })
        res.json({ "message": "¡Registro borrado exitosamente!" })

    } catch (error) {

        res.json({ message: error.message })

    }
}

//consultar centro por nombre
export const getQueryCenter = async (req, res) => {
    console.log(req.params.nombre_centro)
    try {
        const center = await CenterModel.findAll({
            where: {
                nombre_centro: {
                    [Sequelize.Op.like]: `%${req.params.nombre_centro}%`
                }
            }
        })
        res.json(center)
    } catch (error) {
        res.json({ message: error.message })
    }
}