import React, {useRef} from 'react';
import './App.css';
import { useState } from 'react';


function App() {

  const [color, setColor] = useState('gray');
  const [text, setText] = useState('Click to Start Reaction Test');
  const [text2, setText2] = useState();
  const [statsText, setStatsText] = useState();
  const [startTime, setStartTime] = useState(null);
  const tooEarlyRef = useRef(true);
  const restarted = useRef(false);

  const [state, setState] = useState('Start');
  // States:
  //   - Start
  //   - Wait


  const handleClick = () => 
  {
    setState('Wait');
    setColor('wait');
    setText('Wait for green...');
    setText2();
    setStatsText();
    restarted.current = false;
    const timeout = Math.floor(Math.random() * 2500) + 2000;
    setTimeout(() => 
    {
      if (tooEarlyRef.current && !restarted.current) 
      {
        tooEarlyRef.current = false;
        setText('CLICK');
        setColor('green');
        setStartTime(Date.now());
      }
    }, timeout); 
  };

  const handleClick2 = () =>
  {
      if (tooEarlyRef.current) 
      {
        tooEarlyRef.current = false;
        setColor('fail');
        setText('TOO EARLY');
        setText2('Click to retry')
      } 
      else
      {
        const endTime = Date.now();
        const duration = endTime - startTime;
        setStatsText('270 ms (avg)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;200 ms (Great)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;180 ms (Pro)')
        setColor('success');
        setText(`${duration} ms`);
        setText2('Click to retry')
      }
      setState('Start');
      restarted.current = true;
      tooEarlyRef.current = true;
      setStartTime(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          className={`color-button ${color}`}
          onClick={
            state === 'Start' ? handleClick :
            handleClick2
          }
        >
          <span className="stats" dangerouslySetInnerHTML={{ __html: statsText }}></span>
          {text}
          <br/>
          <br/>
          <span className="text2class">{text2}</span>
        </button>
      </header>
    </div>
  );
}


export default App;