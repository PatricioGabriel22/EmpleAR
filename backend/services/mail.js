import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

export const enviarCodigoConfirmacion = async (destinatario, codigo) => {
    await resend.emails.send({
        from: 'EmpleAR <onboarding@resend.dev>',
        to: destinatario,
        subject: 'Código de confirmación - EmpleAR',
        html: `
            <h2>Código de confirmación</h2>
            <p>Usá este código para confirmar tu acción:</p>
            <h1 style="letter-spacing: 4px">${codigo}</h1>
            <p>Expira en 10 minutos.</p>
        `
    })
}