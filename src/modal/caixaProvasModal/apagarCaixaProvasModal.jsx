import { useState } from 'react'
import { deletarCaixa } from '../../api'

function ApagarCaixaProvasModal({ isOpen, onClose, caixaId }) {
    const [mensagem, setMensagem] = useState('')

    const lidarApagarCaixa = async () => {

        try {
            const resposta = await deletarCaixa(caixaId)

            setMensagem(`Sucesso: ${resposta.data}`)

            setTimeout(() => {
                onClose()
                setMensagem('')
            }, 2000)
        } catch (erro) {
            const mensagemErro = erro.response?.data || 'Erro: não foi possivel conectar na API'
            setMensagem(`Erro: ${mensagemErro}`)
        }
    }

    if (!isOpen) {
        return null
    }

    return (
        <>
        
        <div>
            <h1>Apagar caixa:</h1>
            <div>
                <button onClick={lidarApagarCaixa}>Apagar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
            {mensagem && (<p>{mensagem}</p>)}
        </div>
        
        </>
    )
}

export default ApagarCaixaProvasModal