import './App.css';
import NavigationBar from './Components/NavigationBar';
import DashboardApp from './Components/Dashboard/DashboardApp';
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import ListInvoices from './Components/ViewInvoices/ListInvoices';

function App() {
  return (
    <div className="App">
        <Router>
            <NavigationBar/>
            <Routes>
              <Route exact path="/" element={<DashboardApp />} />
              <Route path="viewInvoices" element={<ListInvoices />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
