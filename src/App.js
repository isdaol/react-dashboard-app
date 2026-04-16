import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext";
import PrivateRoute from "./components/PrivateRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import HomePage from "./pages/HomePage"
import BudgetsPage from "./pages/BudgetsPage"
import BudgetForm from "./pages/BudgetForm"
import BudgetDetails from "./pages/BudgetDetails"
import ExpenseForm from "./pages/ExpenseForm"
import Navbar from "./components/layout/Navbar";
import AdminPanel from "./pages/AdminPanel";
import { Suspense } from 'react';
import { NotificationProvider } from './context/NotificationContext';
import './styles/components/Notifications.css';

export default function App() {
    return (
        <Suspense fallback="loading...">
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                <NotificationProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <HomePage />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/budgets"
                            element={
                                <PrivateRoute>
                                    <BudgetsPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/budgets/new"
                            element={
                                <PrivateRoute>
                                    <BudgetForm />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/budgets/:id"
                            element={
                                <PrivateRoute>
                                    <BudgetDetails />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/budgets/:id/edit"
                            element={
                                <PrivateRoute>
                                    <BudgetForm />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/budgets/:budgetId/expenses/new"
                            element={
                                <PrivateRoute>
                                    <ExpenseForm />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/expenses/:id"
                            element={
                                <PrivateRoute>
                                    <ExpenseForm />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <PrivateRoute>
                                    <AdminPanel />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                    </NotificationProvider>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
        </Suspense>
    )
}