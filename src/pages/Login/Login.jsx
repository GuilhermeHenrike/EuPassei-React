import { useState } from 'react'
import { fazerLogin } from '../../api'
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Alert 
} from '@mui/material';

function Login({ onLoginSucesso }) {
    // o { onLoginSucesso} serve pra enviar dados ()
    // ou pra informar que deu tudo certo
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mensagem, setMensagem] = useState('')

    const lidarLogin = async (e) => {
        e.preventDefault()

        const dadosUsuario = {
            username: username,
            password: password
        }

        try {
            const resposta = await fazerLogin(dadosUsuario)
            
            setMensagem(`Sucesso: logando ${dadosUsuario.username}!`)
            setUsername('')
            setPassword('')

            setTimeout(() => {
                onLoginSucesso()
            }, 2000)
            // 2 segundos pra mandar o onLoginSucesso pra mudar a tela
            
        } catch (error) {
            const mensagemErro = error.response?.data || 'Erro: não foi possivel conectar na API'
            setMensagem(`Erro: ${mensagemErro}`)
        }
    }

    return (
        <>
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Login</Typography>
                
                <Box component="form" onSubmit={lidarLogin} sx={{ mt: 1, width: '100%' }}>
                    <TextField margin="normal" required fullWidth label="Usuário" value={username} placeholder="Digite seu nome" onChange={(e) => setUsername(e.target.value)}/>
                    <TextField margin="normal" required fullWidth label="Senha" type="password" value={password} placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>

                    <Button type="submit" fullWidth variant="contained"> Entrar </Button>
                </Box>

                {mensagem && (<p>{mensagem}</p>)}
            </Paper>
        </Container>
        </>
    )
}

export default Login