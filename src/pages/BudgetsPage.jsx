import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { getBudgets, deleteBudget } from "../api/budgetService"
import "../styles/pages/BudgetsPage.css"

export default function BudgetsPage() {
    const { t, i18n } = useTranslation();
    const [budgets, setBudgets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getBudgets()
            .then(data => {
                console.log(data);
                setBudgets(data);
            });
    }, []);

    const handleDelete = id => {
        deleteBudget(id).then(() => {
            setBudgets(budgets.filter(b => b.id !== id));
        });
    };

    // Определяем локаль для форматирования даты
    const dateLocale = i18n.language === 'ru' ? 'ru-RU' : 'en-US';

    return (
        <div className="bp-page">
            <header className="bp-header">
                <h1 className="bp-title">{t('budgets.title')}</h1>
                <button className="bp-new" onClick={() => navigate("/budgets/new")}>
                    {t('budgets.newBudget')}
                </button>
            </header>
            <ul className="bp-list">
                {budgets.map(b => (
                    <li key={b.id} className="bp-item">
                        <Link to={`/budgets/${b.id}`} className="bp-link">
                            <div className="bp-info">
                                <span className="bp-month">{new Date(b.month).toLocaleString(dateLocale, { month: "long", year: "numeric" })}</span>
                                <h2 className="bp-title-sm">{b.title}</h2>
                                <p className="bp-desc">{b.description}</p>
                            </div>
                            <span className="bp-total">${b.total}</span>
                        </Link>
                        <div className="bp-actions">
                            <button className="bp-edit" onClick={() => navigate(`/budgets/${b.id}/edit`)}>{t('budgets.edit')}</button>
                            <button className="bp-del" onClick={() => handleDelete(b.id)}>{t('budgets.delete')}</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}