# Favorita Estética — Site Institucional

Site institucional (somente **frontend**) da clínica de estética **Favorita Estética**, em Santa Maria/DF. Não há backend, banco de dados ou painel administrativo — apenas HTML, CSS e JavaScript puro.

## Objetivo

Apresentar a clínica, seus protocolos e métodos, depoimentos e promoções, e converter visitantes em agendamentos via WhatsApp.

## Estrutura de pastas

```
favorita-estetica/
├── index.html                  → página principal
├── politica-de-privacidade.html
├── termos-de-uso.html
├── css/
│   ├── style.css                → estilos principais (cores, tipografia, seções)
│   └── responsive.css           → ajustes de responsividade
├── js/
│   └── script.js                → menu, carrossel, FAQ, depoimentos, cookies, formulário
├── images/
│   ├── logo/                    → logomarca
│   ├── hero/                    → imagens do carrossel principal
│   ├── protocolos/              → imagens dos cards de protocolos
│   ├── metodos/                 → ícones/imagens dos métodos
│   ├── depoimentos/             → fotos de clientes (depoimentos)
│   ├── promocoes/               → imagem e QR Code da promoção
│   └── geral/                   → imagem de apresentação, og-image etc.
├── assets/
│   ├── icons/
│   └── fonts/
└── README.md
```

> As imagens usadas atualmente estão salvas localmente em `images/local/`, para que o site continue funcionando mesmo sem depender do Unsplash ou de outro servidor de imagens. Substitua esses arquivos pelos materiais reais da clínica quando desejar.

## Como executar o site localmente

Como é um projeto 100% estático, basta abrir o arquivo `index.html` diretamente no navegador, ou rodar um servidor local simples, por exemplo:

```bash
# Python 3
python -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 (variáveis, grid, flexbox, animações)
- JavaScript puro (sem frameworks ou bibliotecas externas)

## Observações importantes

- O formulário da seção de contato é **apenas visual**: ele não envia nem armazena dados em nenhum servidor. Ao ser enviado, ele apenas abre uma conversa de WhatsApp já preenchida com os dados digitados.
- O banner de cookies grava apenas uma preferência local no navegador (`localStorage`), sem qualquer coleta de dados em servidor.
- Não existe login, cadastro, autenticação ou CRUD neste projeto — qualquer necessidade futura de painel administrativo exigirá um projeto à parte, com backend.
