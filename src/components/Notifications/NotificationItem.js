import React from 'react';
import { useHistory } from 'react-router-dom';

const typeLabels = {
  profile_comment: 'commented on your list',
  announcement: 'Site announcement',
};

const timeAgo = dateStr => {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const NotificationItem = ({ notification, onRead }) => {
  const history = useHistory();
  const { _id, type, actor, link, read, createdAt } = notification;

  const label =
    type === 'profile_comment' && actor
      ? `${actor} ${typeLabels.profile_comment}`
      : typeLabels[type] || 'Notification';

  const handleClick = () => {
    onRead(_id);
    if (link) history.push(link);
  };

  return (
    <div
      className={`notification-item${read ? '' : ' notification-item--unread'}`}
      onClick={handleClick}
      role='button'
      tabIndex={0}
      onKeyDown={event => event.key === 'Enter' && handleClick()}
    >
      <span className='notification-item__text'>{label}</span>
      <span className='notification-item__time'>{timeAgo(createdAt)}</span>
    </div>
  );
};

export default NotificationItem;
