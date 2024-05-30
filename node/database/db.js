import { Sequelize } from "sequelize";

//Como parámetros va el nombre de la bd, el usuario de la bd, la contraseña, {el servidor y el tipo de base de datos}
const db = new Sequelize('torneo_react', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db