import React, {useState, useRef} from 'react';
import './App.css';


function App() {

  const [style, setStyle] = useState('gray'); // For the style sheet
  const [text, setText] = useState('Click to Start Reaction Test');
  const [text2, setText2] = useState(); // For "Click to Retry" text
  const [statsText, setStatsText] = useState(); // For the text at the top
  const [startTime, setStartTime] = useState(null);
  const tooEarlyRef = useRef(true); // If clicked too early
  const restarted = useRef(false); // If the click to retry was clicked
  var count1 = useRef(0);
  var count2 = useRef(0);
  const [state, setState] = useState('Start');
  // States:
  //   - Start
  //   - Wait


  const handleClick = () => 
  {
    setState('Wait');
    setStyle('wait');
    setText('Wait for green...');
    setText2();
    setStatsText();
    restarted.current = false;
    const timeout = Math.floor(Math.random() * 2500) + 2000; // Between 2 and 4.5 seconds
    

    
    // This waits timeout amount of time
    count1.current = count1.current + 1;
    setTimeout(() => 
    {
      count2.current = count2.current + 1;
      if (tooEarlyRef.current && !restarted.current && count1.current === count2.current) 
      {
        tooEarlyRef.current = false;
        setText('CLICK');
        setStyle('green');
        setStartTime(Date.now()); // Start time here
        count1.current = 0;
        count2.current = 0;
      }
    }, timeout);
  };

  const handleClick2 = () =>
  {
      // If it was clicked too early
      if (tooEarlyRef.current) 
      {
        tooEarlyRef.current = false;
        setStyle('fail');
        setText('TOO EARLY');
        setText2('Click to retry')
      } 
      else // If it was not clicked too early
      {
        const endTime = Date.now(); // End time here
        const duration = endTime - startTime;
        setStatsText('270 ms (avg)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;200 ms (Great)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;180 ms (Pro)')
        setStyle('success');
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
          className={`color-button ${style}`}
          onMouseDown={
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