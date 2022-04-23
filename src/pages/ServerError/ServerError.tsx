import React from 'react';
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";

const ServerError = () => {

    useDocumentTitle('500')

    return (
        <div>
            Server Error page
        </div>
    );
};

export default ServerError;