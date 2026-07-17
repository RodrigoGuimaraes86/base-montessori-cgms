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
          desc: "Portal de referência sobre o Método Montessori: biografia de Maria Montessori, os princípios orientadores, os planos de desenvolvimento, a lição em três tempos e a observação." },
    en: { slug: "index.html", nav: "Home",
          title: "Montessori Reference — A Reference on the Montessori Method",
          desc: "A reference portal on the Montessori Method: Maria Montessori's biography, the guiding principles, the planes of development, the three-period lesson and observation." },
  },
  {
    key: "bio",
    pt: { slug: "maria-montessori.html", nav: "Maria Montessori",
          title: "Maria Montessori — Biografia | Montessori Reference",
          desc: "A vida de Maria Montessori (1870–1952): médica, educadora, feminista e pacifista, criadora do Método Montessori." },
    en: { slug: "maria-montessori.html", nav: "Maria Montessori",
          title: "Maria Montessori — Biography | Montessori Reference",
          desc: "The life of Maria Montessori (1870–1952): physician, educator, feminist and peacemaker, creator of the Montessori Method." },
  },
  {
    key: "principles",
    pt: { slug: "principios-orientadores.html", nav: "Princípios",
          title: "Princípios Orientadores (CGMS) | Montessori Reference",
          desc: "Os 13 princípios fundamentais da filosofia Montessori, sistematizados pelo Center for Guided Montessori Studies (CGMS)." },
    en: { slug: "guiding-principles.html", nav: "Principles",
          title: "Guiding Principles (CGMS) | Montessori Reference",
          desc: "The 13 fundamental principles of the Montessori philosophy, as systematized by the Center for Guided Montessori Studies (CGMS)." },
  },
  {
    key: "planes",
    pt: { slug: "planos-de-desenvolvimento.html", nav: "Planos",
          title: "Os Quatro Planos de Desenvolvimento | Montessori Reference",
          desc: "Os quatro planos de desenvolvimento de Maria Montessori: infância (0–6), meninice (6–12), adolescência (12–18) e maturidade (18–24)." },
    en: { slug: "planes-of-development.html", nav: "Planes",
          title: "The Four Planes of Development | Montessori Reference",
          desc: "Maria Montessori's four planes of development: infancy (0–6), childhood (6–12), adolescence (12–18) and maturity (18–24)." },
  },
  {
    key: "second-plane",
    pt: { slug: "segundo-plano.html", nav: "Segundo Plano",
          title: "O Segundo Plano (6–12 anos) | Montessori Reference",
          desc: "O segundo plano de desenvolvimento (6–12 anos): a mente da razão, os períodos sensíveis e as tendências humanas dessa fase." },
    en: { slug: "second-plane.html", nav: "Second Plane",
          title: "The Second Plane (6–12 years) | Montessori Reference",
          desc: "The second plane of development (6–12 years): the reasoning mind, the sensitive periods and the human tendencies of this stage." },
  },
  {
    key: "three-period-lesson",
    pt: { slug: "licao-em-tres-tempos.html", nav: "Lição de 3 Tempos",
          title: "A Lição em Três Tempos | Montessori Reference",
          desc: "A técnica da lição em três tempos: definição, associação e confirmação do conceito — e sua aplicação em cada plano e idade." },
    en: { slug: "three-period-lesson.html", nav: "3-Period Lesson",
          title: "The Three Period Lesson | Montessori Reference",
          desc: "The three-period lesson technique: naming, association and confirmation of the concept — and its application at each plane and age." },
  },
  {
    key: "observation",
    pt: { slug: "observacao.html", nav: "Observação",
          title: "A Observação e o método C.O.R.E. | Montessori Reference",
          desc: "A observação no Método Montessori: seu propósito e o processo C.O.R.E. (Connect, Obtain, Reflect, Engage) de Paul Epstein." },
    en: { slug: "observation.html", nav: "Observation",
          title: "Observation and the C.O.R.E. process | Montessori Reference",
          desc: "Observation in the Montessori Method: its purpose and Paul Epstein's C.O.R.E. process (Connect, Obtain, Reflect, Engage)." },
  },
];

