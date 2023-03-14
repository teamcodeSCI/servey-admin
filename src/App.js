import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './layout/Home';
import { menu } from './router';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />}>
        {menu.map((item, idx) => (
          <Route key={item.path} path={item.path} element={item.component} />
        ))}
      </Route>
      <Route element={'Page Not Found'} />
    </Routes>
  );
}

export default App;
