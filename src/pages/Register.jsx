import { useState, useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { register } from "../api/authService";
import { NotificationContext } from "../context/NotificationContext"; 
import "../styles/auth/LoginPage.css";

export default function Register() {
    const { t } = useTranslation();
    const { addNotification } = useContext(NotificationContext); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            navigate("/login");
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            addNotification({ message: t('auth.registrationFailed', { message }), type: 'error' }); 
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">{t('auth.registerTitle')}</h2>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t('auth.namePlaceholder')}
                    required
                />
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
                <button type="submit" >{t('auth.signUpButton')}</button>
                <p className="auth-switch">
                    {t('auth.haveAccount')}<Link to="/login">{t('auth.loginLink')}</Link>
                </p>
            </form>
        </div>
    );
}