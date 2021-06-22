import mongoDB from 'mongodb'
import {getMongoCredentials} from '../../config.js'

const {MongoClient} = mongoDB

const credentials = getMongoCredentials()

const uri = "mongodb+srv://"+credentials.username+":<"+credentials.password+">@cluster0.ifpg3.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function crearClienteMongoDB()
{
    return {
        conectar : async (dbName) => {
            await client.connect()
            const db = client.db(dbName)
            return db
        },
        desconectar : async () => {
            await client.close()
        }
    }
}

export default {crearClienteMongoDB}
