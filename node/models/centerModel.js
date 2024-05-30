import db from '../database/db.js'
import { DataTypes } from 'sequelize';

const CenterModel = db.define('centros_formacion', {
    codigo_centro: { type: DataTypes.NUMBER },
    idDepto: { type: DataTypes.NUMBER },
    id_municipio: { type: DataTypes.NUMBER },
    nombre_centro: { type: DataTypes.CHAR }
}, {
    //evitar pluralización en la gestión de la tabla
    freezeTableName: true
});


export default CenterModel