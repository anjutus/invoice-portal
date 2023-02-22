import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';
import { Auth0Provider } from "@auth0/auth0-react";
import history from './utils/history';
import { getConfig } from "./config";
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Auth0ProviderWithHistory>
//       <App />
//     </Auth0ProviderWithHistory>
//   </React.StrictMode>
// );
// const domain = "dev-5dathdoezkb70nvo.us.auth0.com";
// const clientId = "37lzCDNbyonRI9jqm4k9jdAEe5A0SksW";
// const audience = "https://dev-5dathdoezkb70nvo.us.auth0.com/api/v2/";


const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
 };
 const config = getConfig();
 const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

ReactDOM.render(
  <Auth0Provider  {...providerConfig}
    >
    <App/>
  </Auth0Provider>
  ,document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
