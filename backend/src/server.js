import cors from 'cors'
import express from 'express'

const puertoDeConexion = 4000


const server = express()

server.use(cors({credentials: true })) 
server.use(express.json())


server.listen(puertoDeConexion , () => {
    console.log(`Server EmpleAR running on port ${puertoDeConexion}`)
})