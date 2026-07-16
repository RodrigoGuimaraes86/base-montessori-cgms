# Montessori Reference

Portal de referência **bilíngue (Português 🇧🇷 / English 🇺🇸)** sobre o **Método Montessori** —
biografia de Maria Montessori, conceitos-chave, metodologia, materiais e planos de
desenvolvimento.

O site publicado é **estático** (HTML, CSS e JavaScript) e **não precisa de build para
ser servido**. As páginas são geradas por um pequeno script Node (`build.mjs`) a partir
dos textos em `content/`, garantindo que o cabeçalho, o rodapé, o menu e o **seletor de
idioma (PT | EN)** fiquem sempre idênticos nas duas línguas.

## Estrutura

```
.
├── build.mjs                 # Gerador: monta as páginas PT e EN a partir de content/
├── content/
│   ├── pt/                   # Textos em Português (só o conteúdo de cada página)
│   │   ├── home.html  bio.html  concepts.html
│   │   ├── method.html  materials.html  planes.html
│   └── en/                   # Mesmos arquivos, em Inglês
│
│   ── SAÍDA GERADA (não editar à mão) ──
├── index.html                # Redireciona conforme o idioma do navegador
├── 404.html                  # Página de erro bilíngue
├── pt/                        # Site em Português (index.html, maria-montessori.html, …)
├── en/                        # Site em Inglês (index.html, key-concepts.html, …)
│
├── assets/
│   ├── css/styles.css        # Sistema de design (cores, tipografia, componentes)
│   └── js/main.js            # Menu mobile e ano do rodapé
├── .github/workflows/deploy.yml   # Publicação automática no GitHub Pages
└── .nojekyll
```

> **Regra de ouro:** edite os textos em **`content/pt/`** e **`content/en/`** e depois rode
> `node build.mjs`. Nunca edite diretamente os arquivos dentro de `pt/` e `en/` — eles são
> sobrescritos a cada geração.

## Gerar o site

```bash
node build.mjs
```

Não há dependências externas: usa apenas o Node.js.

## Ver o site localmente

```bash
python3 -m http.server 8000
# Acesse http://localhost:8000  (redireciona para /pt/ ou /en/ conforme o navegador)
```

## Publicar (GitHub Pages — gratuito)

1. No GitHub, vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. A cada `push`, o fluxo em `.github/workflows/deploy.yml` publica o site.

> Domínio próprio: em **Settings → Pages → Custom domain**, informe seu domínio e configure
> o DNS na sua registradora. O HTTPS é gratuito.

### Alternativa: Vercel
Importe o repositório em [vercel.com](https://vercel.com) com framework preset **Other** e
Output Directory na raiz (`.`). O Vercel gera links de pré-visualização a cada alteração.

## Como editar e expandir (sempre nos dois idiomas)

- **Alterar um texto:** edite o arquivo correspondente em `content/pt/` **e** em `content/en/`,
  depois rode `node build.mjs`.
- **Cores e fontes:** ajuste as variáveis no topo de `assets/css/styles.css` (bloco `:root`).
- **Nova página:** crie o fragmento em `content/pt/<chave>.html` e `content/en/<chave>.html`,
  e adicione a página ao array `PAGES` em `build.mjs` (com o slug, o rótulo do menu, o título
  e a descrição em cada idioma). Rode `node build.mjs`.
- **Imagens:** coloque os arquivos em `assets/img/` e referencie com
  `<img src="../assets/img/arquivo.jpg" alt="descrição">` (caminho relativo a partir de `pt/`
  ou `en/`).

## Conteúdo

O conteúdo atual é uma **base de referência** revisável, escrita a partir de fontes
consolidadas sobre Maria Montessori e seu método. Deve ser complementado e refinado com o
material específico do projeto (por exemplo, o conteúdo do site original).
