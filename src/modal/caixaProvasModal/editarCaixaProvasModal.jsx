import { useState } from 'react'
import { editarCaixa } from '../../api'

function EditarCaixaProvasModal( {isOpen, onClose, caixaId} ) {
    const [titulo, setTitulo] = useState('')
    const [mediaMin, setMediaMin] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [temRecuperacao, setTemRecuperacao] = useState(false)
    const [temProvaFinal, setTemProvaFinal] = useState(false)
    const [mediaMinDireitoFinal, setMediaMinDireitoFinal] = useState('')
    const [mediaMinFinal, setMediaMinFinal] = useState('')

    const [mensagem, setMensagem] = useState('')

    const dadosCaixa = {
        titulo: titulo,
        mediaMin: mediaMin,
        quantidade: quantidade,
        temRecuperacao: temRecuperacao,
        temProvaFinal: temProvaFinal,
        mediaMinDireitoFinal: mediaMinDireitoFinal,
        mediaMinFinal: mediaMinFinal
    }

    const enviarFormulario = async (e) => {
        e.preventDefault()

        try {
            const resposta = await editarCaixa(caixaId, dadosCaixa)

            setMensagem(`Sucesso: ${resposta.data}`)

            setTitulo('')
            setMediaMin('')
            setQuantidade('')
            setTemRecuperacao(false)
            setTemProvaFinal(false)
            setMediaMinDireitoFinal('')
            setMediaMinFinal('')

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
            <h1>EDITAR CAIXA DE PROVAS</h1>
            <form onSubmit={enviarFormulario}>
                <input type='text' value={titulo} placeholder='Titulo da caixa' onChange={(e) => setTitulo(e.target.value)} />
                <input type='number' value={mediaMin} placeholder='Média mínima para passar' onChange={(e) => setMediaMin(parseFloat(e.target.value))} />
                <input type='number' value={quantidade} placeholder='Quantidade de provas da caixa' onChange={(e) => setQuantidade(parseInt(e.target.value))} />
                
                <h2>Marque para confirmar</h2>

                <label>Tem recuperação?</label>
                <input type='checkbox' checked={temRecuperacao} onChange={(e) => setTemRecuperacao(e.target.checked)} />

                <label>Tem prova final?</label>
                <input type='checkbox' checked={temProvaFinal} onChange={(e) => setTemProvaFinal(e.target.checked)} />
                
                {temProvaFinal && (
                    <>
                    <input type='number' value={mediaMinDireitoFinal} placeholder='Média mínima para ter direito à prova final' onChange={(e) => setMediaMinDireitoFinal(parseFloat(e.target.value))} />
                    <input type='number' value={mediaMinFinal} placeholder='Média mínima para passar na final' onChange={(e) => setMediaMinFinal(parseFloat(e.target.value))} />
                    </>
                )}

                <button type='submit'>Enviar</button>
                <button type='button' onClick={onClose}>Cancelar</button>
            </form>
            {mensagem && (<p>{mensagem}</p>)}
        </div>

        </>
    )
}

export default EditarCaixaProvasModal