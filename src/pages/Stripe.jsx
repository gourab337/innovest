import { useContext } from 'react';

import { authContext } from '../store/Auth';

function Stripe() {
  const { token, user } = useContext(authContext);
  const data = JSON.stringify(user);
  return (
    <div>
      <button>stripe</button>
      <div>{token}</div>
      <div>{data}</div>
    </div>
  );
}

export default Stripe;
