import logo from './logo.svg';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import { Dashboard } from '@mui/icons-material';
import DashboardApp from './Components/DashboardApp';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <DashboardApp/>
    </div>
  );
}

export default App;
