import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <TodoPage onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<LoginPage onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/todos"
          element={<TodoPage onLogin={() => setIsAuthenticated(true)} />}
        />
      </Routes>
    </Router>
  );
}

export default App;