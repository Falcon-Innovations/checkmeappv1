import React from 'react';

import {Context as UserContext} from '../../contexts/userContext';

function ResolveAuth() {
  const {tryLocalSignIn} = React.useContext(UserContext);

  React.useEffect(() => {
    tryLocalSignIn();
  }, []);
  return null;
}

export default ResolveAuth;
