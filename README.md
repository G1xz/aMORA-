# aMORA - Simulador Financeiro

Simulador financeiro para cálculo de financiamento imobiliário, desenvolvido em Next.js com TypeScript, Tailwind CSS e animações com Framer Motion.

---

## 📋 Sobre o Projeto

Este projeto permite que o usuário simule um financiamento de imóvel informando:

- Valor do imóvel
- Percentual de entrada (entre 5% e 20%)
- Prazo do financiamento (entre 1 e 5 anos)

Ao submeter o formulário, o sistema realiza uma requisição para uma API que retorna os valores calculados:

- Valor de entrada
- Valor financiado
- Total a pagar
- Parcela mensal

O resultado é exibido na interface .

---

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React (ícones)](https://lucide.dev/)

---

## Como Rodar o Projeto

### Pré-requisitos

- Node.js
- Yarn ou npm
- Docker e Docker Compose (para rodar a API localmente)

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/G1xz/aMORA-.git
```

2. Instale as dependências:

```bash
cd Frontend
npm install
# ou
yarn
```

3. Suba a API com Docker:

```bash
cd Backend
docker build -t simulador-api .
docker run -p 8000:8000 simulador-api
```

> A API estará disponível em `http://localhost:8000`.

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

5. Acesse no navegador:

[http://localhost:3000](http://localhost:3000)

---

## 📦 Funcionalidades

- Validação de formulário com mensagens de erro
- Máscara para o campo de valor do imóvel
- Exibição de resultados com destaque e ícones
- Botão para imprimir o resultado
- Layout responsivo

---

## 📁 Estrutura de Pastas (resumo)

```
.
├── Backend/                        # API FastAPI
│   ├── dockerfile                 # Dockerfile da API
│   ├── main.py                    # Código principal da API
│   └── requirements.txt           # Dependências da API
│
├── Frontend/                      # Aplicação Front-end (Next.js)
│   ├── app/
│   │   └── page.tsx               # Página principal com lógica do simulador
│   ├── _components/ui/           # Componentes de UI reutilizáveis (shadcn/ui)
│   ├── public/
│   │   └── logo.jpg              # Logo exibida no cabeçalho
│   ├── globals.css               # Estilos globais com Tailwind
│   ├── layout.tsx                # Layout principal da aplicação
│   ├── tailwind.config.ts        # Configuração do Tailwind
│   ├── tsconfig.json             # Configuração do TypeScript
│   └── package.json              # Dependências do front-end
│
└── README.md

```

---

## 👨‍💻 Desenvolvedor

Feito por **Guilherme Junior**  
📧 guijunior132@gmail.com  
🔗 https://www.linkedin.com/in/guilherme-junior-068887299/
