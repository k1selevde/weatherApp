import React from 'react';
import {
    Routes as Switch,
    Route,
} from "react-router-dom";

/*pages*/
import Main from "../pages/Main/Main";
import Favorites from "../pages/Favorites/Favorites";
import Notifications from "../pages/Notifications/Notifications";
import Map from "../pages/Map/Map";
import SpectrumInterface from "../pages/SpectrumInterface/SpectrumInterface";

const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const ServerError = React.lazy(() => import("../pages/ServerError/ServerError"));

const Routes = () => {
    return (
            <Switch>
                <Route path="/" element={<Main />}/>
                <Route path="/map" element={<Map />}/>
                <Route path="/notifications" element={<Notifications />}/>
                <Route path="/favorites" element={<Favorites />}/>
                <Route path="/theme" element={<SpectrumInterface />}/>
                <Route path="/500" element={
                    <React.Suspense fallback={<>...</>}>
                        <ServerError />
                    </React.Suspense>
                    }
                />
                <Route path="*" element={
                    <React.Suspense fallback={<>...</>}>
                        <NotFound />
                    </React.Suspense>
                    }
                />
            </Switch>
    );
};

export default Routes;