
import api from "./axiosInstance"

export const login = ({ email, password }) =>
    api.post("/auth/login", { email, password }).then(res => {
        localStorage.setItem("token", res.data.token)
        return res.data
    })

export const register = ({ email, password, name }) =>
    api.post("/auth/register", { email, password, name })