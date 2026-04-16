import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import '../styles/pages/HomePage.css'

export default function HomePage() {
    const { t } = useTranslation();

    return (
        <>
            <div className="home-hero">
                <div className="overlay"></div>
                <div className="hero-content">
                    <h1>{t('home.title')}</h1>
                    <p>{t('home.subtitle')}</p>
                    <div className="hero-buttons">
                        <Link to="/budgets/new">{t('home.newBudget')}</Link>
                        <Link to="/budgets">{t('home.viewExpenses')}</Link>
                    </div>
                </div>
            </div>
        </>
    )
}