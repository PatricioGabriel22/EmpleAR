import { useState, useEffect } from 'react'
import { getJobs } from '../services/api.js'

export const useJobs = () => {
    const [jobs, setJobs] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await getJobs()
                console.log(data)
                setJobs(data)
                setFiltered(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [])

    useEffect(() => {
        let result = jobs

        if (filter === 'urgente') result = result.filter(j => j.urgente)
        else if (filter !== 'all') result = result.filter(j => j.jobType === filter)

        if (search) {
            const campoBuscado = search.toLowerCase()
            result = result.filter(j =>
                j.name.toLowerCase().includes(campoBuscado) ||
                j.jobType.toLowerCase().includes(campoBuscado) ||
                j.jobDescription.toLowerCase().includes(campoBuscado)
            )
        }

        setFiltered(result)
    }, [search, filter, jobs])

    return { jobs, filtered, loading, error, search, setSearch, filter, setFilter }
}