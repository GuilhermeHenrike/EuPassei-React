import { useState } from 'react'
import { criarCaixa } from '../../api'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';

function CriarCaixaProvasModal({isOpen, onClose}) {
    {/* obrigatorios: */}
    const [titulo, setTitulo] = useState('')
    const [mediaMin, setMediaMin] = useState('')
    const [quantidade, setQuantidade] = useState('')

    const [temRecuperacao, setTemRecuperacao] = useState(false)
    const [temProvaFinal, setTemProvaFinal] = useState(false)
    const [mediaMinDireitoFinal, setMediaMinDireitoFinal] = useState('')
    const [mediaMinFinal, setMediaMinFinal] = useState('')
    {/* As variaveis de numero são '' pra não deixar como null */}
    {/* Mas os inputs são number, eles recebem a String */}
    {/* E convertem numero com parseInt ou parseFloat */}

    {/* Não tem nada a ver com a caixa, é pra mostrar as mensagens do back */}
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

        // o .data é reservado do axios e ele retorna o corpo da requisição
        // nesse caso a mensagem vinda do back
        try {
            const resposta = await criarCaixa(dadosCaixa)
            // é uma variavel que tambem cria a caixa de provas

            setMensagem(`${resposta.data}`)

            // limpando
            setTitulo('')
            setMediaMin('')
            setQuantidade('')
            setTemRecuperacao(false)
            setTemProvaFinal(false)
            setMediaMinDireitoFinal('')
            setMediaMinFinal('')

            setTimeout(() => {
                onClose()
                setMensagem('') // limpa a mensagem que aparece
            }, 2000)
            // 2 segundos pra fechar o modal, só pra ler a mensagem

        } catch (erro) {
            const mensagemErro = erro.response?.data || 'Não foi possivel conectar na API'
            setMensagem(`${mensagemErro}`)
        }
    }

    return (
        <>
        
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>CRIAR CAIXA DE PROVAS</DialogTitle>
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
                <Button type='button' onClick={onClose}>Cancelar</Button>
                <Button type='submit' form='proBotao'>Enviar</Button>
            </DialogActions>
        </Dialog>

        </>
    )

}

export default CriarCaixaProvasModal