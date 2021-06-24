import  multer from 'multer'
import fs from 'fs'
import {crearErrorCarpetaNoPudoCrearse} from '../../proyecto/errores/errorRuta.js'

async function crearMiddleWare(rutaArchivos)
{
    await crearDirectorio(rutaArchivos)
    const almacenadorDeArchivos = multer.diskStorage(
        {
            destination: rutaArchivos,
            filename: (req,file,callback) => {
                callback(null, file.originalname)
            }
        }
    )
    const subirArchivo =  multer({storage : almacenadorDeArchivos})
    return subirArchivo
}

async function crearDirectorio(ruta)
{
    try{
        await fs.promises.mkdir(ruta)
        console.log('Ruta creada exitosamente')
    }
    catch(err)
    {
        if(err.code != 'ENOENT' && err.code != 'EEXIST')
        {
            throw crearErrorCarpetaNoPudoCrearse('No se pudo crear la ruta')
        }
    }
}

export default{
   crearMiddleWare
}