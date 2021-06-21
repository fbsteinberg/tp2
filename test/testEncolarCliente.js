import { crearServidor } from './compartidos/servidor/servidor.js';
import { getServerPort } from './config.js';
import axios from 'axios';

const servidor = crearServidor();

const port = getServerPort();
await servidor.conectar(port);

const { data } = await axios.post(`http://localhost:${port}/cola`, { idCliente: 0, idLocal: 0 });
console.log(data);

await servidor.desconectar();
