import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Admin from './Admin';
import Get_contacts from "./components/Get_contacts";
import './App.css';
import {MDBContainer} from "mdb-react-ui-kit";
import styles from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function App(props) {
  
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
                  <MDBContainer fluid className="py-3" style={{ backgroundColor: "#eee" }}>    
                    <Get_contacts userid = {props.userid} username = {props.username}/>
                  </MDBContainer>
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