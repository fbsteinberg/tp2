import { crearServidor } from '../src/compartidos/servidor/servidor.js';
import { getServerPort } from '../src/config.js';
import axios from 'axios';

const servidor = crearServidor();

const port = getServerPort();
await servidor.conectar(port);

const { data } = await axios.post(`http://localhost:${port}/api/cola`, { idCliente: 0, idLocal: 0 });
console.log(data);

await servidor.desconectar();
