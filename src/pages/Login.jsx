import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "../api/authService";
import { fetchCurrentUser } from "../api/userService";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext"; 
import "../styles/auth/LoginPage.css";

export default function Login() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(AuthContext);
    const { addNotification } = useContext(NotificationContext); 
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        login({ email, password })
            .then(() => fetchCurrentUser())
            .then(user => {
                setUser(user);
                navigate("/");
            })
            .catch(() => addNotification({ message: t('auth.loginFailed'), type: 'error' })); 
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">{t('auth.loginTitle')}</h2>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder={t('auth.emailPlaceholder')}
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder={t('auth.passwordPlaceholder')}
                />
                <button type="submit">{t('auth.loginButton')}</button>
                <p className="auth-switch">
                    {t('auth.noAccount')}<Link to="/register">{t('auth.signUpLink')}</Link>
                </p>
            </form>
        </div>
    );
}