/* ---------- Páginas do menu "Outros" (dropdown) ---------- */
const EXTRAS = [
  {
    key: "class-leadership",
    pt: { slug: "lideranca-de-classe.html", nav: "Liderança de Classe",
          title: "Liderança de Classe | Montessori Reference",
          desc: "Liderar uma classe Montessori: planejamento e registros, graça e cortesia, construção de comunidade, disciplina positiva e direitos e responsabilidades." },
    en: { slug: "class-leadership.html", nav: "Class Leadership",
          title: "Class Leadership | Montessori Reference",
          desc: "Leading a Montessori class: planning and record keeping, grace and courtesy, community building, positive discipline, and rights and responsibilities." },
  },
  {
    key: "prepared-environment",
    pt: { slug: "ambiente-preparado.html", nav: "Ambiente Preparado",
          title: "O Ambiente Preparado | Montessori Reference",
          desc: "O ambiente preparado Montessori e suas diferenças no Elementário inferior (6–9) e superior (9–12)." },
    en: { slug: "prepared-environment.html", nav: "Prepared Environment",
          title: "The Prepared Environment | Montessori Reference",
          desc: "The Montessori prepared environment and how it differs in Lower (6–9) and Upper (9–12) Elementary." },
  },
  {
    key: "classroom-materials",
    pt: { slug: "materiais-de-sala.html", nav: "Materiais de Sala",
          title: "Materiais de Sala | Montessori Reference",
          desc: "Características de materiais de qualidade (comprados e feitos à mão), a abstração materializada e o que torna um material didático." },
    en: { slug: "classroom-materials.html", nav: "Classroom Materials",
          title: "Classroom Materials | Montessori Reference",
          desc: "Characteristics of quality materials (purchased and handmade), materialized abstraction, and what makes a material didactic." },
  },
  {
    key: "teacher-transformation",
    pt: { slug: "transformacao-do-professor.html", nav: "Transformação do Professor",
          title: "A Transformação do Professor | Montessori Reference",
          desc: "A preparação interior do adulto Montessori: o estudo de si mesmo e a passagem de instrutor a guia." },
    en: { slug: "transformation-of-the-teacher.html", nav: "Transformation of the Teacher",
          title: "The Transformation of the Teacher | Montessori Reference",
          desc: "The inner preparation of the Montessori adult: the study of one's self and the passage from instructor to guide." },
  },
  {
    key: "normalization",
    pt: { slug: "normalizacao.html", nav: "Normalização",
          title: "Normalização | Montessori Reference",
          desc: "A normalização: como o trabalho livremente escolhido e a concentração revelam a verdadeira natureza da criança." },
    en: { slug: "normalization.html", nav: "Normalization",
          title: "Normalization | Montessori Reference",
          desc: "Normalization: how freely chosen work and concentration reveal the child's true nature." },
  },
  {
    key: "elementary-curriculum",
    pt: { slug: "curriculo-elementar.html", nav: "Currículo Elementar",
          title: "O Currículo Elementar | Montessori Reference",
          desc: "O currículo do Elementário Montessori: o Currículo Cósmico, o currículo em espiral e o princípio de seguir a criança." },
    en: { slug: "elementary-curriculum.html", nav: "Elementary Curriculum",
          title: "The Elementary Curriculum | Montessori Reference",
          desc: "The Montessori Elementary curriculum: the Cosmic Curriculum, the spiral curriculum and the principle of following the child." },
  },
];

const REFS = [
  {
    key: "references",
    pt: { slug: "referencias.html", nav: "Referências",
          title: "Referências | Montessori Reference",
          desc: "Bibliografia e fontes citadas — obras de Maria Montessori (fontes primárias) e estudos e comentadores (fontes secundárias)." },
    en: { slug: "references.html", nav: "References",
          title: "References | Montessori Reference",
          desc: "Bibliography and cited sources — works by Maria Montessori (primary sources) and studies and commentators (secondary sources)." },
  },
];

