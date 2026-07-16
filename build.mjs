/* =========================================================================
   Montessori Reference — gerador estático bilíngue (PT / EN)
   -------------------------------------------------------------------------
   Lê os fragmentos de conteúdo em content/<lang>/<key>.html e os envolve
   com cabeçalho, rodapé, navegação e seletor de idioma idênticos, gerando:
     - pt/<slug>.html  e  en/<slug>.html
     - index.html  (redireciona conforme o idioma do navegador)
     - 404.html    (bilíngue, autossuficiente)

   O SITE PUBLICADO É ESTÁTICO: basta rodar `node build.mjs` e commitar a
   saída. Nenhuma dependência externa é necessária.
   ========================================================================= */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

/* ---------- Configuração das páginas ---------- */
const PAGES = [
  {
    key: "home",
    pt: { slug: "index.html", nav: "Início",
          title: "Montessori Reference — Referência sobre o Método Montessori",
          desc: "Portal de referência sobre o Método Montessori: biografia de Maria Montessori, conceitos-chave, metodologia, materiais e planos de desenvolvimento." },
    en: { slug: "index.html", nav: "Home",
          title: "Montessori Reference — A Reference on the Montessori Method",
          desc: "A reference portal on the Montessori Method: Maria Montessori's biography, key concepts, methodology, materials and planes of development." },
  },
  {
    key: "bio",
    pt: { slug: "maria-montessori.html", nav: "Maria Montessori",
          title: "Maria Montessori — Biografia | Montessori Reference",
          desc: "A vida de Maria Montessori (1870–1952): a médica e cientista italiana que criou o Método Montessori." },
    en: { slug: "maria-montessori.html", nav: "Maria Montessori",
          title: "Maria Montessori — Biography | Montessori Reference",
          desc: "The life of Maria Montessori (1870–1952): the Italian physician and scientist who created the Montessori Method." },
  },
  {
    key: "concepts",
    pt: { slug: "conceitos-chave.html", nav: "Conceitos-chave",
          title: "Conceitos-chave do Método Montessori | Montessori Reference",
          desc: "Os conceitos fundamentais do Método Montessori: mente absorvente, períodos sensíveis, ambiente preparado, normalização e o papel do adulto." },
    en: { slug: "key-concepts.html", nav: "Key Concepts",
          title: "Key Concepts of the Montessori Method | Montessori Reference",
          desc: "The core concepts of the Montessori Method: the absorbent mind, sensitive periods, the prepared environment, normalization and the role of the adult." },
  },
  {
    key: "method",
    pt: { slug: "metodologia.html", nav: "A Metodologia",
          title: "A Metodologia Montessori na prática | Montessori Reference",
          desc: "Como o Método Montessori funciona na prática: o ambiente preparado, o ciclo de trabalho, a lição em três tempos e o papel do guia." },
    en: { slug: "methodology.html", nav: "Methodology",
          title: "The Montessori Methodology in practice | Montessori Reference",
          desc: "How the Montessori Method works in practice: the prepared environment, the work cycle, the three-period lesson and the role of the guide." },
  },
  {
    key: "materials",
    pt: { slug: "materiais.html", nav: "Materiais",
          title: "Os Materiais Montessori | Montessori Reference",
          desc: "Os materiais Montessori: objetos concretos e autocorretivos organizados por área — vida prática, sensorial, linguagem, matemática e cultura." },
    en: { slug: "materials.html", nav: "Materials",
          title: "The Montessori Materials | Montessori Reference",
          desc: "The Montessori materials: concrete, self-correcting objects organized by area — practical life, sensorial, language, mathematics and culture." },
  },
  {
    key: "planes",
    pt: { slug: "planos-de-desenvolvimento.html", nav: "Planos de Desenvolvimento",
          title: "Os Quatro Planos de Desenvolvimento | Montessori Reference",
          desc: "Os quatro planos de desenvolvimento de Maria Montessori: infância (0–6), meninice (6–12), adolescência (12–18) e maturidade (18–24)." },
    en: { slug: "planes-of-development.html", nav: "Planes of Development",
          title: "The Four Planes of Development | Montessori Reference",
          desc: "Maria Montessori's four planes of development: infancy (0–6), childhood (6–12), adolescence (12–18) and maturity (18–24)." },
  },
];

