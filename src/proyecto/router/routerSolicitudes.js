import express from 'express'
import CUFactory from '../negocio/CU_InformarEstadoSolicitud/InformarEstadoSolicitudFactory.js'

const router = express.Router()

router.post('/:idSolicitud', async (req, res) => {
  try {
    const crearCU_InformarEstadoSolicitud = CUFactory.crearCU_InformarEstadoSolicitud()
    await crearCU_InformarEstadoSolicitud.validar(req.params.idSolicitud)
    res.json({ result: 'ok' })
  } catch (err) {
    throw Error(`Ocurrió un error al obtener la solicitud. Detalles: ${err}`)
  }
})

export default router