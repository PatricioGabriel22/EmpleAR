import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000' 
})

export const getJobs = () => api.get('/allWorks')

export const searchJobs = (query) => api.get(`/allWorks?search=${query}`)

export const solicitarCodigoDelete = (id,mail) => api.post(`/solicitar-codigo/${id}`, {mail} )

export const deleteJob = (id,codigo) => api.delete(`/deleteWork/${id}`, {data:{codigo}} )