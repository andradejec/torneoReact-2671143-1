import { Sequelize } from "sequelize";
import MunicipioModel from "../models/municipioModel.js"

//obtener todos los municipios
export const getAllMunicipios = async (req, res) => {
    try {
        const municipios = await MunicipioModel.findAll()
        res.json(municipios)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//obtener los municipios de un departamento
export const getMunicipiosPorDepto = async (req, res) => {
    try {

        const municipios = await MunicipioModel.findAll({

            where: { idDepto: req.params.idDepto }  //Hacer la búsqueda con el id del departamento
            
        })
        console.log(municipios)
        res.json(municipios)

    } catch (error) {
        res.json({ message: error.message })
    }
}