import './App.css';
import NavigationBar from './Components/NavigationBar';
import DashboardApp from './Pages/DashboardApp';
import ViewSingleInvoice from './Pages/ViewSingleInvoice';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListAllInvoices from './Pages/ListAllInvoices';
import CreateInvoice from './Pages/CreateInvoiceNew';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthenticationButton from './auth/AuthenticationButton';
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from './Pages/LandingPage';



// Initialze the client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 60 * 60 * 1000,

    },
  },
});

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();

console.log("isAuthenticated "+isAuthenticated)

  if (isLoading) {
    return <div>Loading ...</div>;
  }





    return (
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Router>
            <NavigationBar />
            {isAuthenticated && (
            <Routes>
              <Route exact path="/" element={<DashboardApp />} />
              <Route path="viewInvoices" element={<ListAllInvoices />} />
              <Route path="createInvoice" element={<CreateInvoice />} />
              <Route path="viewSingleInvoice" element={<ViewSingleInvoice />} />
            </Routes>
          )}
          {!isAuthenticated && (
              <Routes>
                <Route exact path="/" element={<LandingPage />} />
              </Routes>
            )
          }
          </Router>
        </QueryClientProvider>
      </div>
    );
  } 



export default App;
