import { Router } from "express"
import {validateWorkFields} from '../middlewares/validateWorkFields.js' 
import {getAllWorks,addWork,deleteWork,editWork,codigoEditDelete} from '../controllers/work.controllers.js'

export const workRoutes = Router()



workRoutes.get('/allWorks',getAllWorks)
workRoutes.post('/addWork',validateWorkFields ,addWork)

// Solicitar código para editar o eliminar
workRoutes.post('/solicitar-codigo/:id', codigoEditDelete)

workRoutes.delete('/deleteWork/:id',deleteWork)
workRoutes.put('/editWork/:id',editWork)




