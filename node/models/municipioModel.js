import { DataTypes } from "sequelize"
import db from "../database/db.js"

const MunicipioModel = db.define('municipios', {
    mcipioCodigo: { type: DataTypes.NUMBER },
    mcipioNombre: { type: DataTypes.CHAR },
    idDepto: { type: DataTypes.NUMBER }
}, {
    freezeTableName: true
})

export default MunicipioModel