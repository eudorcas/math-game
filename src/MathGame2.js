import React, { useState, useEffect } from "react";

const randomizeNumber = () => {
    console.log("losuje liczbe");
    return Math.floor(Math.random() * 10) + 1;
};

const countSum = (a, b) => {
    console.log("liczę");
    return a + b;
};

const randomizeNumbers = () => {
    const num1 = randomizeNumber();
    const num2 = randomizeNumber();
    console.log("losuje liczby");
    return [num1, num2];
};

const MathGame = () => {
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [sum, setSum] = useState(null);
    const [points, setPoints] = useState(0);
    const [answer, setAnswer] = useState("");
    const [isRunning, setIsRunning] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(7);

    const prepareQuestion = () => {
        const [num1, num2] = randomizeNumbers();
        setNumber1(num1);
        setNumber2(num2);
    };

    const checkWin = () => {
        if (Number(answer) === sum) {
            setPoints((prevState) => prevState + 1);
            refreshGame();
        } else {
            setIsRunning(false);
        }
    };

    const refreshGame = () => {
        prepareQuestion();
        setTimeRemaining(7);
        setAnswer("");
    };

    const submitAnswer = (e) => {
        e.preventDefault();
        checkWin();
    };

    useEffect(() => {
        console.log("przygotowuję pytania");
        prepareQuestion();
    }, []);

    useEffect(() => {
        console.log("ustawiam sumę");
        setSum(countSum(number1, number2));
    }, [number1, number2]);

    useEffect(() => {
        if (isRunning) {
            if (!timeRemaining) {
                checkWin();
            } else {
                setTimeout(() => {
                    console.log(timeRemaining);
                    setTimeRemaining((prevState) => prevState - 1);
                }, 1000);
            }
        }
    }, [isRunning, timeRemaining]);

    return (
        <div>
            {!isRunning ? (
                <>
                    <h1>Gra matematyczna</h1>
                </>
            ) : (
                <h1>
                    {number1} + {number2}
                </h1>
            )}
            <div>
                <form onSubmit={submitAnswer}>
                    <input
                        type="number"
                        value={answer}
                        onChange={(e) => setAnswer(e.currentTarget.value)}
                        disabled={!isRunning}
                    />
                    <button type="submit">Klik</button>
                </form>
                <h2>00:0{timeRemaining}</h2>
                <h3>Points: {points}</h3>
            </div>
        </div>
    );
};

export default MathGame;
