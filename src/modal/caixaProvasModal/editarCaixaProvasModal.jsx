import { useState, useEffect } from 'react'
import { editarCaixa } from '../../api'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';


function EditarCaixaProvasModal( {isOpen, onClose, caixaId, caixa} ) {
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

    useEffect(() => {
        if (isOpen && caixa) {
            setTitulo(caixa.titulo)
            setMediaMin(caixa.mediaMin)
            setQuantidade(caixa.quantidade)
            setTemRecuperacao(caixa.temRecuperacao)
            setTemProvaFinal(caixa.temProvaFinal)
            setMediaMinDireitoFinal(caixa.mediaMinDireitoFinal)
            setMediaMinFinal(caixa.mediaMinFinal)
        } else {
            setTitulo('')
            setMediaMin('')
            setQuantidade('')
            setTemRecuperacao(false)
            setTemProvaFinal(false)
            setMediaMinDireitoFinal('')
            setMediaMinFinal('')
        }
    }, [isOpen, caixa])

    const enviarFormulario = async (e) => {
        e.preventDefault()

        try {
            const resposta = await editarCaixa(caixaId, dadosCaixa)

            setMensagem(`${resposta.data}`)

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
            const mensagemErro = erro.response?.data || 'Não foi possivel conectar na API'
            setMensagem(`${mensagemErro}`)
        }
    }

    return (
        <>
        
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>EDITAR CAIXA DE PROVAS</DialogTitle>
            <DialogContent>
                {mensagem && (<Typography>{mensagem}</Typography>)}
                <form id='proBotao' onSubmit={enviarFormulario}>
                    <TextField margin="normal" fullWidth label="Titulo" type='text' value={titulo} placeholder='Titulo da caixa' onChange={(e) => setTitulo(e.target.value)} />
                    <TextField margin="normal" fullWidth label="Media Minima" type='number' value={mediaMin} placeholder='Média mínima para passar' onChange={(e) => setMediaMin(parseFloat(e.target.value))} />
                    <TextField margin="normal" fullWidth label="Quantidade de provas" type='number' value={quantidade} placeholder='Quantidade de provas da caixa' onChange={(e) => setQuantidade(parseInt(e.target.value))} />
                    
                    <Typography>Marque para confirmar</Typography>

                    <label>Tem recuperação?</label>
                    <input type='checkbox' checked={temRecuperacao} onChange={(e) => setTemRecuperacao(e.target.checked)} />

                    <label>Tem prova final?</label>
                    <input type='checkbox' checked={temProvaFinal} onChange={(e) => setTemProvaFinal(e.target.checked)} />

                    {temProvaFinal && (
                        <>
                        <TextField margin="normal" fullWidth label="Media para ter direito a final" type='number' value={mediaMinDireitoFinal} placeholder='Média mínima para ter direito à prova final' onChange={(e) => setMediaMinDireitoFinal(parseFloat(e.target.value))} />
                        <TextField margin="normal" fullWidth label="Media minima para passar na final" type='number' value={mediaMinFinal} placeholder='Média mínima para passar na final' onChange={(e) => setMediaMinFinal(parseFloat(e.target.value))} />
                    </>
                    )}
                </form>
            </DialogContent>
            <DialogActions>
                <Button type='submit' form='proBotao'>Enviar</Button>
                <Button type='button' onClick={onClose}>Cancelar</Button>
            </DialogActions>
        </Dialog>

        </>
    )
}

export default EditarCaixaProvasModal