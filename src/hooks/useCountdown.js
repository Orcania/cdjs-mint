import { useState, useEffect } from 'react';

const useCountdown = seconds => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsCompleted(true);
        }
    }, [timeLeft]);

    return { timeLeft, isCompleted };
};

export default useCountdown;
