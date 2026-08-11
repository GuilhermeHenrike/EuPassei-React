import { useState, useEffect } from 'react';
import { editarProvas } from '../../api';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField, Button } from '@mui/material';

// esse id é levado com o request body pra saber qual prova editar
function EditarProvasModal({ isOpen, onClose, caixaId, provaId, tipoProva, provaAtual }) {
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

    useEffect(() => {
        if (provaAtual && isOpen) {
            setTitulo(provaAtual.titulo)
            setNota(provaAtual.nota)
        } else {
            setTitulo('')
            setNota('')
        }
    }, [provaAtual, isOpen])

    const enviarFormulario = async (e) => {
        e.preventDefault()

        try {
            const resposta = await editarProvas(caixaId, dadosProva)

            setMensagem(`${resposta.data}`)

            setTitulo('')
            setNota('')

            setTimeout(() => {
                onClose()
                setMensagem('')
            }, 2000)

        } catch (erro) {
            const mensagemErro = erro.response?.data || 'Não foi possivel conectar na API'
            setMensagem(`${mensagemErro}`)
        }
    }

    return (
        <>
        
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth='xs'>
            <DialogTitle>EDITAR PROVA</DialogTitle>
            <DialogContent>
                {mensagem && (<Typography> {mensagem} </Typography>)}
                <form id='proBotao' onSubmit={enviarFormulario}>
                    <TextField margin="normal" fullWidth label="Titulo" value={titulo} type="text" placeholder='Titulo da prova' onChange={(e) => setTitulo(e.target.value)} />
                    <TextField margin="normal" fullWidth label="Nota" value={nota} type="number" placeholder='Nota da prova' onChange={(e) => setNota(parseFloat(e.target.value))} />
                </form>
            </DialogContent>
            <DialogActions>
                <Button type='button' onClick={onClose}>Cancelar</Button>
                <Button type='submit' form='proBotao'>Enviar</Button>
            </DialogActions>
        </Dialog>

        </>
    )
}

export default EditarProvasModal