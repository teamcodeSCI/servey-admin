import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './layout/Home';
import { menu, URL } from './router';
import ProtectedRoute from './router/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path={`${URL}/login`} element={<Login />} />
      <Route
        path={`${URL}/`}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        {menu.map((item) => (
          <Route key={item.path} path={item.path} element={item.component} />
        ))}
      </Route>

      <Route path={URL} element={<Navigate to={`${URL}/`} />} />
    </Routes>
  );
}

export default App;
