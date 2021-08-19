import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
import Album from './components/Album';
import Artist from './components/Artist';
import Results from './components/Results';

function App() {
  return (
    <div className="App">
      <Router>
        <AppNavbar />
        <Route exact path="/" component={Results} />
        <Route exact path="/albums/:id" component={Album} />
        <Route exact path="/artists/:id" component={Artist} />
      </Router>
    </div>
  );
}

export default App;
