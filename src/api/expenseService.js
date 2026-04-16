import api from "./axiosInstance";

export const getExpensesByBudget = budgetId =>
    api.get(`/expenses/budget/${budgetId}`).then(r => r.data);
export const getExpense = id => api.get(`/expenses/${id}`).then(r => r.data);
export const createExpense = data => api.post("/expenses", data);
export const updateExpense = (id, data) =>
    api.put(`/expenses/${id}`, data);
export const deleteExpense = id => api.delete(`/expenses/${id}`);
