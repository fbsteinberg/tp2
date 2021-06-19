import  multer from 'multer'
import fs from 'fs'

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
        if(err.code == 'ENOENT' || err.code == 'EEXIST')
        {
            console.log('La ruta ya existe')
        }
        else
        {

            throw new Error('No se pudo crear la ruta: '+console.log(err.message))
        }
    }
}

export default{
   crearMiddleWare
}