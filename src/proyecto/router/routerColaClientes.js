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
        if (error.type === 'ERROR_DATOS_INVALIDOS') {
          res.status(400);
        } else {
          res.status(500);
        }
    
        res.json({ message: error.message });
    });
    
    return router
};

export default { crearColaClientesRouter };
