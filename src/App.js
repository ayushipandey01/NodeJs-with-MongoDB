import './App.css';
import { Link ,Route , Routes } from 'react-router-dom';
import Home from "./pages/Home";
import { Users } from './pages/Users';
import { User } from "./pages/User";


function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path ="/" element={<Home />}></Route>
        <Route path ="/users" element={<Users />}></Route>
        <Route path ="/users/:id" element={<User />}></Route>
      </Routes>
    </>
    
    
  );
}

export default App;
