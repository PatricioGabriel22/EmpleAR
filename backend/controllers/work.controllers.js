import workSchema from "../models/work.schema.js"
import crypto from 'crypto'
import {enviarCodigoConfirmacion} from '../services/mail.js'


export const getAllWorks = async (req,res) => {
    


    try {

        console.log("Obtener los trabajos disponibles")

    } catch (error) {
        console.log(error)
    }
}


export const addWork = async (req,res) => {
    const {name, jobType, jobDescription, phone, mail,urgente} = req.body


    try {

        new workSchema({
            name, 
            jobType, 
            jobDescription, 
            phone, 
            mail,
            urgente
        }).save()

        res.json({message:"Se agrego un nuevo trabajo"})
     
    } catch (error) {
        console.log(error)
    }
}

export const codigoEditDelete = async (req, res) => {
    const workID = req.params.id
    const {mail} = req.body

    console.log(mail)
    try {
        const publicacion = await workSchema.findById(workID)
        if (!publicacion) return res.status(404).json({ error: 'Publicación no encontrada' })

        
        if (mail !== publicacion.mail) {
            return res.status(403).json({ error: 'El mail no coincide con el de la publicación' })
        }

        const codigo = crypto.randomInt(100000, 999999).toString()
        const expira = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

        await workSchema.findByIdAndUpdate(req.params.id, {
            codigoConfirmacion: codigo,
            codigoExpira: expira
        })

        await enviarCodigoConfirmacion(mail, codigo)

        res.json({ mensaje: 'Código de confirmacion enviado al mail' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteWork = async (req,res) => {
    const workID = req.params.id
    const {codigo} = req.body

    try {
        const target = await workSchema.findById({_id:workID})

        if (!target) return res.status(404).json({ error: 'Trabajo no encontrado' })

        if (target.codigoConfirmacion !== codigo || target.codigoExpira < new Date()) {
            return res.status(400).json({ error: 'Código inválido o expirado' })
        }

        await target.deleteOne({_id:workID})

        res.json({message:`Se elimino el trabajo de ${target.jobType}`})
        
    } catch (error) {
        console.log(error)
        res.json({message:"No se pudo eliminar"})
    }
}

export const editWork = async (req,res) => {
    const workID = req.params.id
    const {codigo, editableInfo} = req.body


    try {
        
        const target = await workSchema.findById({_id:workID})

        if (target.codigoConfirmacion !== codigo || target.codigoExpira < new Date()) {
            return res.status(400).json({ error: 'Código inválido o expirado' })
        }

       
        // reemplaza cualquier grupo de espacios múltiples (o tabs) dentro del string por un solo espacio.
        for (const key in editableInfo) {
            const value = editableInfo[key];
            target[key] = typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : value
        }
        
        await target.save()

        res.json({message:`Trabajo actualizado`})
        
        
    } catch (error) {
        console.log(error)
        res.json({message:"No se pudo editar. Salio salio mal."})
    }
}