import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useState } from 'react';

const usePopup = (
    ref: RefObject<HTMLElement>,
    initialState: boolean = false
): [boolean, Dispatch<SetStateAction<boolean>>] => {
    const [open, setOpen] = useState(initialState);

    const handleClick = useCallback(
        (e) => {
            if (!ref.current?.contains(e.target)) {
                setOpen(false);
            }
        },
        [ref]
    );

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const isEscape = e.key === 'Escape';

        if (isEscape) {
            e.preventDefault();
            setOpen(false);
        }
    }, []);

    useEffect(() => {
        if (open && ref.current) {
            document.addEventListener('mousedown', handleClick);
            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('mousedown', handleClick);
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [open, ref, handleClick, handleKeyDown]);

    return [open, setOpen];
};

export default usePopup;



