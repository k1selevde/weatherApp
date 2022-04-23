import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {useRecoilState} from 'recoil';
import {fetchCityGeolocations} from "../../../api";
import {mapCityOptions} from '../../../shared/helpers/common';
import useDebounce from '../../../shared/hooks/useDebounce';
import AutocompleteInput from "../../../shared/ui-kit/AutocompleteInput";
import {OptionAutocompleteInputType} from '../../../types';
import {mainSearchValueState} from "../main.state";

const MainSearchField = () => {
    const [searchStateValue, setSearchValue] = useRecoilState(mainSearchValueState);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [options, setOptions] = useState<Array<OptionAutocompleteInputType>>([]);

    const debouncedQuery = useDebounce<string>(searchQuery, 500);

    const { data: citiesSuggestions, error, isLoading, isSuccess, isRefetching, isError } = useQuery(
        ["posts", debouncedQuery],
        () => fetchCityGeolocations(debouncedQuery),
        {
            refetchOnWindowFocus: false,
            retryOnMount: false,
            refetchOnMount: false,
            enabled: debouncedQuery.length > 2
        }
    )

    useEffect( () => {
        if (isSuccess || isLoading || isError) {
            setOptions(mapCityOptions(citiesSuggestions) || [])
        }
    }, [citiesSuggestions, isSuccess, isLoading, isError])

    const handleChange = (value: string) => {
        setSearchQuery(value)

        if (!value.trim()) {
            setOptions([])
        }
    }

    const handleOptionClick = (option: OptionAutocompleteInputType) => {
        setSearchValue(option)
        setOptions([])
    }


    const props = {
        onChange: handleChange,
        onOptionClick: handleOptionClick,
        options,
        isLoading: isLoading || isRefetching,
        isError,
        errorMessage: (error instanceof Error) ? error.message : "",
        defaultValue: searchStateValue.title
    }

    return <AutocompleteInput  {...props} />
};

export default MainSearchField;