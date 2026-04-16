// src/api/userService.js
import api from "./axiosInstance"

export const fetchCurrentUser = () =>
    api.get("/users/me").then(res => res.data)

export const updatePassword = newPassword =>
    api.put("/users/me/password", { newPassword }).then(r => r.data)

export const uploadAvatar = file => {
    const form = new FormData()
    form.append("file", file)
    return api.post("/users/me/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" }
    }).then(r => r.data)
}

export const fetchAllUsers = () =>
    api.get("/users/all").then(r => r.data)

export const updateUserRole = (userId, role) =>
    api.put(`/users/${userId}/role`, { role }).then(r => r.data)

export const messageUser = (userId, subject, body) =>
    api.post(`/users/${userId}/message`, { subject, body }).then(r => r.data)
