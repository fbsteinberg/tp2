import express from 'express'
import CUFactory from '../negocio/CU_InformarEstadoSolicitud/InformarEstadoSolicitudFactory.js'

const router = express.Router()

const crearSolicitudesRouter = () => {
  router.post('/:idSolicitud', async (req, res, next) => {
    try {
      const crearCU_InformarEstadoSolicitud = CUFactory.crearCU_InformarEstadoSolicitud()
      await crearCU_InformarEstadoSolicitud.validar(req.params.idSolicitud)
      res.json({ result: 'ok' })
    } catch (err) {
      next(err)
    }
  })

  router.use((error, req, res, next) => {
    switch(error.type) {
      case 'ERROR_DATOS_INVALIDOS':
      case 'ERROR_DATOS_FALTANTES':
        res.status(400);
      case 'ERROR_DATOS_NO_ENCONTRADOS':
        res.status(404)
      default:
        res.status(500);
    }

    res.json({ message: error.message });
  });
}

export default { crearSolicitudesRouter }