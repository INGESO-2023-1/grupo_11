import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Admin from './Admin';
import Home from './Home'
import './App.css';
import styles from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function App() {
  
  const GearIcon = ({ to }) => (
    <Link className="App-link" to={to}>
      <FontAwesomeIcon icon={faCog} />
    </Link>
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header>
                  <nav className={styles.navbar}>
                    <div className={styles.navbarContent}>
                      <GearIcon to="/admin" />
                    </div>
                  </nav>
                </header>
                <div>
                  <Home />
                </div>
              </>
            }
            index
          />
          <Route
            path="/admin"
            element={
              <>
                <header>
                  <nav className={styles.navbar}>
                    <div className={styles.navbarContent}>
                      <GearIcon to="/" />
                    </div>
                  </nav>
                </header>
                <Admin />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;