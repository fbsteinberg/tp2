import moduloArchivos from './recepcionDeArchivos.js';
import { getRecepcionDeArchivosConfig } from '../../config.js';

const recepcionDeArchivosConfig = getRecepcionDeArchivosConfig();

const recepcionDeArchivos = await moduloArchivos.crearMiddleWare(recepcionDeArchivosConfig)

function crearRecepcionDeArchivos() {
    return recepcionDeArchivos;
}

export default { crearRecepcionDeArchivos };
