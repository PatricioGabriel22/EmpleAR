import { useState, useEffect } from 'react'
import { getJobs, deleteJob as deleteJobApi,solicitarCodigoDelete,addJob as addJobApi } from '../services/api.js'

export const useJobs = () => {
    const [jobs, setJobs] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')

    const fetchJobs = async () => {
        try {
            const { data } = await getJobs()
            setJobs(data)
            setFiltered(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const solicitarCodigo = async (id,mail) => {
        try{
            
            await solicitarCodigoDelete(id,mail)
        }catch (err) {
            console.log(err)
        }
    }

    const deleteJob = async (id,codigo) => {
        try {
            console.log(id,codigo)
            await deleteJobApi(id,codigo)
            setJobs(prev => prev.filter(j => j._id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    const addJob = async (infoJob) => {
        try {
            console.log(infoJob)
            await addJobApi(infoJob)
            
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {fetchJobs()}, [])

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
    

    return { jobs, filtered, loading, error, search, setSearch, filter, setFilter, refetch:fetchJobs,deleteJob, solicitarCodigo,addJob }
}