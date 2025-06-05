import './App.css';
import './index.css'
import { useState,useEffect } from "react";

function App() {
  const [question, setQuestion] = useState();
  const [result, setResult] = useState();

  const API_KEY = 'AIzaSyDpKx1KdgRwNPEWHkS_u_YeFc8knHFr6HQ';

  const callGemini = async () => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: question,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      setResult(data?.candidates[0]?.content?.parts[0]?.text)
      setQuestion('')
    } catch (err) {
      console.error('Error calling Gemini:', err);
    }
  };



// useEffect(() => {
//     callGemini();
//   }, [])
  
  return (
    <div className="App">
      <div className="main">
        <div className="result">
          {result}
        </div>
        <div className="fixed b-0">
          <input type="text"
          placeholder='Ask Question'
          onChange={(e)=>setQuestion(e.target.value)}
           />
           <button onClick={callGemini}>Ask</button>
        </div>
      </div>
    </div>
  );
}

export default App;
