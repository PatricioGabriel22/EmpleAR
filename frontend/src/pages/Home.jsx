import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { LocalidadSearch } from '../components/LocalidadSearch'
import { Filters } from '../components/Filters'
import { JobCard } from '../components/JobCard'
import { useJobs } from '../hooks/useJobs'
import { useState } from 'react'
import { PublishModal } from '../components/PublishModal'

export const Home = ({ isDark, toggleTheme }) => {
    const { filtered, loading, error, search, setSearch, filter, setFilter, refetch,deleteJob, solicitarCodigo, addJob } = useJobs()
    //aagrewgar localidad, setLocalidad, sugerencias al useJobs

    const [showModal, setShowModal] = useState(false)
    return (
        <div className="max-w-6xl mx-auto px-6 pb-12">
            <Header isDark={isDark} toggleTheme={toggleTheme} onPublish={() => setShowModal(true)}/>

            <div className="grid grid-cols-2 gap-3 mb-4 max-sm:grid-cols-1">
                <SearchBar value={search} onChange={setSearch} />
                {/* <LocalidadSearch value={localidad} onChange={setLocalidad} sugerencias={sugerencias} /> */}
            </div>

            <Filters active={filter} onChange={setFilter} />

            <p className="text-xs text-zinc-400 mb-5">
                <span className="text-zinc-500 font-medium">{filtered.length}</span> trabajo{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            </p>

            {loading && <p className="text-sm text-zinc-400">Cargando...</p>}
            {error && <p className="text-sm text-red-400">Error: {error}</p>}

            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                {filtered.map(job => (
                    <JobCard key={job._id} job={job} onGetCodigoDelete={solicitarCodigo} onDelete={deleteJob} />
                ))}
                {!loading && filtered.length === 0 && (
                    <p className="col-span-full text-center py-16 text-zinc-400 text-sm">
                        No se encontraron trabajos
                    </p>
                )}
            </div>

            {showModal && (
                <PublishModal
                    onClose={() => setShowModal(false)}
                    onSuccess={refetch}
                    onAddJob={addJob}
                />
            )}



        </div>
    )
}