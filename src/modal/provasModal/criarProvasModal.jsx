import { useState } from 'react'
import { criarProva } from '../../api'

function CriarProvasModal({isOpen, onClose, caixaId, tipoProva = "NORMAL", podeAdicionar}) {
    const [titulo, setTitulo] = useState('')
    const [nota, setNota] = useState('')
    const [mensagem, setMensagem] = useState('')

    const dadosProva = {
        titulo: titulo,
        nota: nota,
        tipo: tipoProva
    }

    const enviarFormulario = async (e) => {
        e.preventDefault()

        try {
            const resposta = await criarProva(caixaId, dadosProva)

            setMensagem(resposta.data)

            setTitulo('')
            setNota('')

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
            <h1>CRIAR PROVA</h1>
            <form onSubmit={enviarFormulario}>
                <input type='text' value={titulo} placeholder='Titulo da prova' onChange={(e) => setTitulo(e.target.value)} />
                <input type='number' value={nota} placeholder='Nota da prova' onChange={(e) => setNota(parseFloat(e.target.value))} />
                <button type='submit' disabled={!podeAdicionar}>Enviar</button>
                <button type='button' onClick={onClose}>Cancelar</button>
                {/* se coloca tipo BOTAO pq se n o formulario acha que ele é tipo submit e da aviso no terminal */}
            </form>
            {mensagem && (<p> {mensagem} </p>)} 
        </div>

        </>
    )
}

export default CriarProvasModal