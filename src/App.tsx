import { useState, useEffect, useRef } from 'react';
import {useUser} from './composable'


import reactLogo from './assets/react.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0);
  const {login, user, api} = useUser();

  const handelLogin = async () => {
    login({username: 'admin', password: 'admin'});
}

  useEffect(()=>{
    console.log('useEffect - user', user);
  },[user]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => handelLogin()}>
          Login
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
