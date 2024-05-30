import express from 'express'
import { getAllMunicipios, getMunicipiosPorDepto } from '../controllers/municipioController.js'

const router = express.Router()

router.get('/', getAllMunicipios)
router.get('/depto/:idDepto', getMunicipiosPorDepto)    //consultar municipios por id de departamento

export default router