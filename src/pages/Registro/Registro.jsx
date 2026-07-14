import { useState } from 'react'
import { fazerRegistro } from '../../api'

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
        <div>
            <h1>Registrar</h1>
            <form onSubmit={LidarCadastro}>
                <input type='text' value={username} placeholder="Digite seu nome" onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' value={password} placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Enviar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>

        </>
    )
}

export default Registro