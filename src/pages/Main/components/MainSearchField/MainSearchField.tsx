import React, {useEffect, useState} from 'react';
import { useQuery } from 'react-query';
import useDebounce from '../../../../shared/hooks/useDebounce';
import AutocompleteInput from "../../../../shared/ui-kit/AutocompleteInput/AutocompleteInput";
import { GeoCityRestType } from '../../../../types';
import {useSetRecoilState} from 'recoil';
import {mainSearchValueState} from "../../main.state";

export type OptionAutocompleteInputType = {
    title: string,
    id: string
    lat: number | string,
    lon: number | string
}

const mapCityOptions = (cities: Array<GeoCityRestType>): Array<OptionAutocompleteInputType> => {

    return cities?.map((city: GeoCityRestType) => {
        const title = [city.name, city.state, city.country].join(', ')

        return ({
            title,
            id: `${city.lat}-${city.lon}`,
            lat: city.lat,
            lon: city.lon
        })
    })
}

const fetchCityGeolocations = async (query: string) => {
    const apiKey = process.env.REACT_APP_API_KEY

    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );

    if (!response.ok) {
        throw new Error(`Network response was not ok`, )
    }

    return response.json();
}

const MainSearchField = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [options, setOptions] = useState<Array<OptionAutocompleteInputType>>([]);
    const debouncedQuery = useDebounce<string>(searchQuery, 500);

    const { data, error, isLoading, isSuccess, isRefetching, isError } = useQuery(
        ["posts", debouncedQuery],
        () => fetchCityGeolocations(debouncedQuery),
        {
            refetchOnWindowFocus: false,
            enabled: debouncedQuery.length > 2
        }
    )

    const setSearchValue = useSetRecoilState(mainSearchValueState);

    useEffect( () => {
        if (isSuccess) {
            setOptions(mapCityOptions(data) || [])
        }
    }, [data])

    const handleChange = (value: string) => {
        setSearchQuery(value)

        if (!value.trim()) {
            setOptions([])
        }
    }

    const handleOptionClick = (option: OptionAutocompleteInputType) => {
        setSearchValue(option)
    }

    const props = {
        onChange: handleChange,
        onOptionClick: handleOptionClick,
        options,
        isLoading: isLoading || isRefetching,
        isError,
        errorMessage: (error ?? "") as string
    }

    return (
        <div>
            <AutocompleteInput  {...props} />
        </div>
    );
};

export default MainSearchField;