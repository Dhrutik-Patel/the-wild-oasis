import { useEffect, useRef } from 'react';

export function useOutsideClicks(callback, listenCapturing = true) {
    const ref = useRef();

    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick, listenCapturing);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });

    return ref;
}
