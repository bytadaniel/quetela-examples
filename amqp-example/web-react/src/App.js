import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [tokenInput, setTokenInput] = useState('')
  const [request, setRequest] = useState(true)

  useEffect( () => {
    (async function () {
      console.log('hello')
    })()
  }, [])

  function wbTokenButtonHandler () {
    window.localStorage.setItem('token', tokenInput)
  }

  function handleTokenInput (event) {
    setTokenInput(event.target.value)
  }


  return (
    <div className="App">
      <div className='token-form'>
        <input
          type='text'
          placeholder='Push me hard'
          value={tokenInput}
          onChange={handleTokenInput}
        />
      </div>
      <button className='wb-token-button' onClick={wbTokenButtonHandler}>Tap me</button>
    </div>
  );
}

export default App
