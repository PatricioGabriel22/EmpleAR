import { useState } from 'react'
import { BsGeoAlt } from 'react-icons/bs'

export const LocalidadSearch = ({ value, onChange, sugerencias }) => {
    const [showDropdown, setShowDropdown] = useState(false)

    const filtered = sugerencias.filter(l =>
        l.toLowerCase().includes(value.toLowerCase()) && value
    )

    return (
        <div className="relative">
            <BsGeoAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
            <input
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 outline-none focus:border-sky-400 transition-colors"
                placeholder="Buscar por localidad..."
                value={value}
                onChange={e => { onChange(e.target.value); setShowDropdown(true) }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                autoComplete="off"
            />
            {showDropdown && filtered.length > 0 && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden z-10 shadow-lg">
                    {filtered.map(l => (
                        <div
                            key={l}
                            onMouseDown={() => { onChange(l); setShowDropdown(false) }}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                            {l}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}