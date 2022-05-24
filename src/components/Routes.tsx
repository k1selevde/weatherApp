import React from 'react';
import {
    Routes as Switch,
    Route,
} from "react-router-dom";

/*pages*/
import Main from "../pages/Main/Main";
import Favorites from "../pages/Favorites/Favorites";
import Map from "../pages/Map/Map";


const SpectrumInterface = React.lazy(() => import("../pages/SpectrumInterface/SpectrumInterface"));
const Notifications = React.lazy(() => import("../pages/Notifications/Notifications"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const ServerError = React.lazy(() => import("../pages/ServerError/ServerError"));

const WithSuspense = (WrappedComponent: React.JSXElementConstructor<object>) => {
    return <React.Suspense fallback={<>...</>}>
        <WrappedComponent />
    </React.Suspense>

}

const Routes = () => {
    return (
            <Switch>
                <Route path="/" element={<Main />}/>
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/map" element={<Map />}/>

                <Route path="/notifications" element={WithSuspense(Notifications)}/>
                <Route path="/theme" element={WithSuspense(SpectrumInterface)} />
                <Route path="/500" element={WithSuspense(ServerError)} />
                <Route path="*" element={WithSuspense(NotFound)} />
            </Switch>
    );
};

export default Routes;