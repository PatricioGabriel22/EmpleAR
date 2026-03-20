import { BsSun, BsMoon } from 'react-icons/bs'

export const Header = ({ isDark, toggleTheme }) => {
    return (
        <header className="flex items-center justify-between py-7 border-b border-zinc-200 dark:border-zinc-800 mb-8">
            <div>
                <h1 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 hover:cursor-pointer">
                    Emple<span className="text-sky-400">AR</span>
                </h1>
                <div className="flex h-2 w-full mt-1 rounded-full overflow-hidden">
                    <div className="flex-2 bg-sky-400" />
                    <div className="flex-2 bg-zinc-300" />
                    <div className="flex-2 bg-sky-400" />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 flex items-center justify-center hover:border-sky-400 transition-colors hover:cursor-pointer"
                >
                    {isDark ? <BsMoon size={15} /> : <BsSun size={15} />}
                </button>
                <button className="font-display text-sm font-bold px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:opacity-80 transition-opacity hover:cursor-pointer">
                    + Publicar trabajo
                </button>
            </div>
        </header>
    )
}