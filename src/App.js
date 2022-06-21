
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import CredState from './credentials/CredState';

function App() {
  return (
      <>
      <NoteState >
      <CredState>

      <Router>
        <Navbar/>
        <div className='container'>
        <Switch>
//           <Route exact path="/about">
//            <About/>
//           </Route>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
        
                        
        </Switch>
        </div>
      </Router>
      </CredState>
      </NoteState>
      </>
  );
}

export default App;
