import React, { useState, useEffect, useRef } from 'react';
import './Stopwatch.css';

const TARGET_TIME = 10.0;

function StopwatchGame() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState(null);
    const intervalRef = useRef(null);
    const bumpRef = useRef(null);

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setTime(prev => +(prev + 0.01).toFixed(2));
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [running]);

    const triggerBump = () => {
        const el = bumpRef.current;
        if (!el) return;
        el.classList.remove('animate');
        void el.offsetWidth;
        el.classList.add('animate');
    };

    const handleStart = () => {
        setTime(0);
        setResult(null);
        setRunning(true);
    };

    const handleStop = () => {
        setRunning(false);
        const diff = +(time - TARGET_TIME).toFixed(2);
        setResult(diff);

        triggerBump();
    };

    return (
        <div className="container">
            <h1>🎯 Stopwatch Game</h1>
            <h1 ref={bumpRef} className="bump">
                {time.toFixed(2)} s
            </h1>
            {running ? (
                <button onClick={handleStop}>Stop</button>
            ) : (
                <button onClick={handleStart}>Start</button>
            )}
            {result !== null && (
                <h3>
                    You were {result > 0 ? '+' : ''}
                    {result.toFixed(2)} s from 10.00s
                </h3>
            )}
        </div>
    );
}

export default StopwatchGame;
