import { useState } from 'react'
import { createPortal } from 'react-dom'
import { BsX, BsEnvelope, BsShieldLock } from 'react-icons/bs'
import { MdDeleteForever } from 'react-icons/md'

export const DeleteModal = ({ job, onClose, onRequestCode, onConfirmDelete }) => {
    const [step, setStep] = useState(1)
    const [mail, setMail] = useState('')
    const [codigo, setCodigo] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleRequestCode = async () => {
        if (!mail) return setError('Ingresá tu mail')
        setLoading(true)
        setError(null)
        try {
            
            await onRequestCode(job._id, mail)
            setStep(2)
        } catch (err) {
            setError(err.response?.data?.error || 'Error al enviar el código')
        } finally {
            setLoading(false)
        }
    }

    const handleConfirm = async () => {
        if (!codigo) return setError('Ingresá el código')
        setLoading(true)
        setError(null)
  
        try {
            console.log(job._id, codigo)
            await onConfirmDelete(job._id, codigo)
            onClose()
        } catch (err) {
            setError(err.response?.data?.error || 'Código inválido o expirado')
        } finally {
            setLoading(false)
        }
    }

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-sm shadow-2xl">

                <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
                    <div>
                        <h2 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100">
                            {step === 1 ? 'Confirmar eliminación' : 'Ingresá el código'}
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            {step === 1 ? `Publicación de ${job.name}` : `Código enviado a ${mail}`}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-red-400 hover:text-red-400 transition-colors"
                    >
                        <BsX size={18} />
                    </button>
                </div>

                <div className="px-6 py-5 flex flex-col gap-4">
                    {step === 1 ? (
                        <>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Ingresá el mail con el que publicaste el trabajo. Te enviaremos un código de confirmación.
                            </p>
                            <div className="flex flex-col gap-1.5">
                                <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                    <BsEnvelope size={12} /> Mail
                                </label>
                                <input
                                    className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 outline-none focus:border-red-400 transition-colors"
                                    placeholder="tu@mail.com"
                                    value={mail}
                                    onChange={e => setMail(e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Revisá tu casilla y pegá el código de 6 dígitos que te enviamos.
                            </p>
                            <div className="flex flex-col gap-1.5">
                                <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                    <BsShieldLock size={12} /> Código
                                </label>
                                <input
                                    className="w-full px-3 py-2.5  bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 outline-none focus:border-red-400 transition-colors text-center tracking-widest font-mono text-lg"
                                    placeholder="Ingresa el codigo aqui"
                                    maxLength={6}
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => { setStep(1); setError(null) }}
                                className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors text-left"
                            >
                                ¿No recibiste el código? Volvé a intentarlo
                            </button>
                        </>
                    )}

                    {error && <p className="text-xs text-red-400">{error}</p>}
                </div>

                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-600 transition-colors">
                        Cancelar
                    </button>
                    <button
                        onClick={step === 1 ? handleRequestCode : handleConfirm}
                        disabled={loading}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                        <MdDeleteForever size={16} />
                        {loading ? 'Procesando...' : step === 1 ? 'Enviar código' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}