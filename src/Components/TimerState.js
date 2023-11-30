import React, { useState, useEffect, useRef } from "react";

export default function Timer() {
	const [minutes, setMinutes] = useState(25);
	const [second, setSecond] = useState(0);
	const [stateTimer, setStateTimer] = useState();
	const [copy, setCopy] = useState([]);
	const copyRef = useRef(null);

	const start = () => {
		const stateTimer = setInterval(() => {
			setSecond((second) => second - 1);
			if (second === 0) {
				clearInterval(stateTimer);
			}
		}, 1000);
		setStateTimer(stateTimer);
	};

	useEffect(() => {
		if (second === 0) {
			if (minutes !== 0) {
				setSecond(59);
				setMinutes(minutes - 1);
			}
		}
	}, [second, minutes]);

	useEffect(() => {
		return () => clearInterval(stateTimer);
	}, [stateTimer]);

	function handleResetClick() {
		setCopy([...copy, `${minutes}:${second}`]);
		setMinutes(25);
		setSecond(0);
	}

	function HandleDeleteClick() {
		copy.splice(0, 3);
	}

	function handlePausedClick() {
		clearInterval(stateTimer);
	}

	function handleMinusClick() {
		setSecond(second - 1);
	}

	function handlePlusClick() {
		setSecond(second + 1);
	}

	useEffect(() => {
		copyRef.current.value = copy.join(", ");
	}, [copy]);

	return (
		<>
			<div className="container">
				<div className="Timer">
					<h1>Pomodoro Timer</h1>
					<div className="buttons">
						<button className="item-button" onClick={start}>
							Start
						</button>
						<button
							className="item-button"
							onClick={handleResetClick}
						>
							Reset
						</button>
						<button
							className="item-button"
							onClick={HandleDeleteClick}
						>
							Delete
						</button>
						<button
							className="item-button"
							onClick={handlePausedClick}
						>
							Paused
						</button>
						<button
							className="item-button"
							onClick={handleMinusClick}
						>
							Minus
						</button>
						<button
							className="item-button"
							onClick={handlePlusClick}
						>
							Plus
						</button>
					</div>
					<div className="seconds">
						{minutes}:{second}
					</div>
					<p>Ваше предыдущее время</p>
					<input className="value" type="text" ref={copyRef} />
				</div>
			</div>
		</>
	);
}
