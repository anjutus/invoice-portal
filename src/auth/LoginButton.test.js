import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {BrowserRouter,MemoryRouter} from 'react-router-dom'
import LoginButton from './LoginButton'
import { mocked } from "jest-mock";
import { useAuth0 } from "@auth0/auth0-react";
import history from '../utils/history'
import { getConfig } from '../config'
import { waitFor } from '@testing-library/react'
import {createMemoryHistory} from 'history'
import { Auth0Provider } from "@auth0/auth0-react";
test('LoginButton', async () => {
    const route='/';
    render(
      <MemoryRouter initialEntries={[route]}>
        <LoginButton />
      </MemoryRouter>,
    )
    expect(screen.getByRole('button',{ name: 'LoginButton' }))
  })

//   test('Login Button Click', async () => {
//     const history = createMemoryHistory();
//     const route='/';
//     const user = {
//         email: "johndoe@me.com",
//         email_verified: true,
//         sub: "google-oauth2|12345678901234",
//      };
//      jest.mock("@auth0/auth0-react");
//      const mockedUseAuth0 = mocked(useAuth0, true);
//      describe("Logged in", () => {
//         beforeEach(() => {
//             mockedUseAuth0.mockReturnValue({
//                 isAuthenticated: false,
//                 user,
//                 logout: jest.fn(),
//                 loginWithRedirect: jest.fn(),
//                 getAccessTokenWithPopup: jest.fn(),
//                 getAccessTokenSilently: jest.fn(),
//                 getIdTokenClaims: jest.fn(),
//                 loginWithPopup: jest.fn(),
//                 isLoading: false,
//             });
//         });


// const onRedirectCallback =(appState) => {
//   history.push(
//     appState && appState.returnTo ? appState.returnTo : window.location.pathname
//   );
// };
// const config = getConfig();
// const providerConfig = {
//   domain: config.domain,
//   clientId: config.clientId,
//   onRedirectCallback,
//   authorizationParams: {
//     redirect_uri: window.location.origin,
//     ...(config.audience ? { audience: config.audience } : null),
//   },
// };

// await waitFor(() =>render(
//       <MemoryRouter initialEntries={[route]}>
//         <Auth0Provider>
//         <LoginButton />
//         </Auth0Provider>
//       </MemoryRouter>,
//     ));
//     fireEvent.click(screen.getByRole('button',{ name: 'LoginButton' }))
//     expect(window.location.href).toEqual(expect.stringContaining('http://localhost/'))
//   })
// const user = {
//     email: 'johndoe@me.com',
//     email_verified: true,
//     sub: 'google-oauth2|2147627834623744883746',
//   };
//   jest.mock("@auth0/auth0-react");
//   const mockedUseAuth0 = mocked(useAuth0, true);
//   describe('logged in', () => {
//     beforeEach(() => {
//       // Mock the Auth0 hook and make it return a logged in state
//       mockedUseAuth0.mockReturnValue({
//         isAuthenticated: true,
//         user,
//         logout: jest.fn(),
//         loginWithRedirect: jest.fn(reValue),
//       });
//     });
//     const onRedirectCallback =(appState) => {
//           history.push(
//             appState && appState.returnTo ? appState.returnTo : window.location.pathname
//           );
//         };
//         const config = getConfig();
//         const providerConfig = {
//           domain: config.domain,
//           clientId: config.clientId,
//           onRedirectCallback,
//           authorizationParams: {
//             redirect_uri: window.location.origin,
//             ...(config.audience ? { audience: config.audience } : null),
//           },
//         };
// test('LoginButton Auth0 Authen', async () => {
//     const route='/';
//     render(
//       <MemoryRouter initialEntries={[route]}>
//         <Auth0Provider><LoginButton /></Auth0Provider>
        
//       </MemoryRouter>,
//     )
//     expect(screen.getByRole('button',{ name: 'LoginButton' }))
//   })
// });