import { Sequelize } from "sequelize";
import DeptosModel from "../models/deptosModel.js"

export const getAllDeptos = async (req, res) => {

    try {

        const deptos = await DeptosModel.findAll()
        res.json(deptos)

    } catch (error) {

        res.json({ message: error.message })

    }

}