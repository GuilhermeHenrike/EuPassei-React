import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true // pra enviar o session do back
})

        // AUTH

export const fazerRegistro = (dadosUsuario) => {
    return api.post(`/register`, dadosUsuario)
}

export const fazerLogin = (dadosUsuario) => {
    return api.post(`/login`, dadosUsuario)
}

        // LOGOUT
export const fazerLogout = () => {
    return api.post(`/logout`)
}

        // PROVAS

export const criarProva = (caixaId, dadosProva) => {
    return api.post(`/provas/${caixaId}`, dadosProva)
}

export const editarProvas = (caixaId, dadosProva) => {
    return api.put(`/provas/${caixaId}`, dadosProva)
}

export const deletarProva = (caixaId, provaId) => {
    return api.delete(`/provas/${caixaId}/${provaId}`)
}

        // CAIXA DE PROVAS

export const criarCaixa = (dadosCaixa) => {
    return api.post(`/caixaProvas`, dadosCaixa)
}

export const editarCaixa = (caixaId, dadosCaixa) => {
    return api.put(`/caixaProvas/${caixaId}`, dadosCaixa)
}

export const listarTodasCaixas = () => {
    return api.get(`/caixaProvas`)
}

export const deletarCaixa = (caixaId) => {
    return api.delete(`/caixaProvas/${caixaId}`)
}