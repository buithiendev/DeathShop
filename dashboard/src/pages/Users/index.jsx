import { Route, Routes } from 'react-router-dom';
import CreateUser from './pages/CreateUser/index';
import MainPage from './pages/MainPage';

function Users() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="create" element={<CreateUser />} />
            <Route path="me" element={<CreateUser />} />
            <Route path="add" element={<CreateUser />}/>
        </Routes>
    );
}

export default Users;
