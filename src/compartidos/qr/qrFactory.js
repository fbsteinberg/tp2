import generarQR from './qr.js';
import {getQRDirectoryConfig} from '../../config.js';

const QRGenerador = generarQR(getQRDirectoryConfig());

function crearGeneradorQR(){
    return QRGenerador;
}

export default { crearGeneradorQR };
