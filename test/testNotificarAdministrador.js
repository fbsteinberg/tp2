import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import { crearServidor } from '../src/compartidos/servidor/servidor.js'
import { getServerPort } from '../src/config.js'

const servidor = crearServidor();

const port = getServerPort();
await servidor.conectar(port);

let data = new FormData();
data.append('archivo', fs.createReadStream('./test/nombreDelArchivo.jpg'));
const res = await axios.post(`http://localhost:${port}/api/notificar/cargarSolicitud`, data, {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    }
})

await servidor.desconectar();




















