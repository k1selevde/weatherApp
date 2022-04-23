import React from 'react';
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import MapSearchField from "./components/MapSearchField/MapSearchField";

const Map = () => {

    useDocumentTitle('Map')

    const renderMap = () => {
        return (
            <div>timed</div>
        )
    }

    return (
        <div>
            <div>
                <MapSearchField />
            </div>
            <div>
                {renderMap()}
            </div>

        </div>
    );
};

export default Map;