/* ---------- Textos de interface por idioma ---------- */
const UI = {
  pt: {
    htmlLang: "pt-BR",
    tagline: "Referência do Método",
    skip: "Pular para o conteúdo",
    menu: "Abrir menu",
    langLabel: "Idioma",
    footerNav: "Navegação",
    footerMore: "Continue",
    footerAbout: "Um portal de referência dedicado a apresentar o Método Montessori com clareza e respeito à sua fonte.",
    footerRights: "Conteúdo educacional.",
    footerMade: "Feito com cuidado.",
  },
  en: {
    htmlLang: "en",
    tagline: "Method Reference",
    skip: "Skip to content",
    menu: "Open menu",
    langLabel: "Language",
    footerNav: "Navigation",
    footerMore: "Continue",
    footerAbout: "A reference portal dedicated to presenting the Montessori Method with clarity and respect for its source.",
    footerRights: "Educational content.",
    footerMade: "Made with care.",
  },
};

const LOGO = `<svg class="logo" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1.5" y="1.5" width="45" height="45" rx="13" fill="#f6e3d8" stroke="#c06844" stroke-width="1.5"/>
      <rect x="12" y="26" width="6" height="10" rx="2" fill="#7d8c6a"/>
      <rect x="21" y="20" width="6" height="16" rx="2" fill="#c06844"/>
      <rect x="30" y="14" width="6" height="22" rx="2" fill="#b98b5c"/>
    </svg>`;

const FAVICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect width='48' height='48' rx='12' fill='%23c06844'/><rect x='12' y='26' width='6' height='10' rx='2' fill='%23fff'/><rect x='21' y='20' width='6' height='16' rx='2' fill='%23fff'/><rect x='30' y='14' width='6' height='22' rx='2' fill='%23fff'/></svg>";

const p = (lang, key) => PAGES.find((x) => x.key === key)[lang];

/* ---------- Layout ---------- */
function render(lang, page) {
  const other = lang === "pt" ? "en" : "pt";
  const t = UI[lang];
  const self = page[lang];
  const body = read(`content/${lang}/${page.key}.html`);

  // Links do seletor de idioma (relativos entre pastas irmãs pt/ e en/)
  const selfHref = self.slug;
  const otherHref = `../${other}/${p(other, page.key).slug}`;

  const navItems = PAGES.map((pg) => {
    const item = pg[lang];
    const active = pg.key === page.key ? ' class="active"' : "";
    return `        <li><a href="${item.slug}"${active}>${item.nav}</a></li>`;
  }).join("\n");

  const footerNav = ["home", "bio", "concepts", "method"]
    .map((k) => `          <a href="${p(lang, k).slug}">${p(lang, k).nav}</a>`).join("\n");
  const footerMore = ["materials", "planes"]
    .map((k) => `          <a href="${p(lang, k).slug}">${p(lang, k).nav}</a>`).join("\n");

  return `<!DOCTYPE html>
<html lang="${t.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${self.title}</title>
  <meta name="description" content="${self.desc}" />
  <meta name="theme-color" content="#faf6ef" />
  <meta property="og:title" content="${self.title}" />
  <meta property="og:description" content="${self.desc}" />
  <meta property="og:type" content="website" />
  <link rel="alternate" hreflang="pt-BR" href="${lang === "pt" ? selfHref : otherHref}" />
  <link rel="alternate" hreflang="en" href="${lang === "en" ? selfHref : otherHref}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Nunito+Sans:wght@400;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/styles.css" />
  <link rel="icon" href="${FAVICON}" />
</head>
<body>
  <a class="skip-link" href="#main">${t.skip}</a>

  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="index.html" aria-label="Montessori Reference">
        ${LOGO}
        <span>Montessori Reference<small>${t.tagline}</small></span>
      </a>

      <ul class="nav-links" id="nav-links">
${navItems}
      </ul>

      <div class="lang-switch" role="group" aria-label="${t.langLabel}">
        <a href="${lang === "pt" ? selfHref : `../pt/${p("pt", page.key).slug}`}"${lang === "pt" ? ' class="active" aria-current="true"' : ""} lang="pt-BR" hreflang="pt-BR">PT</a>
        <a href="${lang === "en" ? selfHref : `../en/${p("en", page.key).slug}`}"${lang === "en" ? ' class="active" aria-current="true"' : ""} lang="en" hreflang="en">EN</a>
      </div>

      <button class="nav-toggle" aria-label="${t.menu}" aria-controls="nav-links" aria-expanded="false"><span></span></button>
    </div>
  </header>

  <main id="main">
${body.trimEnd()}
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <span class="footer-brand">${LOGO}Montessori Reference</span>
          <p style="max-width:32ch">${t.footerAbout}</p>
        </div>
        <div>
          <h4>${t.footerNav}</h4>
${footerNav}
        </div>
        <div>
          <h4>${t.footerMore}</h4>
${footerMore}
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span data-year>2026</span> Montessori Reference. ${t.footerRights}</span>
        <span>${t.footerMade}</span>
      </div>
    </div>
  </footer>

  <script src="../assets/js/main.js"></script>
</body>
</html>
`;
}

