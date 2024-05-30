import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const DeptosModel = db.define('departamentos', {
    //Cuando la llave primaría de la tabla no se llama 'id' es necesario especificar el nombre del campo y establecerla como PK
    idDepartamento:{type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true},
    DepNombre: { type: DataTypes.CHAR },
    CodigoRegional: { type: DataTypes.NUMBER }

})

export default DeptosModel

