import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [runParse, setRunParse] = useState(false)
  const [fetchCount, setFetchCount] = useState(0)
  const [images, setImages] = useState([])
  

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4200')
    socket.addEventListener('open', () => console.log('WebSocket connection established'))
    socket.addEventListener('message', message => {
      setImages(prevState => ([...prevState, message.data]))
    })
  }, [])

  useEffect(() => {
    (async function () {
      if (runParse) {
        setImages([])
        console.log('init parser')
        await axios.post('http://localhost:4200/tasks/cats/run', { catCount: Number(fetchCount) })
        setRunParse(false)
      }
    })()
  }, [runParse])


  function handleUpdateFetchCount (event) {
    setFetchCount(event.target.value)
  }

  function handleRunParse () {
    setRunParse(true)
  }

  return (
    <div className="App">
      <div className='token-form'>
        <input
          type='text'
          placeholder='Сколько кошек?'
          value={fetchCount}
          onChange={handleUpdateFetchCount}
        />
        <button onClick={handleRunParse}>Получить фото кошек</button>
      </div>
      {
        images.length > 0 && images.map((url, index) => <img className='crop' key={index} src={url} alt={index}/>)
      }
    </div>
  )
}

export default App
