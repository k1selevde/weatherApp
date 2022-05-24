import React from 'react';
import {useIntl} from "react-intl";
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";

const NotFound = () => {
    const intl = useIntl()

    useDocumentTitle(intl.formatMessage({id: "tab.404"}))

    return (
        <div>
            Not Found page
        </div>
    );
};

export default NotFound;