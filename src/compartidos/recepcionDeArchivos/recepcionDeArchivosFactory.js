import moduloArchivos from './recepcionDeArchivos.js';
import { getRecepcionDeArchivosConfig } from '../../config.js';







async function crearRecepcionDeArchivos() {
    const recepcionDeArchivosConfig = getRecepcionDeArchivosConfig();
    const recepcionDeArchivos =  await moduloArchivos.crearMiddleWare(recepcionDeArchivosConfig)
    return recepcionDeArchivos
}

export default { crearRecepcionDeArchivos };
