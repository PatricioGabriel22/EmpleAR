import { BsSearch } from 'react-icons/bs'

export const SearchBar = ({ value, onChange }) => {
    return (
        <div className="relative">
            <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
            <input
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 outline-none focus:border-sky-400 transition-colors"
                placeholder="Buscar por nombre o tipo de trabajo..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}