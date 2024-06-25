import express from 'express'
import cors from 'cors'

import dotenv from 'dotenv'

import db from './database/db.js'
import playerRoutes from './routes/routerPlayers.js'
import centerRoutes from './routes/routerCenters.js'
import deptosRoutes from './routes/routerDeptos.js'
import authRoutes from './routes/routerAuth.js'

import municipioRoutes from './routes/routerMunicipios.js'

//Importar modelos para consultar con llave foranea
import CenterModel from './models/centerModel.js'
import DeptosModel from './models/deptosModel.js'
import MunicipioModel from './models/municipioModel.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/players', playerRoutes)
app.use('/centers', centerRoutes)
app.use('/deptos', deptosRoutes)
app.use('/mcipios', municipioRoutes)
app.use('/auth', authRoutes)

//Configurar express para que pueda servir los archivos estaticos desde el directorio de cargas
app.use('/public/uploads/', express.static('public/uploads/'))

//Establecer carpeta para variables de entorno con dotenv
dotenv.config({ path: './env/.env' })

try {
    await db.authenticate()
    console.log("Conexión exitosa a la db")
} catch (error) {
    console.log("Error de conexión a la db: ${error}")
}

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.listen(8000, () => {
    console.log('Server Up running in http://localhost:8000')
})

//Definición de relación entre las tablas
DeptosModel.hasMany(CenterModel, { foreignKey: 'idDepto', as: 'centers' })  //hasMany quiere decir 'tiene muchos'
CenterModel.belongsTo(DeptosModel, { foreignKey: 'idDepto', as: 'deptos' }) //belognsTo quiere decir 'pertenece a'
//El 'as' es un alias o un apodo que se le da a la tabla
MunicipioModel.hasMany(CenterModel, { foreignKey: 'id_municipio', as: 'centers' })
CenterModel.belongsTo(MunicipioModel, { foreignKey: 'id_municipio', as: 'mcipio' })

export { CenterModel, DeptosModel, MunicipioModel, dotenv } //Exportar los modelos con las relaciones establecidas