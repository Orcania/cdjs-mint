import { useState, useEffect } from 'react';

const fetchTime = async () => {
    const data = await fetch('https://worldtimeapi.org/api/timezone/America/New_York');
    const json = await data.json();
    return json.unixtime * 1000;
};

const useCountdown = unixMilliseconds => {
    const [timeLeft, setTimeLeft] = useState({});
    const [done, setDone] = useState(false);
    const [initialFetchedTime, setInitialFetchedTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(async () => {
            const now = initialFetchedTime === 0 ? await fetchTime() : initialFetchedTime + 1000;
            setInitialFetchedTime(now);

            const distance = unixMilliseconds - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // check if done
            if (distance < 0) {
                setDone(true);
                clearInterval(interval);
            }

            setTimeLeft({
                D: days,
                H: hours,
                M: minutes,
                S: seconds,
            });
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unixMilliseconds]);

    return [timeLeft, done];
};

export default useCountdown;
