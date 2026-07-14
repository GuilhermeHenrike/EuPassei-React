import { useState, useEffect } from 'react';
// Importando a função de listagem geral que criamos na api.jsx
import { listarTodasCaixas } from '../../api';
// Caminhos e títulos de arquivos corrigidos exatamente como estão na sua árvore de arquivos
import ApagarProvasModal from '../../modal/provasModal/apagarProvasModal';
import ApagarCaixaProvasModal from '../../modal/caixaProvasModal/apagarCaixaProvasModal';
import CriarCaixaProvasModal from '../../modal/caixaProvasModal/criarCaixaProvasModal';
import EditarCaixaProvasModal from '../../modal/caixaProvasModal/editarCaixaProvasModal';
import CriarProvasModal from '../../modal/provasModal/criarProvasModal';
import EditarProvasModal from '../../modal/provasModal/editarProvasModal';

function Home() {
    const [caixas, setCaixas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    // Estados para controlar o Modal de Apagar PROVA
    const [modalProvaAberto, setModalProvaAberto] = useState(false);
    const [provaSelecionadaId, setProvaSelecionadaId] = useState(null);
    const [caixaDaProvaSelecionadaId, setCaixaDaProvaSelecionadaId] = useState(null);

    // Estados para controlar o Modal de Apagar CAIXA
    const [modalCaixaApagarAberto, setModalCaixaApagarAberto] = useState(false);
    const [caixaSelecionadaId, setCaixaSelecionadaId] = useState(null);

    // Estados para controlar o Modal de CRIAR/EDITAR CAIXA
    const [modalCaixaCriarAberto, setModalCaixaCriarAberto] = useState(false);
    const [modalCaixaEditarAberto, setModalCaixaEditarAberto] = useState(false);
    const [caixaEditando, setCaixaEditando] = useState(null);

    // Estados para controlar o Modal de ADICIONAR PROVA (Normal ou Final)
    const [modalProvaCriarAberto, setModalProvaCriarAberto] = useState(false);
    const [caixaAlvoId, setCaixaAlvoId] = useState(null);
    const [tipoNovaProva, setTipoNovaProva] = useState('NORMAL');

    // Estados para o modal de Editar Prova (Recuperação)
    const [modalProvaEditarAberto, setModalProvaEditarAberto] = useState(false);
    const [tipoProvaEditar, setTipoProvaEditar] = useState('NORMAL');

    // Função para buscar as caixas do backend Java
    const carregarDados = async () => {
        try {
            setCarregando(true);
            const resposta = await listarTodasCaixas();

            if (Array.isArray(resposta.data)) {
                setCaixas(resposta.data);
                setErro('');
            } else {
                console.error("O backend não retornou um array válido:", resposta.data);
                setCaixas([]);
                setErro('O servidor respondeu com um formato de dados inválido.');
            }
        } catch (err) {
            setErro('Não foi possível carregar as caixas do servidor.');
            console.error(err);
        } finally {
            setCarregando(false);
        }
    };

    // Carrega os dados assim que a página abre
    useEffect(() => {
        carregarDados();
    }, []);

    // Funções para abrir os modais configurando os IDs certos
    const abrirModalApagarProva = (caixaId, provaId) => {
        setCaixaDaProvaSelecionadaId(caixaId);
        setProvaSelecionadaId(provaId);
        setModalProvaAberto(true);
    };

    const abrirModalApagarCaixa = (caixaId) => {
        setCaixaSelecionadaId(caixaId);
        setModalCaixaApagarAberto(true);
    };

    const abrirModalEditarCaixa = (caixa) => {
        setCaixaEditando(caixa);
        setModalCaixaEditarAberto(true);
    };

    // Abre o modal configurando o tipo como NORMAL
    const abrirModalCriarProvaNormal = (caixaId) => {
        setCaixaAlvoId(caixaId);
        setTipoNovaProva('NORMAL');
        setModalProvaCriarAberto(true);
    };

    // Abre o MESMO modal configurando o tipo como FINAL de forma invisível
    const abrirModalCriarProvaFinal = (caixaId) => {
        setCaixaAlvoId(caixaId);
        setTipoNovaProva('FINAL');
        setModalProvaCriarAberto(true);
    };

    const abrirModalEditarProva = (caixaId, provaId, tipo) => {
        setCaixaDaProvaSelecionadaId(caixaId);
        setProvaSelecionadaId(provaId);
        setTipoProvaEditar(tipo);
        setModalProvaEditarAberto(true);
    };

    // Funções de fechamento que recarregam a lista pós-ações
    const fecharModalProva = () => {
        setModalProvaAberto(false);
        setCaixaDaProvaSelecionadaId(null);
        setProvaSelecionadaId(null);
        carregarDados();
    };

    const fecharModalApagarCaixa = () => {
        setModalCaixaApagarAberto(false);
        setCaixaSelecionadaId(null);
        carregarDados();
    };

    const fecharModalEditarCaixa = () => {
        setModalCaixaEditarAberto(false);
        setCaixaEditando(null);
        carregarDados();
    };

    const fecharModalCriarCaixa = () => {
        setModalCaixaCriarAberto(false);
        carregarDados();
    };

    const fecharModalCriarProva = () => {
        setModalProvaCriarAberto(false);
        setCaixaAlvoId(null);
        carregarDados();
    };

    const fecharModalEditarProva = () => {
        setModalProvaEditarAberto(false);
        setCaixaDaProvaSelecionadaId(null);
        setProvaSelecionadaId(null);
        setTipoProvaEditar('NORMAL');
        carregarDados();
    };

    if (carregando) return <p>Carregando caixas e provas...</p>;
    if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

    return (
        <>
            <div style={{ padding: '20px 20px 0 20px', fontFamily: 'sans-serif' }}>
                <button
                    onClick={() => setModalCaixaCriarAberto(true)}
                    style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Criar caixa de provas
                </button>
            </div>

            <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                <h1>Gerenciador de Caixas e Provas</h1>

                {caixas.length === 0 ? (
                    <p>Nenhuma caixa encontrada no system.</p>
                ) : (
                    caixas.map((caixa) => {
                        const listaProvasValida = static_cast_listaProvas(caixa.listaProvas);
                        const provasNormais = listaProvasValida.filter(p => p.tipo === 'NORMAL');
                        const totalProvasNormais = provasNormais.length;
                        const jaTemProvaFinal = listaProvasValida.some(p => p.tipo === 'FINAL');
                        const precisaDeMaisProvasNormal = totalProvasNormais < caixa.quantidade;
                        const podeAdicionarProvaFinal = caixa.temProvaFinal && caixa.situacao === 'Prova Final' && !jaTemProvaFinal;

                        return (
                            <div key={caixa.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h2>Caixa: {caixa.titulo || `ID ${caixa.id}`}</h2>
                                        <p style={{ margin: '5px 0', fontSize: '14px' }}>
                                            Situação: <strong style={{ color: caixa.situacao === 'Aprovado' ? 'green' : caixa.situacao === 'Prova Final' ? 'purple' : 'red' }}>{caixa.situacao}</strong>
                                        </p>
                                        <small style={{ color: '#555' }}>
                                            Progresso: {totalProvasNormais} de {caixa.quantidade} provas normais adicionadas
                                        </small>
                                        {caixa.pontosNecessarios > 0 && (
                                            <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#7b1fa2' }}>
                                                Nota necessária na Final: <strong>{caixa.pontosNecessarios.toFixed(2)}</strong>
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => abrirModalEditarCaixa(caixa)}
                                            style={{ backgroundColor: '#ff9800', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => abrirModalApagarCaixa(caixa.id)}
                                            style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            Excluir Caixa
                                        </button>
                                    </div>
                                </div>

                                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    <h3>Provas nesta caixa:</h3>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {precisaDeMaisProvasNormal && (
                                            <button
                                                onClick={() => abrirModalCriarProvaNormal(caixa.id)}
                                                style={{ backgroundColor: '#008CBA', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}
                                            >
                                                + Adicionar Prova ({caixa.quantidade - totalProvasNormais} restantes)
                                            </button>
                                        )}
                                        {podeAdicionarProvaFinal && (
                                            <button
                                                onClick={() => abrirModalCriarProvaFinal(caixa.id)}
                                                style={{ backgroundColor: '#9c27b0', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}
                                            >
                                                + Adicionar Prova Final
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {totalProvasNormais > 0 || jaTemProvaFinal ? (
                                    <ul style={{ listStylePosition: 'inside', paddingLeft: 0, textAlign: 'left', maxWidth: '550px', margin: '10px auto' }}>
                                        {listaProvasValida.map((prova) => (
                                            <li key={prova.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #eee', paddingBottom: '5px' }}>
                                                <span>
                                                    <strong>{prova.titulo || `Prova ID ${prova.id}`}</strong> (Nota: {prova.nota})
                                                    {prova.tipo === 'FINAL' && <span style={{ marginLeft: '5px', backgroundColor: '#e1bee7', color: '#4a148c', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>FINAL</span>}
                                                </span>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    {caixa.temRecuperacao && (
                                                        <button
                                                            onClick={() => abrirModalEditarProva(caixa.id, prova.id, prova.tipo)}
                                                            style={{ backgroundColor: '#ff9800', color: 'white', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                                                        >
                                                            Recuperação (Editar)
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => abrirModalApagarProva(caixa.id, prova.id)}
                                                        style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ fontStyle: 'italic', color: '#666', marginTop: '10px' }}>Esta caixa está vazia.</p>
                                )}
                            </div>
                        );
                    })
                )}

                <CriarCaixaProvasModal
                    isOpen={modalCaixaCriarAberto}
                    onClose={fecharModalCriarCaixa}
                />

                <EditarCaixaProvasModal
                    isOpen={modalCaixaEditarAberto}
                    onClose={fecharModalEditarCaixa}
                    caixaId={caixaEditando?.id}
                />

                <CriarProvasModal
                    isOpen={modalProvaCriarAberto}
                    onClose={fecharModalCriarProva}
                    caixaId={caixaAlvoId}
                    tipoProva={tipoNovaProva}
                    podeAdicionar={caixas.find(c => c.id === caixaAlvoId)?.podeAdicionarMaisProvasNormais ?? true}
                />

                <EditarProvasModal
                    isOpen={modalProvaEditarAberto}
                    onClose={fecharModalEditarProva}
                    caixaId={caixaDaProvaSelecionadaId}
                    provaId={provaSelecionadaId}
                    tipoProva={tipoProvaEditar}
                />

                <ApagarProvasModal
                    isOpen={modalProvaAberto}
                    onClose={fecharModalProva}
                    caixaId={caixaDaProvaSelecionadaId}
                    provaId={provaSelecionadaId}
                />

                <ApagarCaixaProvasModal
                    isOpen={modalCaixaApagarAberto}
                    onClose={fecharModalApagarCaixa}
                    caixaId={caixaSelecionadaId}
                />
            </div>
        </>
    );
}

function static_cast_listaProvas(prop) {
    return Array.isArray(prop) ? prop : [];
}

export default Home;