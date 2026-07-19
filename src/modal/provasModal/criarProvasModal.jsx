import { useState } from 'react'
import { criarProva } from '../../api'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';

function CriarProvasModal({isOpen, onClose, caixaId, tipoProva = "NORMAL", podeAdicionar = true}) {
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

    return (
        <>
        
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>CRIAR PROVA</DialogTitle>
            <DialogContent>
                {mensagem && (<Typography>{mensagem}</Typography>)}
                <form id='proBotao' onSubmit={enviarFormulario}>
                    <TextField margin="normal" fullWidth label="Titulo" value={titulo} type="text" placeholder='Titulo da prova' onChange={(e) => setTitulo(e.target.value)} />
                    <TextField margin="normal" fullWidth label="Nota" value={nota} type="number" placeholder='Nota da prova' onChange={(e) => setNota(parseFloat(e.target.value))} />
                </form>
            </DialogContent>
            <DialogActions>
                <Button type='button' onClick={onClose}>Cancelar</Button>
                <Button type='submit' form='proBotao' disabled={!podeAdicionar}>Enviar</Button>
            </DialogActions>
        </Dialog>
        </>

    )
}

export default CriarProvasModal