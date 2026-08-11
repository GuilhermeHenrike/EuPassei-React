import { useState } from 'react'
import { fazerLogout } from '../../api'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

                                            // onLogoutSucesso nasce aqui como mensageiro
function FazerLogoutModal({ isOpen, onClose, onLogoutSucesso }) {
    const [mensagem, setMensagem] = useState('')

    const lidarLogout = async () => {

        try {
            const resposta = await fazerLogout()

            setMensagem(`${resposta.data}`)

            setTimeout(() => {
                onClose()
                setMensagem('')

                if (onLogoutSucesso) {
                    onLogoutSucesso();
                }

            }, 2000)
        } catch (erro) {
            const mensagemErro = erro.response?.data || 'Não foi possivel conectar na API'
            setMensagem(`${mensagemErro}`)
        }
    } 

    return (
        <>
        
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Fazer logout</DialogTitle>
            <DialogContent>
                {mensagem ? (
                    <Typography>{mensagem}</Typography>
                ) : (
                    <Typography>Tem certeza que deseja sair?</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={lidarLogout} color="error" variant="contained">Sair</Button>
            </DialogActions>
        </Dialog>
        
        </>
    )

}

export default FazerLogoutModal