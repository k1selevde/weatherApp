import {LatLngTuple, Map as LeafletMap} from "leaflet";
import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer} from "react-leaflet";
import {useRecoilValue} from "recoil";
import {IsEmptyObject} from "../../../shared/helpers/common";
import {mainDailyForecastState, mainSearchValueState} from "../../Main/main.state";
import CustomMarker from "./CustomMarker";

type Props = {
    coords: LatLngTuple
}

const InteractiveMap = ({coords}: Props) => {
    const [myMap, setMyMap] = useState<LeafletMap>();
    const {current: data} = useRecoilValue(mainDailyForecastState)
    const {title} = useRecoilValue(mainSearchValueState)

    useEffect(() => {
        const data = {lat: coords[0], lng: coords[1]}

        if (myMap) {
            myMap.flyTo(data);
        }

    }, [myMap, coords])

    const tileLayerProps = {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }

    const containerProps = {
        whenCreated: setMyMap,
        center: coords,
        zoom: 10,
        scrollWheelZoom: false
    }

    const shouldRenderMarker: boolean = coords && data && !IsEmptyObject(data)

    return (
        <MapContainer
            {...containerProps}
        >
            <TileLayer {...tileLayerProps} />
            {shouldRenderMarker && <CustomMarker coords={coords} data={data} title={title} />}
        </MapContainer>
    )
};

export default InteractiveMap;