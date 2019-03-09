import React from 'react';

import './NoProvider.scss';

const NoProvider = () => (
  <div className="no-provider">
    <p>You dont have a web3 provider, please install one to continue using
      <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">🔥</span>
      Firestarter.
    </p>
  </div>
);

export default NoProvider;
