import React from "react";

class MathAnswerGame extends React.Component {
    state = {
        number1: 0,
        number2: 0,
        sum: null,
        points: 0,
        answer: "",
        isRunning: true,
        timeRemaining: 7,
    };

    randomizeNumbers = () => {
        return Math.floor(Math.random() * 10) + 1;
    };

    prepareQuestion = () => {
        this.setState(
            {
                number1: this.randomizeNumbers(),
                number2: this.randomizeNumbers(),
            },
            () =>
                this.setState({ sum: this.state.number1 + this.state.number2 })
        );
    };

    componentDidMount() {
        this.prepareQuestion();
        this.runClock();
    }

    handleAnswer = (e) => {
        this.setState({
            answer: e.currentTarget.value,
        });
    };

    runClock = () => {
        if (this.state.isRunning) {
            if (this.state.timeRemaining > 0) {
                this.setState((prevState) => ({
                    timeRemaining: prevState.timeRemaining - 1,
                }));
                setTimeout(this.runClock, 1000);
            } else if (this.state.timeRemaining == 0) {
                this.checkWin();
            }
        }
    };

    refreshGame = () => {
        this.prepareQuestion();
        this.setState(
            {
                timeRemaining: 7,
                isRunning: true,
                answer: "",
            },
            () => this.runClock()
        );
    };

    checkWin = () => {
        if (this.state.answer == this.state.sum) {
            this.setState((prevState) => ({
                points: prevState.points + 1,
            }));
            this.refreshGame();
        } else {
            this.setState({
                isRunning: false,
            });
        }
    };

    submitAnswer = (e) => {
        e.preventDefault();
        this.checkWin();
    };

    render() {
        return (
            <div>
                {this.state.isRunning ? (
                    <h1>
                        {this.state.number1} + {this.state.number2}
                    </h1>
                ) : (
                    <h1>Koniec gry!</h1>
                )}
                <div>
                    <form onSubmit={this.submitAnswer}>
                        <input
                            type="number"
                            value={this.state.answer}
                            onChange={this.handleAnswer}
                            disabled={!this.state.isRunning}
                        />
                        <button type="submit">Klik</button>
                    </form>
                    <h2>00:0{this.state.timeRemaining}</h2>
                    <h3>Points: {this.state.points}</h3>
                </div>
            </div>
        );
    }
}

export default MathAnswerGame;