const ALL = [...PAGES, ...EXTRAS, ...REFS];

/* ---------- Estrutura da navegação (triângulo Montessori) ---------- */
const NAV = [
  { link: "home" },
  { link: "bio" },
  { link: "principles" },
  { group: "child", keys: ["planes", "second-plane", "normalization"] },
  { group: "adult", keys: ["teacher-transformation", "observation", "three-period-lesson"] },
  { group: "environment", keys: ["prepared-environment", "classroom-materials", "class-leadership", "elementary-curriculum"] },
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
    more: "Outros",
    groups: { child: "A Criança", adult: "O Adulto", environment: "O Ambiente" },
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
    more: "More",
    groups: { child: "The Child", adult: "The Adult", environment: "The Environment" },
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

const GLOBE = `<svg class="lang-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18"/></svg>`;

const FAVICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect width='48' height='48' rx='12' fill='%23c06844'/><rect x='12' y='26' width='6' height='10' rx='2' fill='%23fff'/><rect x='21' y='20' width='6' height='16' rx='2' fill='%23fff'/><rect x='30' y='14' width='6' height='22' rx='2' fill='%23fff'/></svg>";

const p = (lang, key) => ALL.find((x) => x.key === key)[lang];

/* ---------- Layout ---------- */
function render(lang, page) {
  const other = lang === "pt" ? "en" : "pt";
  const t = UI[lang];
  const self = page[lang];
  const body = read(`content/${lang}/${page.key}.html`);

  // Links do seletor de idioma (relativos entre pastas irmãs pt/ e en/)
  const selfHref = self.slug;
  const otherHref = `../${other}/${p(other, page.key).slug}`;

  const navHtml = NAV.map((it) => {
    if (it.link) {
      const item = p(lang, it.link);
      const active = it.link === page.key ? ' class="active"' : "";
      return `        <li><a href="${item.slug}"${active}>${item.nav}</a></li>`;
    }
    const groupActive = it.keys.includes(page.key);
    const subItems = it.keys.map((k) => {
      const item = p(lang, k);
      const active = k === page.key ? ' class="active"' : "";
      return `            <li><a href="${item.slug}"${active}>${item.nav}</a></li>`;
    }).join("\n");
    return `        <li class="nav-sub">
          <button type="button" class="nav-sub-btn${groupActive ? " active" : ""}" aria-expanded="false" aria-haspopup="true">${t.groups[it.group]}</button>
          <ul class="nav-sub-list">
${subItems}
          </ul>
        </li>`;
  }).join("\n");

  const footerTop = ["home", "bio", "principles", "references"]
    .map((k) => `          <a href="${p(lang, k).slug}">${p(lang, k).nav}</a>`).join("\n");
  const footerCols = NAV.filter((it) => it.group).map((it) => {
    const links = it.keys.map((k) => `          <a href="${p(lang, k).slug}">${p(lang, k).nav}</a>`).join("\n");
    return `        <div>
          <h4>${t.groups[it.group]}</h4>
${links}
        </div>`;
  }).join("\n");

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
${navHtml}
      </ul>

      <div class="lang-switch" role="group" aria-label="${t.langLabel}">
        ${GLOBE}
        <a href="${lang === "pt" ? selfHref : `../pt/${p("pt", page.key).slug}`}"${lang === "pt" ? ' class="active" aria-current="true"' : ""} lang="pt-BR" hreflang="pt-BR" title="Português">PT</a>
        <a href="${lang === "en" ? selfHref : `../en/${p("en", page.key).slug}`}"${lang === "en" ? ' class="active" aria-current="true"' : ""} lang="en" hreflang="en" title="English">EN</a>
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
${footerTop}
        </div>
${footerCols}
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
  for (const page of ALL) write(`${lang}/${page[lang].slug}`, render(lang, page));
}
write("index.html", renderRoot());
write("404.html", render404());
console.log("Concluído.");
