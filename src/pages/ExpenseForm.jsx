import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    createExpense,
    getExpense,
    updateExpense,
    deleteExpense
} from "../api/expenseService";
import "../styles/pages/ExpenseForm.css";

export default function ExpenseForm() {
    const { t } = useTranslation();
    const { id, budgetId: paramBudgetId } = useParams();
    const isEdit = Boolean(id);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [budgetId, setBudgetId] = useState(paramBudgetId || "");
    const navigate = useNavigate();

    useEffect(() => {
        if (isEdit) {
            getExpense(id).then(e => {
                setTitle(e.title);
                setAmount(e.amount);
                setBudgetId(e.budgetId);
            });
        }
    }, [id, isEdit]);

    const handleSubmit = e => {
        e.preventDefault();
        const dto = { title, amount: Number(amount), budgetId: Number(budgetId) };
        const action = isEdit ? updateExpense(id, dto) : createExpense(dto);
        action.then(() => navigate(`/budgets/${budgetId}`));
    };

    const handleDelete = () => {
        if (window.confirm(t('expenseForm.deleteConfirm'))) {
            deleteExpense(id).then(() => navigate(`/budgets/${budgetId}`));
        }
    };

    return (
        <form className="ef-form" onSubmit={handleSubmit}>
            <h2>{isEdit ? t('expenseForm.editTitle') : t('expenseForm.newTitle')}</h2>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={t('expenseForm.descriptionPlaceholder')}
                required
            />
            <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder={t('expenseForm.amountPlaceholder')}
                required
            />
            <div className="ef-buttons">
                <button type="submit">{isEdit ? t('expenseForm.updateButton') : t('expenseForm.createButton')}</button>
                {isEdit && (
                    <button type="button" className="ef-delete" onClick={handleDelete}>
                        {t('expenseForm.deleteButton')}
                    </button>
                )}
            </div>
        </form>
    );
}