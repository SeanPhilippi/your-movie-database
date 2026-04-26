import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchNotifications } from '../../redux/actions';
import NotificationDropdown from './NotificationDropdown';

const NotificationBell = ({ isAuthenticated, notifications, fetchNotifications }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const pollRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      pollRef.current = setInterval(fetchNotifications, 60000);
    } else {
      setOpen(false);
      clearInterval(pollRef.current);
    }
    return () => {
      clearInterval(pollRef.current);
    };
  }, [isAuthenticated, fetchNotifications]);

  if (!isAuthenticated) {
    return null;
  }

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div
      className='notification-bell'
      ref={wrapperRef}
    >
      <button
        className='notification-bell__btn'
        onClick={() => setOpen(prev => !prev)}
        aria-label='Notifications'
      >
        <FontAwesomeIcon icon='bell' />
        {unreadCount > 0 && (
          <span className='notification-bell__badge'>{unreadCount}</span>
        )}
      </button>

      {open && (
        <NotificationDropdown notifications={notifications} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  fetchNotifications: () => dispatch(fetchNotifications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBell);
