import api from "./axiosInstance"

export const getBudgets = () =>
    api.get("/budgets").then(r => r.data)

export const getBudget = id =>
    api.get(`/budgets/${id}`).then(r => r.data)

export const createBudget = ({ total, month, title, description }) =>
    api.post("/budgets", { total, month, title, description }).then(r => r.data)

export const updateBudget = (id, { total, month, title, description }) =>
    api.put(`/budgets/${id}`, { total, month, title, description }).then(r => r.data)

export const deleteBudget = id =>
    api.delete(`/budgets/${id}`).then(r => r.data)