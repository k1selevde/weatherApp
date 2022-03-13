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
import NotFound from "../pages/NotFound/NotFound";
import ServerError from "../pages/ServerError/ServerError";
import SpectrumInterface from "../pages/SpectrumInterface/SpectrumInterface";

const Routes = () => {
    return (
            <Switch>
                <Route path="/" element={<Main />}/>
                <Route path="/map" element={<Map />}/>
                <Route path="/notifications" element={<Notifications />}/>
                <Route path="/favorites" element={<Favorites />}/>
                <Route path="/theme" element={<SpectrumInterface />}/>
                <Route path="/500" element={<ServerError />}/>
                <Route path="*" element={<NotFound />}/>
            </Switch>
    );
};

export default Routes;