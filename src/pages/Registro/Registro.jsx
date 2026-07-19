import { useState } from 'react'
import { fazerRegistro } from '../../api'
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Alert 
} from '@mui/material';

function Registro({ onRegisterSucesso }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mensagem, setMensagem] = useState('')

    const LidarCadastro = async (e) => {
        e.preventDefault() 
        // impede a pagina de recarregar ao enviar o formulario
        // impede que os dados sejam destruidos ao recarregar

        const dadosUsuario = {
            username: username,
            password: password
        }

        try {
            const resposta = await fazerRegistro(dadosUsuario) 
            
                setMensagem(`Sucesso: ${resposta.data}`)

                // limpando
                setUsername('')
                setPassword('')
                
                setTimeout(() => {
                    onRegisterSucesso()
                }, 2000)
                // 2 segundos pra mandar o onRegisterSucesso pra mudar a tela
                
        } catch (erro) {
            const mensagemErro = erro.response?.data || 'não foi possivel conectar na API'
            setMensagem(`Erro: ${mensagemErro}`)
        }
    }

    return (
        <>

        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Registrar</Typography>

                <Box component="form" onSubmit={LidarCadastro} sx={{ mt: 1, width: '100%' }}>
                    <TextField margin="normal" required fullWidth label="Usuário" value={username} placeholder="Digite seu nome" onChange={(e) => setUsername(e.target.value)}/>
                    <TextField margin="normal" required fullWidth label="Senha" type="password" value={password} placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>

                    <Button type="submit" fullWidth variant="contained">Cadastrar</Button>
                </Box>
                {mensagem && <p>{mensagem}</p>}
            </Paper>
        </Container>

        </>
    )
}

export default Registro