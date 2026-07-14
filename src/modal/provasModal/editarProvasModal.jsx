import { useState } from 'react';
import { editarProvas } from '../../api';

// esse id é levado com o request body pra saber qual prova editar
function EditarProvasModal({ isOpen, onClose, caixaId, provaId, tipoProva }) {
    const [titulo, setTitulo] = useState('')
    const [nota, setNota] = useState('')
    const [mensagem, setMensagem] = useState('')

    const dadosProva = {
        id: provaId,
        titulo: titulo,
        nota: nota,
        tipo: tipoProva // mantem o tipo original na hora de criacao 
        // pra evitar que provas finais quando editadas virem "NORMAL"
    }

    const enviarFormulario = async (e) => {
        e.preventDefault()

        try {
            const resposta = await editarProvas(caixaId, dadosProva)

            setMensagem(`Sucesso: ${resposta.data}`)

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
            <h1>EDITAR PROVA</h1>
            <form onSubmit={enviarFormulario}>
                <input type='text' value={titulo} placeholder='Titulo da prova' onChange={(e) => setTitulo(e.target.value)} />
                <input type='number' value={nota} placeholder='Nota da prova' onChange={(e) => setNota(parseFloat(e.target.value))} />
                <button type='submit'>Enviar</button>
                <button type='button' onClick={onClose}>Cancelar</button>
            </form>
        </div>
        {mensagem && (<p> {mensagem} </p>)}
        </>
    )
}

export default EditarProvasModal