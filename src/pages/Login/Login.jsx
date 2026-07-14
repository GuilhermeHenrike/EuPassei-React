import { useState } from 'react'
import { fazerLogin } from '../../api'

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
            
        } catch (erro) {
            const mensagemErro = erro.response?.data || 'Erro: não foi possivel conectar na API'
            setMensagem(`Erro: ${mensagemErro}`)
        }
    }

    return (
        <>
        <div>
            <h1>Login</h1>
            <form onSubmit={lidarLogin}>
                <input type='text' value={username} placeholder='Digite seu nome' onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' value={password} placeholder='Digite sua senha' onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Enviar</button>
            </form>
            {mensagem && (<p>{mensagem}</p>)}
        </div>
        </>
    )
}

export default Login