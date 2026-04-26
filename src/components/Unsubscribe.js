import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import api from '../utils/api/api';

const CATEGORY_LABELS = {
  profileComments: 'profile comment',
  announcements: 'site announcement',
};

const Unsubscribe = () => {
  const [status, setStatus] = useState('loading');
  const [category, setCategory] = useState(null);
  const { token } = useParams();
  const { search } = useLocation();

  useEffect(() => {
    const cat = new URLSearchParams(search).get('category');
    setCategory(cat);
    api.users.post
      .unsubscribe(token, cat)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [token, search]);

  const label = CATEGORY_LABELS[category] || 'notification';

  return (
    <div className='unsubscribe-page' style={{ flex: 1 }}>
      <div className='unsubscribe-container'>
        {status === 'loading' && <p>Processing…</p>}

        {status === 'success' && (
          <>
            <h3>Unsubscribed</h3>
            <p>You've been unsubscribed from <strong>{label}</strong> emails.</p>
            <p>
              You can re-enable this at any time in your{' '}
              <Link to='/settings'>notification settings</Link>.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <h3>Invalid Link</h3>
            <p>This unsubscribe link is invalid or has already been used.</p>
            <p>
              Manage your preferences in{' '}
              <Link to='/settings'>account settings</Link>.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
