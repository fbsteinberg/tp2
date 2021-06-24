import express from 'express';
import encolarClientesFactory from '../negocio/CU_EncolarClientes/encolarClientesFactory.js';

const crearColaClientesRouter = () => {
    const router = express.Router();

    router.post('/', async (req, res, next) => {
        try {
            const CasoDeUso_EncolarClientes = await encolarClientesFactory.crearEncolarClientes();
            await CasoDeUso_EncolarClientes.agregar(req.body);

            res.json({ message: 'CU - Encolar Clientes - Ok' });
        } catch (error) {
            next(error);
        }
    });

    router.use((error, req, res, next) => {
        switch(error.type) {
            case 'ERROR_DATOS_INVALIDOS':
                res.status(400);
                break
            case 'ERROR_DATOS_FALTANTES':
              res.status(401);
              break
            case 'ERROR_DATOS_NO_ENCONTRADOS':
              res.status(404)
              break
            default:
              res.status(500);
        }

        res.json({ message: error.message });
    });

    return router
};

export default { crearColaClientesRouter };
