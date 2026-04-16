import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createBudget, getBudget, updateBudget } from "../api/budgetService";
import "../styles/pages/BudgetForm.css";

export default function BudgetForm() {
    const { t } = useTranslation();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [month, setMonth] = useState("");
    const [total, setTotal] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isEdit) {
            getBudget(id).then(b => {
                setMonth(b.month);
                setTotal(b.total);
                setTitle(b.title);
                setDescription(b.description);
            });
        }
    }, [id, isEdit]);

    const handle = e => {
        e.preventDefault();
        const dto = { month, total: Number(total), title, description };
        const action = isEdit ? updateBudget(id, dto) : createBudget(dto);
        action.then(() => navigate("/budgets"));
    };

    return (
        <form className="bp-form" onSubmit={handle}>
            <h2>{isEdit ? t('budgetForm.editTitle') : t('budgetForm.newTitle')}</h2>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={t('budgetForm.titlePlaceholder')}
                required
            />
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={t('budgetForm.descriptionPlaceholder')}
                rows={3}
            />
            <input
                type="date"
                value={month}
                onChange={e => setMonth(e.target.value)}
                required
            />
            <input
                type="number"
                value={total}
                onChange={e => setTotal(e.target.value)}
                placeholder={t('budgetForm.totalPlaceholder')}
                required
            />
            <button type="submit">{isEdit ? t('budgetForm.updateButton') : t('budgetForm.createButton')}</button>
        </form>
    );
}