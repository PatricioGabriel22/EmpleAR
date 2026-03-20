import cors from 'cors'
import express from 'express'

import {connectDB} from './DB.js'
import { workRoutes } from '../routes/work.Routes.js'

import dotenv from 'dotenv'

dotenv.config()

const puertoDeConexion = 4000
const nombreColeccion = "emplear"
const server = express()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@emplear.fz5wmzc.mongodb.net/${nombreColeccion}`


server.use(cors({credentials: true })) 
server.use(express.json())

server.use(workRoutes)

try {
    await connectDB(uri)
} catch (error) {
    console.log(error)
}



server.listen(puertoDeConexion , () => {
    console.log(`Server EmpleAR running http://localhost:${puertoDeConexion}`)
})

server.get('/', (req,res)=>{
    res.send("Conectado al server de EmpleAR")
})