# EuPassei

## Sobre o Projeto
O **EuPassei** é uma aplicação web desenvolvida para auxiliar estudantes a gerenciarem suas notas, organizarem caixas de provas (Matérias) e calcularem médias acadêmicas de forma prática e intuitiva.
O sistema resolve o problema do acompanhamento escolar/universitário disperso, centralizando o controle de notas parciais, recuperação e provas finais em um único ambiente seguro.

### 🛠️ Tecnologias Principais
* **Back-end:** Java 17, Spring Boot, Spring Data JPA, Spring Security (BCrypt), Hibernate, Bean Validation, Banco de Dados Relacional (MySQL)
* **Front-end:** React (Vite), Axios, Material UI (MUI)

---

🌐 Acesso

A aplicação está disponível em produção:

🔗 Acessar aplicação
* [Acessar](https://eu-passei-react.vercel.app/)

O projeto foi publicado utilizando:
Frontend: Vercel
Backend e Banco de dados: Render

Nota: Como o backend está hospedado no plano gratuito do Render, o serviço pode entrar em modo de suspensão após um período de inatividade. Nesse caso, a primeira requisição pode levar algum tempo para ser processada enquanto o servidor é reativado.

---

## 🗂️ Estrutura do Repositório
O projeto está dividido em duas partes:
* [Back-end (API)](https://github.com/GuilhermeHenrike/euPassei)
* [Front-end (Interface)](https://github.com/GuilhermeHenrike/euPassei---react)

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
* [Java Development Kit (JDK 17 ou superior)](https://www.oracle.com/java/technologies/downloads/)
* [Maven](https://maven.apache.org/) (ou utilize o wrapper embutido `mvnw`)
* [Node.js](https://nodejs.org/) (versão 18+ recomendada)
* [Git](https://git-scm.com/)

---

### Rodando o Front-end

Clone o repositório, acesse a pasta, instale as dependências e inicie o ambiente de desenvolvimento:

```bash
# Clone o repositório do front-end
git clone <url-do-repo-do-front>

# Entre na pasta do projeto
cd <pasta-do-front>

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