/* ---------- index.html raiz (redireciona por idioma) ---------- */
function renderRoot() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Montessori Reference</title>
  <meta name="robots" content="noindex" />
  <link rel="alternate" hreflang="pt-BR" href="pt/index.html" />
  <link rel="alternate" hreflang="en" href="en/index.html" />
  <link rel="alternate" hreflang="x-default" href="pt/index.html" />
  <link rel="icon" href="${FAVICON}" />
  <script>
    (function () {
      var l = (navigator.language || navigator.userLanguage || "pt").toLowerCase();
      location.replace(l.indexOf("en") === 0 ? "en/index.html" : "pt/index.html");
    })();
  </script>
  <meta http-equiv="refresh" content="0; url=pt/index.html" />
  <style>body{font-family:system-ui,sans-serif;text-align:center;margin-top:20vh;color:#5b5147;background:#faf6ef}a{color:#a4512f;font-weight:700}</style>
</head>
<body>
  <p>Redirecionando… / Redirecting…<br /><br />
    <a href="pt/index.html">Português</a> &nbsp;·&nbsp; <a href="en/index.html">English</a>
  </p>
</body>
</html>
`;
}

/* ---------- 404 bilíngue e autossuficiente ---------- */
function render404() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 — Montessori Reference</title>
  <meta name="robots" content="noindex" />
  <link rel="icon" href="${FAVICON}" />
  <style>
    :root{color-scheme:light}
    body{margin:0;min-height:100vh;display:grid;place-items:center;text-align:center;
      font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
      background:#faf6ef;color:#2c2620;padding:2rem}
    .eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:.78rem;font-weight:800;color:#a4512f}
    h1{font-size:clamp(1.8rem,5vw,2.6rem);margin:.4rem 0}
    p{color:#5b5147;max-width:44ch;margin:0 auto 1.6rem}
    a.btn{display:inline-block;margin:.3rem;padding:.7rem 1.3rem;border-radius:999px;
      background:#c06844;color:#fff;text-decoration:none;font-weight:800}
    a.btn.alt{background:#fff;color:#a4512f;border:1.5px solid #e6dccb}
  </style>
</head>
<body>
  <div>
    <p class="eyebrow">Erro 404</p>
    <h1>Página não encontrada<br />Page not found</h1>
    <p>O conteúdo pode ter mudado de lugar. / This page may have moved.</p>
    <a class="btn" href="/pt/index.html">Início (PT)</a>
    <a class="btn alt" href="/en/index.html">Home (EN)</a>
  </div>
</body>
</html>
`;
}

/* ---------- Execução ---------- */
function ensureDir(d) { fs.mkdirSync(path.join(ROOT, d), { recursive: true }); }
function write(rel, content) {
  ensureDir(path.dirname(rel));
  fs.writeFileSync(path.join(ROOT, rel), content);
  console.log("  ✓", rel);
}

console.log("Gerando site bilíngue…");
for (const lang of ["pt", "en"]) {
  for (const page of PAGES) write(`${lang}/${page[lang].slug}`, render(lang, page));
}
write("index.html", renderRoot());
write("404.html", render404());
console.log("Concluído.");
