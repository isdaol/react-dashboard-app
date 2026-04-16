import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchAllUsers, updateUserRole, messageUser } from "../api/userService";
import "../styles/pages/AdminPanel.css";

export default function AdminPanel() {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState({ subject: "", body: "" });

    useEffect(() => {
        fetchAllUsers().then(setUsers);
    }, []);

    const handleRoleChange = (id, role) => {
        updateUserRole(id, role).then(() => {
            setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
        });
    };

    const handleSendMessage = () => {
        if (!selectedUser) return;
        messageUser(selectedUser.id, message.subject, message.body).then(() => {
            setMessage({ subject: "", body: "" });
            setSelectedUser(null);
        });
    };

    return (
        <div className="admin-panel">
            <h2>{t('admin.title')}</h2>
            <table className="admin-table">
                <thead>
                <tr>
                    <th>{t('admin.emailHeader')}</th>
                    <th>{t('admin.roleHeader')}</th>
                    <th>{t('admin.changeRoleHeader')}</th>
                    <th>{t('admin.messageHeader')}</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <select
                                value={user.role}
                                onChange={e => handleRoleChange(user.id, e.target.value)}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </td>
                        <td>
                            <button onClick={() => setSelectedUser(user)}>{t('admin.messageButton')}</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedUser && (
                <div className="message-form">
                    <h3>{t('admin.messageTo', { email: selectedUser.email })}</h3>
                    <input
                        type="text"
                        value={message.subject}
                        onChange={e => setMessage({ ...message, subject: e.target.value })}
                        placeholder={t('admin.subjectPlaceholder')}
                    />
                    <textarea
                        value={message.body}
                        onChange={e => setMessage({ ...message, body: e.target.value })}
                        placeholder={t('admin.messagePlaceholder')}
                        rows={4}
                    />
                    <button onClick={handleSendMessage}>{t('admin.sendButton')}</button>
                </div>
            )}
        </div>
    );
}