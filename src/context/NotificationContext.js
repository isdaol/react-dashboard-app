import React, { createContext, useState, useCallback, useMemo } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((notification) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { ...notification, id }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000); 
    }, []);

    const value = useMemo(() => ({ addNotification }), [addNotification]);

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <NotificationContainer notifications={notifications} />
        </NotificationContext.Provider>
    );
};

const NotificationContainer = ({ notifications }) => (
    <div className="notification-container">
        {notifications.map(n => (
            <Notification key={n.id} {...n} />
        ))}
    </div>
);

const Notification = ({ message, type }) => (
    <div className={`notification notification--${type}`}>
        {message}
    </div>
);