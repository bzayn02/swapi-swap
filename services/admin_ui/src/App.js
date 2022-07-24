import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {' '}
                <Route path="/registration" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
