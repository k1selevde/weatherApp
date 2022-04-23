import React from 'react';
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";

const NotFound = () => {

    useDocumentTitle('404')

    return (
        <div>
            Not Found page
        </div>
    );
};

export default NotFound;