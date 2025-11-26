# Unimed FAQ - Portal de Atendimento ao Cliente

Aplicação web desenvolvida para a **Unimed Alto São Francisco** que oferece uma plataforma completa de atendimento ao cliente, incluindo FAQ inteligente e sistema de avaliação de satisfação (CSAT).

## 📋 Sobre o Projeto

Este projeto é uma aplicação React que permite aos clientes da Unimed:

- **Buscar respostas** em uma base de conhecimento (FAQ) com sistema de busca inteligente
- **Avaliar sua experiência** através de um formulário de satisfação (CSAT) que coleta:
  - Nota de recomendação (escala de 0 a 5)
  - Avaliação do atendimento médico (sentimento)
  - Feedback escrito sobre a experiência

Os dados do formulário CSAT são enviados diretamente para o Google Forms para análise e acompanhamento.

## 🚀 Funcionalidades

### FAQ Inteligente
- Busca por palavras-chave em perguntas, respostas e categorias
- Interface responsiva e moderna
- Exibição de resultados em tempo real
- Categorização de perguntas frequentes

### Sistema de Avaliação (CSAT)
- Formulário de avaliação com validação completa
- Escala de recomendação (0-5)
- Seleção de sentimento sobre o atendimento
- Campo de feedback livre
- Integração com Google Forms
- Dialog customizado para feedback ao usuário

## 🛠️ Tecnologias Utilizadas

- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **React Scripts 5.0.1** - Ferramentas de build e desenvolvimento
- **CSS Custom Properties** - Sistema de design com variáveis CSS
- **Google Forms API** - Integração para coleta de dados

## 📦 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AlertDialog.js   # Dialog customizado para mensagens
│   ├── FaqCard.js       # Card de pergunta/resposta
│   ├── FaqSearch.js     # Campo de busca
│   ├── Footer.js        # Rodapé do site
│   ├── Header.js        # Cabeçalho com navegação
│   ├── RecommendationScale.js  # Escala de recomendação
│   └── SentimentSelector.js     # Seletor de sentimento
├── pages/               # Páginas da aplicação
│   ├── CsatPage.js      # Página de avaliação
│   └── FaqPage.js       # Página de FAQ
├── data/                # Dados estáticos
│   └── faqSchema.json   # Base de conhecimento FAQ
├── assets/              # Imagens e recursos
└── App.js               # Componente principal
```

## 🎨 Design System

O projeto utiliza um sistema de design consistente baseado nas cores da marca Unimed:

- **Verde Principal**: `#00995d` - Cor primária da marca
- **Verde Secundário**: `#b1d34b` - Cor secundária
- **Laranja**: `#f47920` - Cor terciária (botões de ação)
- **Bordas arredondadas**: 14px-24px
- **Sombras suaves**: Para elevação de elementos

## 📝 Configuração do Google Forms

Para configurar o envio de dados para o Google Forms:

1. Crie um formulário no Google Forms
2. Abra as ferramentas de desenvolvedor (F12) no navegador
3. Inspecione os campos do formulário
4. Procure por atributos `name` que começam com `entry.`
5. Atualize os IDs em `src/pages/CsatPage.js`:

```javascript
const GOOGLE_FORM_ID = 'SEU_FORM_ID_AQUI';
const FIELD_IDS = {
  recommendation: 'entry.XXXXX',  // ID do campo de recomendação
  sentiment: 'entry.XXXXX',       // ID do campo de sentimento
  feedback: 'entry.XXXXX',         // ID do campo de feedback
};
```

## 🚀 Como Começar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd unimed_faq
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Google Forms (veja seção acima)

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

## 📜 Scripts Disponíveis

### `npm start`

Inicia o servidor de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

A página recarrega automaticamente quando você faz alterações.\
Erros de lint aparecerão no console.

### `npm test`

Inicia o test runner em modo interativo.\
Veja a [documentação sobre testes](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build`

Cria uma build de produção na pasta `build`.\
O código é otimizado e minificado para melhor performance.

A build está pronta para deploy!

### `npm run eject`

**⚠️ Atenção: Esta é uma operação irreversível!**

Remove a dependência única de build do projeto e copia todos os arquivos de configuração diretamente para o projeto, dando controle total sobre as ferramentas de build.

**Não é necessário usar `eject`** - o conjunto de funcionalidades é adequado para a maioria dos projetos.

## 🔧 Desenvolvimento

### Adicionando Perguntas ao FAQ

Edite o arquivo `src/data/faqSchema.json` para adicionar novas perguntas:

```json
{
  "faqEntries": [
    {
      "id": "unique-id",
      "category": "Categoria",
      "question": "Pergunta do cliente?",
      "answer": "Resposta detalhada...",
      "keywords": ["palavra1", "palavra2"]
    }
  ]
}
```

### Personalizando Cores

As cores podem ser ajustadas em `src/App.css` através das variáveis CSS:

```css
:root {
  --brand-color-primary-pure: #00995d;
  --brand-color-secundary-pure: #b1d34b;
  --brand-color-tertiary-pure: #f47920;
}
```

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona bem em:
- Desktop
- Tablet
- Mobile

## 🐛 Troubleshooting

### Erro ao enviar formulário CSAT

- Verifique se os IDs dos campos do Google Forms estão corretos
- Confirme que o `GOOGLE_FORM_ID` está atualizado
- Verifique o console do navegador para logs detalhados

### Problemas de CORS

O formulário usa `mode: 'no-cors'` para evitar problemas de CORS. Isso é normal e esperado.

## 📚 Recursos Adicionais

- [Documentação do Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [Documentação do React](https://reactjs.org/)
- [Google Forms - Criar formulários](https://www.google.com/forms/about/)

## 📄 Licença

Este projeto é privado e de propriedade da Unimed Alto São Francisco.

---

**Desenvolvido para Unimed Alto São Francisco** 🏥
