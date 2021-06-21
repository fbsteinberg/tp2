import express from 'express'
import CUFactory from '../negocio/CU_InformarEstadoSolicitud/InformarEstadoSolicitudFactory.js'

const router = express.Router()

router.get('/:idSolicitud', async (req, res) => {
  try {
    const crearCU_AprobarRechazarSolicitud = CUFactory.crearCU_AprobarRechazarSolicitud()
    await crearCU_AprobarRechazarSolicitud.validar({
      idSolicitud: req.params.idSolicitud,
      ...req.body,
    })
    res.json({ result: 'ok' })
  } catch (err) {
    throw Error(`Ocurrió un error al obtener la solicitud. Detalles: ${err}`)
  }
})

export default router