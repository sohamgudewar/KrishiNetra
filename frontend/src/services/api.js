import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
})

export const getDashboardStats = async () => {
  const res = await api.get('/admin/dashboard')
  return res.data
}

export const getApplications = async () => {
  const res = await api.get('/applications/')
  return res.data
}

export const getFarmers = async () => {
  const res = await api.get('/farmers/')
  return res.data
}

export const createApplication = async (data) => {
  const res = await api.post('/applications/', data)
  return res.data
}

export const approveApplication = async (id) => {
  const res = await api.post(`/admin/applications/${id}/approve`)
  return res.data
}

export const rejectApplication = async (id) => {
  const res = await api.post(`/admin/applications/${id}/reject`)
  return res.data
}

export const flagApplication = async (id, reason) => {
  const res = await api.post(`/admin/applications/${id}/flag?reason=${encodeURIComponent(reason)}`)
  return res.data
}

export default api
