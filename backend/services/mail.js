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
            <div style="background-color: #000000; color: #ffffff; padding: 48px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; border-radius: 12px;">
                
                <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px; letter-spacing: -0.5px;">EmpleAR</h1>

                <p style="color: #888888; font-size: 14px; margin: 0 0 40px;">Confirmación de identidad</p>

                <div style="border-top: 1px solid #222222; margin-bottom: 40px;"></div>

                <p style="font-size: 15px; color: #aaaaaa; margin: 0 0 24px;">Usá el siguiente código para confirmar tu acción. Expira en <span style="color: #ffffff; font-weight: 600;">10 minutos</span>.</p>

                <div style="background-color: #111111; border: 1px solid #333333; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 40px;">
                    <span style="font-size: 30px; font-weight: 700; letter-spacing: 8px; color: #ffffff;">${codigo}</span>
                </div>

                <p style="font-size: 13px; color: #555555; margin: 0;">Si no solicitaste este código, ignorá este mail.</p>

                <div style="border-top: 1px solid #222222; margin-top: 40px; padding-top: 24px;">
                    <p style="font-size: 12px; color: #444444; margin: 0;">© 2025 EmpleAR. Todos los derechos reservados.</p>
                </div>

            </div>
        `
    })
}