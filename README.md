# Montessori Reference

Portal de referência sobre o **Método Montessori** — biografia de Maria Montessori,
conceitos-chave, metodologia, materiais e planos de desenvolvimento.

Site **estático** (HTML, CSS e JavaScript), sem dependências e **sem etapa de build**.
Isso o torna rápido, fácil de manter e simples de publicar.

## Estrutura

```
.
├── index.html                      # Início
├── maria-montessori.html           # Biografia
├── conceitos-chave.html            # Conceitos-chave
├── metodologia.html                # A metodologia na prática
├── materiais.html                  # Os materiais Montessori
├── planos-de-desenvolvimento.html  # Os quatro planos
├── 404.html                        # Página de erro
├── assets/
│   ├── css/styles.css              # Sistema de design (cores, tipografia, componentes)
│   ├── js/main.js                  # Menu mobile e ano do rodapé
│   └── img/                        # Imagens (a adicionar)
├── .github/workflows/deploy.yml    # Publicação automática no GitHub Pages
└── .nojekyll                       # Serve os arquivos como estão
```

## Ver o site localmente

Como é um site estático, basta abrir o `index.html` no navegador.
Para navegar entre as páginas com caminhos corretos, use um servidor local:

```bash
# Python (já vem na maioria dos sistemas)
python3 -m http.server 8000
# Depois acesse http://localhost:8000
```

## Publicar (GitHub Pages — gratuito)

1. No GitHub, vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Pronto: a cada `push`, o fluxo em `.github/workflows/deploy.yml` publica o site.
   O endereço aparece na aba **Actions** e em **Settings → Pages**.

> Domínio próprio: em **Settings → Pages → Custom domain**, informe seu domínio
> (ex.: `www.seudominio.com.br`) e configure o DNS na sua registradora. O HTTPS é gratuito.

### Alternativa: Vercel
Importe o repositório em [vercel.com](https://vercel.com), sem configuração de build
(framework preset: **Other**). O Vercel gera links de pré-visualização a cada alteração.

## Como editar e expandir

- **Textos:** edite diretamente o `.html` da página correspondente.
- **Cores e fontes:** ajuste as variáveis no topo de `assets/css/styles.css` (bloco `:root`).
- **Nova página:** copie uma página existente, troque o conteúdo dentro de `<main>` e
  atualize os menus (`.nav-links` no cabeçalho e o rodapé) em todas as páginas.
- **Imagens:** coloque os arquivos em `assets/img/` e referencie com
  `<img src="assets/img/arquivo.jpg" alt="descrição">`.

## Conteúdo

O conteúdo atual é uma **base de referência** revisável, escrita a partir de fontes
consolidadas sobre Maria Montessori e seu método. Deve ser complementado e refinado
com o material específico do projeto (por exemplo, o conteúdo do site original).
