import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000' 
})

export const getJobs = () => api.get('/allWorks')
export const searchJobs = (query) => api.get(`/allWorks?search=${query}`)