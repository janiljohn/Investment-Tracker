import './App.css'
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import PremiumPage from './pages/PremiumPage';
import StockContext from "./context/StockContext";

import {Amplify} from 'aws-amplify';
import awsExports from "./aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from "aws-amplify";
import Landing from './Landing';
import Dashboard from './components/Dashboard';
import { useState } from 'react';

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_xvQFSV6dz",
    userPoolWebClientId: "4emb8tm73brlrv7dpn4l0o6ig8"
  }
})

function App() {

  const [stockSymbol, setStockSymbol] = useState("");

  return(
    <div className="App">
      {/* <Router>
        <div className="content">
          <NavLink className="content" exact activeClassName="active" to="/">Home</NavLink>
          <NavLink className="content" activeClassName="active" to="/about">About</NavLink>
          <NavLink className="content" activeClassName="active" to="/premium">Premium Content</NavLink>
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/premium" element={<PremiumPage />}></Route>
        </Routes>
      </Router> */}

      <Authenticator>
        {({ signOut, user }) => (            
            <div>
              <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
                <Dashboard userName={user.attributes.email}/>
              </StockContext.Provider>
            </div>
        )}
      </Authenticator>

    </div>
  )

}

export default App;