import QRCode from 'qrcode'

function generarQR(ruta) {
    return {
        generar: async (opciones) => {
            try {
                opciones.visualizacion = {
                    width: opciones.ancho,
                    margin: opciones.margen,
                    color: {
                        dark: opciones.colorQR,
                        light: opciones.colorFondo
                    }
                }
                QRCode.toFile(`${ruta}/${opciones.archivo}`, opciones.texto, opciones.visualizacion)
                console.log(`QR Generado exitosamente en ${ruta}/${opciones.archivo}`)
            } catch (err) {
                throw Error(`Ocurrió un error al general el QR. Detalles: ${err}`)
            }
        }
    }
}

export default generarQR