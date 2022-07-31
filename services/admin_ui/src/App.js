import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import PageNotFound from './components/pageNotFound/404PageNotFound';
import EmailVerification from './pages/emailVerification/EmailVerification';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {' '}
                <Route path="/registration" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/email-verification"
                    element={<EmailVerification />}
                />
                <Route exact path="/" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
