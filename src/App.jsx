import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Registro from './pages/Registro/Registro'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function App() {
  const [telaAtiva, setTelaAtiva] = useState('login')  
  return (
    <>
    {/* Nav só aparece se a tela que estiver carregada não for a home */}
    {telaAtiva !== 'home' && (
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', mb: 4 }}>
        <Toolbar>
          {/* Título */}
          <Typography variant="h5" sx={{ flexGrow: 1 }}>EuPassei</Typography>

          {/* Botões */}
          <Box>
            <Button color="inherit" onClick={() => setTelaAtiva('login')}>Login</Button>
            <Button color="inherit" onClick={() => setTelaAtiva('registro')}>Registro</Button>
          </Box>
        </Toolbar>
      </AppBar>
    )}

    <main>
      {/* renderiza a tela de registro e se o login der sucesso vai pra login */}
      {telaAtiva === 'registro' &&
        (<Registro onRegisterSucesso={() => setTelaAtiva('login')}/>)
      }
      
      {/* renderiza a tela de login e se o login der sucesso vai pra home */}
      {telaAtiva === 'login' && 
        (<Login onLoginSucesso={() => setTelaAtiva('home')}/>)
      }

      {/* renderiza home e se disparar onLogout ele manda o usuario pro login */}
      {/* onLogout nasce aqui */}
      {telaAtiva === 'home' && <Home onLogout={() => setTelaAtiva('login')} />}
    </main>
    </>
  )
}

export default App
