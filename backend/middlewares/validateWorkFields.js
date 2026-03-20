export const validateWorkFields = (req, res, next) => {
    const { name, jobType, jobDescription, phone, mail, urgente } = req.body

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!mailRegex.test(mail)) {
        return res.status(400).json({ error: 'El mail no es válido' })
    }

    if (!name || !jobType || !jobDescription || !phone || !mail) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    if (typeof name !== 'string' || typeof jobType !== 'string' || typeof jobDescription !== 'string') {
        return res.status(400).json({ error: 'name, jobType y jobDescription deben ser texto' })
    }

    if (isNaN(phone)) {
        return res.status(400).json({ error: 'Hay errores en el numero de telefono'})
    }

    if (urgente !== undefined && typeof urgente !== 'boolean') {
        return res.status(400).json({ error: 'urgente debe ser true o false' })
    }

    next()
}