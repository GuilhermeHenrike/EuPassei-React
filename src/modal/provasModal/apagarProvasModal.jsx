import { useState } from 'react'
import { deletarProva } from '../../api'

function ApagarProvasModal({ isOpen, onClose, caixaId, provaId }) {
    const [mensagem, setMensagem] = useState('')

    const lidarApagarProva = async () => {

        try {
            const resposta = await deletarProva(caixaId, provaId)

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
            <h1>Apagar prova:</h1>
            <div>
                <button onClick={lidarApagarProva}>Apagar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
            {mensagem && (<p>{mensagem}</p>)}
        </div>
        
        </>
    )
}

export default ApagarProvasModal