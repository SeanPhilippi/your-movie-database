import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PasswordRevealer = ({ className, ...inputProps }) => {
  const [shown, setShown] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'block' }} className={className}>
      <input
        {...inputProps}
        type={shown ? 'text' : 'password'}
        style={{ width: '100%', paddingRight: '1.8rem' }}
      />
      <button
        type='button'
        onMouseDown={() => setShown(true)}
        onMouseUp={() => setShown(false)}
        onMouseLeave={() => setShown(false)}
        style={{
          position: 'absolute',
          right: '4px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0 2px',
          color: '#777',
          lineHeight: 1,
        }}
      >
        <FontAwesomeIcon icon={shown ? 'eye' : 'eye-slash'} />
      </button>
    </div>
  );
};

export default PasswordRevealer;
