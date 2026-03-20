import { useState } from 'react'
import { Home } from './pages/Home'

function App() {
    const [isDark, setIsDark] = useState(false)

    const toggleTheme = () => {
        setIsDark(prev => {
            const next = !prev
            document.documentElement.classList.toggle('dark', next)
            return next
        })
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
            <Home isDark={isDark} toggleTheme={toggleTheme} />
        </div>
    )
}

export default App