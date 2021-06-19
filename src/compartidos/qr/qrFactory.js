import generarQR from './qr.js';

const QRGenerador = generarQR('static');

function crearGeneradorQR(){
    return QRGenerador;
}

export default { crearGeneradorQR };
