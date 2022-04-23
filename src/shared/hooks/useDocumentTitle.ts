import { useEffect } from 'react';

const useDocumentTitle = (title: string | (() => string)) => {
    useEffect(() => {
        title && (document.title = typeof title === 'function' ? title() : title);
    }, [title]);
};

export default useDocumentTitle;
