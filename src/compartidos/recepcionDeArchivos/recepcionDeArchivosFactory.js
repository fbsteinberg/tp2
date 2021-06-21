import moduloArchivos from './recepcionDeArchivos.js';
import { getRecepcionDeArchivosConfig } from '../../config.js';

async function main()
{
    const recepcionDeArchivosConfig = getRecepcionDeArchivosConfig();
    return await moduloArchivos.crearMiddleWare(recepcionDeArchivosConfig)
}





function crearRecepcionDeArchivos() {
    return main()
}

export default { crearRecepcionDeArchivos };
