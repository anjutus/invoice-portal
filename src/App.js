import './App.css';
import NavigationBar from './Components/NavigationBar';
import DashboardApp from './Components/Dashboard/DashboardApp';
import ViewInvoiceDoc from './Components/InvoicePDFDocument/ViewInvoiceDoc';
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import ListInvoices from './Components/ViewInvoices/ListInvoices';
import CreateInvoice from './Components/CreateInvoiceNew';
import {QueryClient, QueryClientProvider} from 'react-query';

// Initialze the client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 60*60*1000,
    },
  },
});

function App() {
  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
          <Router>
              <NavigationBar/>
              <Routes>
                <Route exact path="/" element={<DashboardApp />} />
                <Route path="viewInvoices" element={<ListInvoices />} />
                <Route path="createInvoice" element={<CreateInvoice />} />
                <Route path="invoicepdfdocument" element={<ViewInvoiceDoc />} />
              </Routes>
          </Router>
        </QueryClientProvider>
    </div>
  );
}

export default App;
