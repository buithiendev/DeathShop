import axios from 'axios';
import { Fragment, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DefaultLayout from '~/components/Layout/DefaultLayout';
import { routes } from '~/routes';
import { user } from '~/utils/APIRoutes';

function Pages() {
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(user);
                console.log(data);
            } catch (ex) {
                navigate('/login');
            }
        })();
    }, []);

    return (
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
    );
}

export default Pages;
