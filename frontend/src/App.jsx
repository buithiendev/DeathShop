import axios from 'axios';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from '~/routes';
import { setInfoCurrentUser } from './app/currentUserSlice';
import DefaultLayout from './components/layouts/DefaultLayout';
import { customer } from './utils/customerRoute';

function App() {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.currentUser);

    useEffect(() => {
        (async () => {
            try {
                if (!status) {
                    console.log(123);

                    const { data } = await axios.get(customer);

                    console.log(data);

                    if (data) {
                        dispatch(setInfoCurrentUser(data));
                    }
                }
            } catch (ex) {}
        })();
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={`${route.path}/*`}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
