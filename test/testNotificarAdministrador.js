import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import { crearServidor } from '../src/compartidos/servidor/servidor.js'
import { getServerPort } from '../src/config.js'

try{
  
const servidor = crearServidor();

const port = getServerPort();
await servidor.conectar(port);

let data = new FormData();
data.append('nombrePropietario','Jose' )
data.append('apellido', 'perez')
data.append('mail', 'joseperez9@gmail.com')
data.append('password', 12345)
data.append('nombreLocal','g')
data.append('cantidad',5)
data.append('horarioMin',1)
data.append('horarioMax',7)
data.append('archivo', fs.createReadStream('./test/nombreDelArchivo.jpg'));
const res = await axios.post(`http://localhost:${port}/api/solicitudes/`, data, {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    }
})

await servidor.desconectar();

}
catch(e)
{
  console.log(e)
}





















