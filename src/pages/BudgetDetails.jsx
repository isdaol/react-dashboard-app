import { useEffect, useState, useMemo, useContext } from "react"; 
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext"; 
import { getBudget } from "../api/budgetService";
import { getExpensesByBudget } from "../api/expenseService";
import "../styles/pages/BudgetDetails.css";

export default function BudgetDetails() {
    const { t, i18n } = useTranslation();
    const { user } = useContext(AuthContext); 
    const { id } = useParams();
    const [budget, setBudget] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const navigate = useNavigate();


    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        getBudget(id).then(setBudget);
        getExpensesByBudget(id).then(setExpenses);
    }, [id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        
        const commentToAdd = {
            id: Date.now(),
            text: newComment,
            user: { name: user.name || 'User' }, 
            timestamp: new Date()
        };
        setComments(prev => [...prev, commentToAdd]);
        setNewComment("");
    };

    const filteredExpenses = useMemo(() => {
        
        return expenses
            .filter(e =>
                (e.description ?? e.title)
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
            .slice()
            .sort((a, b) =>
                sortAsc ? a.amount - b.amount : b.amount - a.amount
            );
    }, [expenses, search, sortAsc]);
    
    const dateLocale = i18n.language === 'ru' ? 'ru-RU' : 'en-US';

    if (!budget) return null;

    const formattedMonth = new Date(budget.month).toLocaleString(dateLocale, { month: "long", year: "numeric" });

    return (
        <div className="bd-page">
            <header className="bd-header">
                <h1 className="bd-title">{formattedMonth} – ${budget.total}</h1>
                <button
                    className="bd-edit-btn"
                    onClick={() => navigate(`/budgets/${id}/edit`)}
                >
                    {t('budgetDetails.editBudget')}
                </button>
            </header>

            <section className="bd-controls">
                <input
                    className="bd-search"
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder={t('budgetDetails.searchPlaceholder')}
                />
                <select
                    className="bd-sort"
                    value={sortAsc ? "asc" : "desc"}
                    onChange={e => setSortAsc(e.target.value === "asc")}
                >
                    <option value="asc">{t('budgetDetails.amountAsc')}</option>
                    <option value="desc">{t('budgetDetails.amountDesc')}</option>
                </select>
            </section>

            <section className="bd-expenses">
                 <header className="bd-expenses-header">
                    <h2>{t('budgetDetails.expensesTitle')}</h2>
                    <Link className="bd-add-btn" to={`/budgets/${id}/expenses/new`}>
                        {t('budgetDetails.addExpense')}
                    </Link>
                </header>
                <ul className="bd-list">
                    {filteredExpenses.map(e => (
                        <li key={e.id} className="bd-item">
                            <Link to={`/expenses/${e.id}`} className="bd-link">
                                <span className="bd-item-title">{e.title}</span>
                                <span className="bd-item-amount">${e.amount}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
            
            <section className="bd-comments">
                <h2>{t('interactivity.commentsTitle')}</h2>
                <form className="bd-comment-form" onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={t('interactivity.addCommentPlaceholder')}
                        rows="3"
                    />
                    <button type="submit">{t('interactivity.postButton')}</button>
                </form>
                <ul className="bd-comment-list">
                    {comments.map(comment => (
                        <li key={comment.id} className="bd-comment-item">
                            <strong className="bd-comment-author">{comment.user.name}</strong>
                            <p className="bd-comment-text">{comment.text}</p>
                            <span className="bd-comment-time">
                                {comment.timestamp.toLocaleString(dateLocale)}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}