import './App.css';
import './style.css';
import { useState } from 'react';

function App() {
  const [description, setDescription] = useState("");
  const [submitStatus, setSubmitStatus] = useState("Submit");
  const [dreamAnalysis, setDreamAnalysis] = useState("");
  const [imageUrl, setImageUrl] = useState("")

  const responseGenerate = async (inputText) => {
    const prompt = {
      inputText: inputText
    }

    const result = await fetch("/api/ai", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt)
    })

    if (result.ok) {
      const airespond = await result.json(); // Parse the JSON response body
      setDreamAnalysis(airespond.analysis);
      setImageUrl(airespond.imageURL);
      setSubmitStatus("Submit");
    } else {
      setSubmitStatus("Retry");
    }
  };

  

  async function submitDescription() {
    setSubmitStatus("Waiting");
    responseGenerate(description);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Dreamweaver
        </h2>
      </header>
      <div className='App-container'>
        <textarea 
            value={description}
            placeholder="Tell me your dream" 
            onChange={e => setDescription(e.target.value)}
            className="dream-description"
        ></textarea>
        <button onClick={submitDescription} className='submit-button'>{submitStatus}</button>
        <span className="dream-analysis">
          {dreamAnalysis}
        </span>
        {imageUrl && <img src={imageUrl} alt="Loaded"  style={{ maxWidth: '300px'}}/>}
      </div>
      
    </div>
  );
}

export default App;
