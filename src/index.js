import React from 'react';
import { render } from "react-dom"
import './index.css';
import Timer from '../src/Components/TimerState';

function App() {
  return <Timer />
}

render(<App />, document.querySelector("#root"))
