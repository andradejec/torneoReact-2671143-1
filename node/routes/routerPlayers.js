import express from "express";
import { createPlayer, deletePlayer, getAllPlayers, getPlayer, updatePlayer, getQueryPlayer } from "../controllers/playerController.js";

import multer from 'multer'
import path from 'path'


const router = express.Router()

//Configuración de multer
const storage = multer.diskStorage({
    //Asginar la carpeta donde quedarán los archivos
    destination: (req, file, cb) => {
        //cb es Una función que se utiliza para indicar el destino del archivo.
        cb(null, 'public/uploads/')
    },
    //Renombrar el archivo con la marca del tiempo actual en milisegundos conservando la extensión original del archivo
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

router.get('/', getAllPlayers)
router.get('/:id', getPlayer)
router.post('/', upload.single('foto'), createPlayer)   //En las rutas de post y put hay que agregar el elemento que se espera recibir
router.put('/:id', upload.single('foto'), updatePlayer)
router.delete('/:id', deletePlayer)
//Consultar por documento de identidad
router.get('/documento/:documento', getQueryPlayer)

export default router