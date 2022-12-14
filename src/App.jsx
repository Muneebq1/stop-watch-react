import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {

  const [time, setTime] = useState({ hr: 0, min: 0, sec: 0, mili: 0 });
  const [toggle, setToggle] = useState(false)
  let id = useRef();

  useEffect(() => { return () => clearInterval(id.current) }, [])

  function handle() {
    id.current = setInterval(() => {
      setTime((prev) => {
        if (prev.mili > 99) {
          return { ...prev, sec: Number(prev.sec) + Number(1), mili: 0 }
        } if (prev.sec > 60) {
          return { ...prev, min: Number(prev.min) + Number(1), sec: 0 }
        } if (prev.min > 60) {
          return { ...prev, hr: Number(prev.hr) + Number(1), min: 0 }
        }
        return { ...prev, mili: Number(prev.mili) + Number(4) }
      })
    }, 45)
    setToggle(!toggle)
  }

  return (
    <div className="App" >
      <h1>Enter your value</h1>
      <input className={`${(toggle) ? "hidden" : "box"}`} type="number" onChange={(e) => { setTime({ hr: 0, min: e.target.value, sec: 0, mili: 0 }) }} />

      <h2 className={`${(toggle) ? "" : "hidden"}`}>

        <span>{time.hr.toLocaleString("en-US", {
          minimumIntegerDigits: 1,
          useGrouping: false,
        })}: </span>

        <span>{time.min.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })} : </span>

        <span>  {time.sec.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })} : </span>

        <span>{time.mili.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}</span>

      </h2>

      <button className={`${(toggle) ? "hidden" : ""}`} onClick={() => handle()}>start</button>
      <button className={`${(toggle) ? "" : "hidden"}`} onClick={() => clearInterval(id.current)}>pause</button>
      <button onClick={() => { clearInterval(id.current); setTime({ hr: 0, min: 0, sec: 0, mili: 0 }); setToggle(!toggle) }}>reset</button>
    </div>
  );
}

export default App;
