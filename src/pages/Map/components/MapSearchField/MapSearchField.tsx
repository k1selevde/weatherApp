import React from 'react';
import AutocompleteInput from "../../../../shared/ui-kit/AutocompleteInput/AutocompleteInput";

const MapSearchField = () => {
    const props = {
        onChange: () => {},
        onOptionClick: () => {},
        options: [],
        isError: false,
        errorMessage: 'er',
        isLoading: false
    }

    return (
        <div>
            <AutocompleteInput {...props} />
        </div>
    );
};

export default MapSearchField;