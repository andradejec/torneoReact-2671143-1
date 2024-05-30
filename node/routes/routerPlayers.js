import express from "express";
import { createPlayer, deletePlayer, getAllPlayers, getPlayer, updatePlayer, getQueryPlayer } from "../controllers/playerController.js";
const router = express.Router()

router.get('/', getAllPlayers)
router.get('/:id', getPlayer)
router.post('/', createPlayer)
router.put('/:id', updatePlayer)
router.delete('/:id', deletePlayer)
//Consultar por documento de identidad
router.get('/documento/:documento', getQueryPlayer)

export default router