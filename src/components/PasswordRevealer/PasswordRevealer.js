import React, { useState } from 'react';

import './PasswordRevealer.css';

const PasswordRevealer = ({ value }) => {
  const [shown, setShown] = useState(false);

  return (
    <div>
      <input
        type={shown ? "text" : "password"}
        value={value}
        onChange={() => {}}
      />
      <button onClick={() => setShown(!shown)}>
        Show/Hide
      </button>
    </div>
  );
};

export default PasswordRevealer;
