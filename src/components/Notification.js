import { useEffect } from 'react';

import styles from './Notification.module.css';

const Notification = ({ message, setMessage, error, setError }) => {
  useEffect(() => {
    const delay = setTimeout(() => {
      setMessage('');
      setError(false);
    }, 2000);

    return () => {
      clearTimeout(delay);
    };
  }, [message, setMessage, setError]);

  if (message === '') {
    return null;
  }

  return (
    <div
      id="notification-message"
      className={
        error ? [styles.message, styles.error].join(' ') : styles.message
      }
    >
      {message}
    </div>
  );
};

export default Notification;
