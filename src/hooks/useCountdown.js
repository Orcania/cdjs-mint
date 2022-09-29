import { useState, useEffect } from 'react';

const useCountdown = unixMilliseconds => {
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = unixMilliseconds - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                D: days,
                H: hours,
                M: minutes,
                S: seconds,
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [unixMilliseconds]);

    return timeLeft;
};

export default useCountdown;
