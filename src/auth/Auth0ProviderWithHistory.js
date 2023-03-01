import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import history from '../utils/history';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-5dathdoezkb70nvo.us.auth0.com";
  const clientId = "37lzCDNbyonRI9jqm4k9jdAEe5A0SksW";
  const audience = "https://dev-5dathdoezkb70nvo.us.auth0.com/api/v2/";

  const onRedirectCallback = (appState) => {
    history((appState && appState.returnTo) || window.location.pathname);
   };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;