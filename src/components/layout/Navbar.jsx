import { Link } from "react-router-dom";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import "../../styles/layout/Navbar.css"

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar__brand">{t('navbar.brand')}</Link>
            <div className="navbar__links">
                 <div className="navbar__lang-switcher">
                    <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>EN</button>
                    <button onClick={() => changeLanguage('ru')} disabled={i18n.language === 'ru'}>RU</button>
                </div>
                {user && user.role === "ADMIN" && (
                    <Link to="/admin" className="navbar__link">{t('navbar.adminPanel')}</Link>
                )}

                {user ? (
                    <>
                        <Link to="/" className="navbar__link">{t('navbar.home')}</Link>
                        <Link to="/budgets" className="navbar__link">{t('navbar.budgets')}</Link>
                        <Link to="/profile" className="navbar__link">{t('navbar.profile')}</Link>
                        <button onClick={logout} className="navbar__btn">{t('navbar.logout')}</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar__link">{t('navbar.login')}</Link>
                        <Link to="/register" className="navbar__link">{t('navbar.register')}</Link>
                    </>
                )}
                 <button onClick={toggleTheme} className="navbar__theme-toggle" aria-label="Toggle theme">
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    );
}