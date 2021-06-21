import moduloArchivos from './recepcionDeArchivos.js';
import { getRecepcionDeArchivosConfig } from '../../config.js';

const crearRecepcionDeArchivos = async () => {
    const recepcionDeArchivosConfig = getRecepcionDeArchivosConfig();
    const recepcionDeArchivos = await moduloArchivos.crearMiddleWare(recepcionDeArchivosConfig);

    return recepcionDeArchivos;
}

export default { crearRecepcionDeArchivos };
