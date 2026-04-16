import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { updatePassword, uploadAvatar } from "../api/userService";
import { NotificationContext } from "../context/NotificationContext";
import "../styles/pages/ProfilePage.css";

export default function Profile() {
    const { t } = useTranslation();
    const { user, setUser, logout } = useContext(AuthContext);
    const { addNotification } = useContext(NotificationContext); 
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl || "");

    const handlePassword = e => {
        e.preventDefault();
        if (newPwd !== confirmPwd) {
            addNotification({ message: t('profile.passwordMismatch'), type: 'error' }); 
            return;
        }
        updatePassword(newPwd)
            .then(() => addNotification({ message: t('profile.passwordUpdateSuccess'), type: 'success' })) 
            .catch(() => addNotification({ message: t('profile.passwordUpdateFailed'), type: 'error' })); 
    };

    const handleAvatarChange = e => {
        const file = e.target.files[0];
        if (!file) return;
        uploadAvatar(file)
            .then(resp => {
                const url = resp.avatarUrl.startsWith('http')
                    ? resp.avatarUrl
                    : resp.avatarUrl;
                setAvatarPreview(url);
                setUser({ ...user, avatarUrl: url });
            })
            .catch(() => addNotification({ message: t('profile.avatarUploadFailed'), type: 'error' })); // <-- Замена
    };

    // ... остальной JSX без изменений ...
    if (!user) return null;
    return (
        <div className="profile-page">
            <div className="profile-card">
                <h2 className="profile-title">{t('profile.title')}</h2>

                <div className="profile-avatar">
                    {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" />
                    ) : (
                        <div className="profile-avatar--placeholder">{t('profile.noAvatar')}</div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                </div>

                <div className="profile-info">
                    <p><span>{t('profile.id')}</span> {user.id}</p>
                    <p><span>{t('profile.email')}</span> {user.email}</p>
                    <p><span>{t('profile.role')}</span> {user.role}</p>
                </div>

                <form className="profile-form" onSubmit={handlePassword}>
                    <h3>{t('profile.changePasswordTitle')}</h3>
                    <input
                        type="password"
                        value={newPwd}
                        onChange={e => setNewPwd(e.target.value)}
                        placeholder={t('profile.newPasswordPlaceholder')}
                        required
                    />
                    <input
                        type="password"
                        value={confirmPwd}
                        onChange={e => setConfirmPwd(e.target.value)}
                        placeholder={t('profile.confirmPasswordPlaceholder')}
                        required
                    />
                    <button type="submit">{t('profile.updatePasswordButton')}</button>
                </form>

                <button className="profile-logout" onClick={logout}>{t('profile.logoutButton')}</button>
            </div>
        </div>
    );
}