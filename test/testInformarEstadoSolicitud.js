import axios from 'axios';
import { crearServidor } from '../src/compartidos/servidor/servidor.js'
import { getServerPort } from '../src/config.js'

async function main()
{
    const servidor = crearServidor();

    const port = getServerPort();
    await servidor.conectar(port);

    const { data } = await axios.post(`http://localhost:${port}/api/solicitudes/:idSolicitud`);
    console.log(data);

    await servidor.desconectar();
}

main()

