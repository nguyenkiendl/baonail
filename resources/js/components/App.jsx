import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { privateRoutes, publicRoutes } from "~/routes";
import { AppProvider } from "~/context/AppContext";
import { AdminLayout, DefaultLayout } from "./Layout";
import { privateRoutes, publicRoutes } from "~/routes";

function App() {
    console.log('NODE_ENV:', process.env.NODE_ENV);
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = Fragment;
                        Layout = route.layout ? route.layout : DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        let Layout = Fragment;
                        Layout = route.layout ? route.layout : AdminLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <AppProvider>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </AppProvider>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
