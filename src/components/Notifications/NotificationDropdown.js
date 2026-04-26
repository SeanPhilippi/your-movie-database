import React from 'react';
import { connect } from 'react-redux';
import NotificationItem from './NotificationItem';
import { markAllNotificationsRead, markNotificationRead } from '../../redux/actions';

const NotificationDropdown = ({ notifications, markAllRead, markRead }) => {
  const unread = notifications.filter(notification => !notification.read);

  return (
    <div className='notification-dropdown'>
      <div className='notification-dropdown__header'>
        <span>Notifications</span>
        {unread.length > 0 && (
          <button
            className='notification-dropdown__mark-all'
            onClick={markAllRead}
          >
            Mark all read
          </button>
        )}
      </div>

      <div className='notification-dropdown__list'>
        {unread.length === 0 ? (
          <div className='notification-dropdown__empty'>No new notifications.</div>
        ) : (
          unread.map(notification => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onRead={markRead}
            />
          ))
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  markAllRead: () => dispatch(markAllNotificationsRead()),
  markRead: id => dispatch(markNotificationRead(id)),
});

export default connect(null, mapDispatchToProps)(NotificationDropdown);
