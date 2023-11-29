import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import AuthAPI from '../Utils/AuthAPI';

function Activate(props) {
  const [verified, setVerified] = useState(false);
  const { uid, token } = useParams();

  const verifyAccount = (e) => {
    const payload = {
      uid,
      token,
    };
    AuthAPI.activation(payload);
    setVerified(true);
  };

  if (verified) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Verify your Account:</h1>
      <button
        onClick={verifyAccount}
        style={{ marginTop: '50px' }}
        type="button"
        className="btn btn-primary"
      >
        Verify
      </button>
    </div>
  );
}

export default Activate;
