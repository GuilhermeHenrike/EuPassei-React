import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Registro from './pages/Registro/Registro'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

function App() {
  const [telaAtiva, setTelaAtiva] = useState('registro')  
  return (
    <>
    <nav>
      <button onClick={() => setTelaAtiva('registro')}>Registro</button>
      <button onClick={() => setTelaAtiva('login')}>Login</button>
    </nav>

    <main>
      {/* renderiza a tela de registro e se o login der sucesso vai pra login */}
      {telaAtiva === 'registro' &&
        (<Registro onRegisterSucesso={() => setTelaAtiva('login')}/>)
      }
      
      {/* renderiza a tela de login e se o login der sucesso vai pra home */}
      {telaAtiva === 'login' && 
        (<Login onLoginSucesso={() => setTelaAtiva('home')}/>)
      }

      {telaAtiva === 'home' && <Home />}
    </main>
    </>
  )
}

export default App
