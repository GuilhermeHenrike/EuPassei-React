import { useState } from 'react'
import { deletarProva } from '../../api'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function ApagarProvasModal({ isOpen, onClose, caixaId, provaId }) {
    const [mensagem, setMensagem] = useState('')

    const lidarApagarProva = async () => {

        try {
            const resposta = await deletarProva(caixaId, provaId)

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
        
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Apagar prova</DialogTitle>
            <DialogContent>
                {mensagem ? (
                    <Typography>{mensagem}</Typography>
                ) : (
                    <Typography>Tem certeza que deseja apagar esta prova?</Typography>
                )}
            </DialogContent>
            <DialogActions>
                {/* O Button do MUI já vem com um visual de mercado */}
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={lidarApagarProva} color="error" variant="contained">Apagar</Button>
            </DialogActions>
        </Dialog>
        
        </>
    )
}

export default ApagarProvasModal