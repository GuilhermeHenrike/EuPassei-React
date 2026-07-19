import { useState, useEffect } from 'react';
import { fazerLogin, listarTodasCaixas } from '../../api';
import ApagarProvasModal from '../../modal/provasModal/apagarProvasModal';
import ApagarCaixaProvasModal from '../../modal/caixaProvasModal/apagarCaixaProvasModal';
import CriarCaixaProvasModal from '../../modal/caixaProvasModal/criarCaixaProvasModal';
import EditarCaixaProvasModal from '../../modal/caixaProvasModal/editarCaixaProvasModal';
import CriarProvasModal from '../../modal/provasModal/criarProvasModal';
import EditarProvasModal from '../../modal/provasModal/editarProvasModal';
import FazerLogout from '../../modal/logoutModal/fazerLogoutModal';
import { 
    Button, Box, Typography, Card, CardContent, 
    Stack, IconButton, Divider, Chip, Container 
} from '@mui/material';
import FazerLogoutModal from '../../modal/logoutModal/fazerLogoutModal';

// recebe onLogout do app.jpx como props
function Home({ onLogout }) {
    const [caixas, setCaixas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    // Estados dos Modais
    const [modalProvaAberto, setModalProvaAberto] = useState(false);
    const [modalCaixaApagarAberto, setModalCaixaApagarAberto] = useState(false);
    const [modalCaixaCriarAberto, setModalCaixaCriarAberto] = useState(false);
    const [modalCaixaEditarAberto, setModalCaixaEditarAberto] = useState(false);
    const [modalProvaCriarAberto, setModalProvaCriarAberto] = useState(false);
    const [modalProvaEditarAberto, setModalProvaEditarAberto] = useState(false);
    const [modalLogoutAberto, setModalLogoutAberto] = useState(false);

    // Estados de IDs
    const [caixaEditando, setCaixaEditando] = useState(null);
    const [caixaAlvoId, setCaixaAlvoId] = useState(null);
    const [provaSelecionadaId, setProvaSelecionadaId] = useState(null);
    const [caixaDaProvaSelecionadaId, setCaixaDaProvaSelecionadaId] = useState(null);
    const [tipoNovaProva, setTipoNovaProva] = useState('NORMAL');
    const [tipoProvaEditar, setTipoProvaEditar] = useState('NORMAL');

    // pro useEffect
    const [provaParaEditar, setProvaParaEditar] = useState(null); // pra saber qual prova foi selecionada, pro useEffect (n tem nada a ver com os de cima)

    const carregarDados = async () => {
        try {
            setCarregando(true);
            const resposta = await listarTodasCaixas();
            setCaixas(Array.isArray(resposta.data) ? resposta.data : []);
            setErro('');
        } catch (err) {
            setErro('Não foi possível carregar as caixas do servidor.');
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    const getColor = (sit) => {
        if (sit === 'Aprovado') return 'green';
        if (sit === 'Prova Final') return 'purple';
        return 'red';
    };

    const fecharQualquerModal = () => {
        setModalProvaAberto(false);
        setModalProvaCriarAberto(false);
        setModalCaixaCriarAberto(false);
        setModalCaixaEditarAberto(false);
        setModalCaixaApagarAberto(false);
        setModalProvaEditarAberto(false);
        setModalLogoutAberto(false);
        carregarDados();
    };

    if (carregando) return <Typography sx={{ p: 4 }}>Carregando caixas e provas...</Typography>;
    if (erro) return <Typography color="error" sx={{ p: 4 }}>{erro}</Typography>;

    return (
        <>
        {/* Botões de criar caixa de provas*/}
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Gerenciador de Caixas</Typography>
                <Button variant="contained" color="success" onClick={() => setModalCaixaCriarAberto(true)}> Criar Caixa </Button>
                <Button variant="contained" color="error" onClick={() => setModalLogoutAberto(true)}> Fazer Logout </Button>
            </Box>

            {caixas.length === 0 ? (
                <Typography>Nenhuma caixa encontrada.</Typography>
            ) : (
                caixas.map((caixa) => {
                    {/* Map que percorre Caixas */}
                    const provasNormais = (caixa.listaProvas ?? []).filter(p => p.tipo === 'NORMAL');
                    const jaTemProvaFinal = (caixa.listaProvas ?? []).some(p => p.tipo === 'FINAL');
                    const podeAdicionarFinal = caixa.temProvaFinal && caixa.situacao === 'Prova Final' && !jaTemProvaFinal;

                    return (
                        <Card key={caixa.id} sx={{ mb: 3, p: 1 }}>
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                    <Box>
                                        {/* Textos contendo, situacao, quantidade de provas adicionadas x total, pontos necessarios pra passar */}
                                        <Typography variant="h5">Caixa: {caixa.titulo || `ID ${caixa.id}`}</Typography>
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            Situação: <strong style={{ color: getColor(caixa.situacao) }}>{caixa.situacao}</strong>
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            Progresso: {provasNormais.length} de {caixa.quantidade} provas
                                        </Typography>
                                        {caixa.pontosNecessarios > 0 && (
                                            <Typography variant="body2" color="secondary" sx={{ mt: 1 }}>
                                                Nota necessária na Final: <strong>{caixa.pontosNecessarios.toFixed(2)}</strong>
                                            </Typography>
                                        )}
                                    </Box>
                                    {/* Botões de editar e apagar a caixa de provas */}
                                    <Stack direction="row" spacing={1}>
                                        <Button size="small" variant="text" color="warning" onClick={() => { setCaixaEditando(caixa); setModalCaixaEditarAberto(true); }}>Editar</Button>
                                        <Button size="small" variant="text" color="error" onClick={() => { setCaixaAlvoId(caixa.id); setModalCaixaApagarAberto(true); }}>Excluir</Button>
                                    </Stack>
                                </Stack>

                                {/* Linha se separação */}
                                <Divider sx={{ my: 2 }} />
                                
                                {/* Botões de PROVA */}
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>Provas:</Typography>
                                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                    {provasNormais.length < caixa.quantidade && (
                                        <Button size="small" variant="contained" onClick={() => { setCaixaAlvoId(caixa.id); setTipoNovaProva('NORMAL'); setModalProvaCriarAberto(true); }}>
                                            + Adicionar Prova</Button>
                                    )}
                                    {podeAdicionarFinal && (
                                        <Button size="small" variant="contained" color="secondary" onClick={() => { setCaixaAlvoId(caixa.id); setTipoNovaProva('FINAL'); setModalProvaCriarAberto(true); }}>
                                            + Adicionar Prova Final</Button>
                                    )}
                                </Stack>

                                {/* Map que percorre a lista de provas */}
                                {(caixa.listaProvas || []).map((prova) => (
                                    <Box key={prova.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px dashed #ddd' }}>
                                        <Typography variant="body2">
                                            {prova.titulo || `Prova ID ${prova.id}`} (Nota: {prova.nota})
                                            {/* O "FINAL" roxo ao lado da prova final pra identificação */}
                                            {prova.tipo === 'FINAL' && <Chip label="FINAL" size="small" color="secondary" sx={{ ml: 1, height: 20 }} />}
                                        </Typography>
                                        <Stack direction="row" spacing={1}>
                                            {/* os dados dai saem do map tanto do que percorre caixas, quanto provas pq ele percorre os objetos inteiros */}
                                            {caixa.temRecuperacao && (
                                                <Button size="small" onClick={() => { setCaixaDaProvaSelecionadaId(caixa.id); setProvaSelecionadaId(prova.id); setTipoProvaEditar(prova.tipo); setProvaParaEditar(prova); setModalProvaEditarAberto(true); }}>Recuperação</Button>
                                            )}
                                            <Button size="small" color="error" onClick={() => { setCaixaDaProvaSelecionadaId(caixa.id); setProvaSelecionadaId(prova.id); setModalProvaAberto(true); }}>Excluir</Button>
                                        </Stack>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    );
                })
            )}

            {/* pra renderizar os modais na tela */}
            <CriarCaixaProvasModal isOpen={modalCaixaCriarAberto} onClose={fecharQualquerModal} />
            <EditarCaixaProvasModal isOpen={modalCaixaEditarAberto} onClose={fecharQualquerModal} caixaId={caixaEditando?.id} caixa={caixaEditando} />
            <CriarProvasModal isOpen={modalProvaCriarAberto} onClose={fecharQualquerModal} caixaId={caixaAlvoId} tipoProva={tipoNovaProva} />
            <EditarProvasModal isOpen={modalProvaEditarAberto} onClose={fecharQualquerModal} caixaId={caixaDaProvaSelecionadaId} provaId={provaSelecionadaId} tipoProva={tipoProvaEditar} provaAtual={provaParaEditar}/>
            <ApagarProvasModal isOpen={modalProvaAberto} onClose={fecharQualquerModal} caixaId={caixaDaProvaSelecionadaId} provaId={provaSelecionadaId} />
            <ApagarCaixaProvasModal isOpen={modalCaixaApagarAberto} onClose={fecharQualquerModal} caixaId={caixaAlvoId} />
            {/* chama o onLogoutSucesso que é um prop do modal e passa o valor onLogout que o home recebeu por props */}
            <FazerLogoutModal isOpen={modalLogoutAberto} onClose={fecharQualquerModal} onLogoutSucesso={onLogout}></FazerLogoutModal>
        </Container>
        </>
    );
}

export default Home;