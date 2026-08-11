import { useState } from 'react'
import { deletarCaixa } from '../../api'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function ApagarCaixaProvasModal({ isOpen, onClose, caixaId }) {
    const [mensagem, setMensagem] = useState('')

    const lidarApagarCaixa = async () => {

        try {
            const resposta = await deletarCaixa(caixaId)

            setMensagem(`${resposta.data}`)

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
            <DialogTitle>Apagar caixa</DialogTitle>
            <DialogContent>
                {mensagem ? (
                    <Typography>{mensagem}</Typography>
                ) : (
                    <Typography>Tem certeza que deseja apagar esta prova?</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={lidarApagarCaixa} color="error" variant="contained">Apagar</Button>
            </DialogActions>
        </Dialog>
        
        </>
    )
}

export default ApagarCaixaProvasModal