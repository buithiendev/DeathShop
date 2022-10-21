import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pages from './pages';
import Login from './pages/Login';
import { getUsers } from './pages/Users/usersSlice';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<Pages />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
