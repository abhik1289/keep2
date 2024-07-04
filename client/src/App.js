import {
 
  Route,Router
} from "react-router-dom";

import Login from './components/Auth/Login';
function App() {
  return (
    <Router>
      <Route element={<Login/>} path="/login" />
    </Router>
  );
}

export default App;
