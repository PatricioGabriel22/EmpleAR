import { useState } from 'react'
import { BsX, BsPerson, BsGeoAlt, BsBriefcase, BsTextParagraph, BsTelephone, BsEnvelope } from 'react-icons/bs'

import {FILTERS} from '../services/filters.js'

const INITIAL = { name: '', localidad: '', jobType: '', jobDescription: '', phone: '', mail: '', urgente: false }

export const PublishModal = ({ onClose, onSuccess, onAddJob }) => {
    const [form, setForm] = useState(INITIAL)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async () => {
        setError(null)

        const { name, localidad, jobType, jobDescription, phone, mail } = form

        if (!name || !localidad || !jobType || !jobDescription || !phone || !mail) {
            return setError('Completá todos los campos antes de publicar')
        }

        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!mailRegex.test(mail)) {
            return setError('El mail no es válido')
        }

        if (isNaN(phone)) {
            return setError('El teléfono debe ser un número')
        }

    



        setLoading(true)
        setError(null)
        try {
            onAddJob(form)
            onSuccess()
            onClose()
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.error || 'Error al publicar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
                    <div>
                        <h2 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100">Publicar trabajo</h2>
                        <p className="text-xs text-zinc-400 mt-0.5">Completá los datos del aviso</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-sky-400 hover:text-sky-400 transition-colors"
                    >
                        <BsX size={18} />
                    </button>
                </div>

                {/* Form */}
                <div className="px-6 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">

                    <Field icon={<BsPerson size={14} />} label="Nombre">
                        <input required name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre completo" className={inputClass} />
                    </Field>

                    <Field icon={<BsGeoAlt size={14} />} label="Localidad">
                        <input name="localidad" value={form.localidad} onChange={handleChange} placeholder="Ej: Lomas de Zamora" className={inputClass} />
                    </Field>

                    <Field icon={<BsBriefcase size={14} />} label="Tipo de trabajo">
                        <select name="jobType" value={form.jobType} onChange={handleChange} className={inputClass}>
                            <option value="">Seleccioná un tipo</option>
                            {FILTERS.slice(2).map(filter => (
                                <option>{filter.value}</option>
                            ))}
                        </select>
                    </Field>

                    <Field icon={<BsTextParagraph size={14} />} label="Descripción">
                        <textarea name="jobDescription" value={form.jobDescription} onChange={handleChange} placeholder="Describí el trabajo que necesitás..." rows={3} className={`${inputClass} resize-none`} />
                    </Field>

                    <Field icon={<BsTelephone size={14} />} label="Teléfono">
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+54 11 1234-5678" className={inputClass} />
                    </Field>

                    <Field icon={<BsEnvelope size={14} />} label="Mail">
                        <input name="mail" value={form.mail} onChange={handleChange} placeholder="tu@mail.com" className={inputClass} />
                    </Field>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" name="urgente" checked={form.urgente} onChange={handleChange} className="w-4 h-4 accent-sky-400" />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">Marcar como urgente</span>
                    </label>

                    {error && <p className="text-xs text-red-400">{error}</p>}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-2 text-sm font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                        {loading ? 'Publicando...' : 'Publicar'}
                    </button>
                </div>
            </div>
        </div>
    )
}

const inputClass = "w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 outline-none focus:border-sky-400 transition-colors"

const Field = ({ icon, label, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {icon} {label}
        </label>
        {children}
    </div>
)