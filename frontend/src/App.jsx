import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  
  const userRole = localStorage.getItem('userRole'); // 'admin' or 'user'

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/admin/*" 
          element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/user/*" 
          element={userRole === 'user' ? <UserDashboard /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;