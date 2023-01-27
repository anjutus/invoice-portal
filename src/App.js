import './App.css';
import NavigationBar from './Components/NavigationBar';
import DashboardApp from './Components/Dashboard/DashboardApp';
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import ListInvoices from './Components/ViewInvoices/ListInvoices';
import CreateInvoice from './Components/CreateInvoiceNew';

function App() {
  return (
    <div className="App">
        <Router>
            <NavigationBar/>
            <Routes>
              <Route exact path="/" element={<DashboardApp />} />
              <Route path="viewInvoices" element={<ListInvoices />} />
              <Route path="createInvoice" element={<CreateInvoice />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
