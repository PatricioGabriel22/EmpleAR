const FILTERS = [
    { label: 'Todos', value: 'all' },
    { label: 'Urgente', value: 'urgente' },
    { label: 'Electricista', value: 'Electricista' },
    { label: 'Plomero', value: 'Plomero' },
    { label: 'Carpintero', value: 'Carpintero' },
    { label: 'Pintor', value: 'Pintor' },
    { label: 'Gasista', value: 'Gasista' },
    { label: 'Fotografo', value: 'Fotografo' },
    { label: 'Atencion cliente', value: 'Atencion cliente' },

]

export const Filters = ({ active, onChange }) => {
    return (
        <div className="flex gap-2 flex-wrap mb-5">
            {FILTERS.map(f => (
                <button
                    key={f.value}
                    onClick={() => onChange(f.value)}
                    className={`text-xs px-4 py-1.5 rounded-full border transition-all hover:cursor-pointer ${
                        active === f.value
                            ? 'bg-sky-400 text-white border-sky-400'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-sky-400'
                    }`}
                >
                    {f.label}
                </button>
            ))}
        </div>
    )
}