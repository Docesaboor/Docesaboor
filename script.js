// =========================================================
// DOCE SABOR - CARDÁPIO DIGITAL
// script.js
// =========================================================


// =========================================================
// MENU MOBILE
// =========================================================

const menuMobile = document.getElementById("menuMobile");
const menu = document.getElementById("menu");

if (menuMobile && menu) {
  menuMobile.addEventListener("click", () => {
    menu.classList.toggle("ativo");

    const menuAberto = menu.classList.contains("ativo");

    menuMobile.setAttribute(
      "aria-label",
      menuAberto ? "Fechar menu" : "Abrir menu"
    );

    menuMobile.textContent = menuAberto ? "✕" : "☰";
  });
}


// =========================================================
// FECHAR MENU AO CLICAR EM UM LINK
// =========================================================

const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    if (menu) {
      menu.classList.remove("ativo");
    }

    if (menuMobile) {
      menuMobile.textContent = "☰";
      menuMobile.setAttribute("aria-label", "Abrir menu");
    }
  });
});


// =========================================================
// FECHAR MENU AO CLICAR FORA
// =========================================================

document.addEventListener("click", (event) => {
  if (!menu || !menuMobile) return;

  const clicouNoMenu = menu.contains(event.target);
  const clicouNoBotao = menuMobile.contains(event.target);

  if (!clicouNoMenu && !clicouNoBotao) {
    menu.classList.remove("ativo");

    menuMobile.textContent = "☰";
    menuMobile.setAttribute("aria-label", "Abrir menu");
  }
});


// =========================================================
// FECHAR MENU AO REDIMENSIONAR PARA DESKTOP
// =========================================================

window.addEventListener("resize", () => {
  if (window.innerWidth > 850 && menu) {
    menu.classList.remove("ativo");

    if (menuMobile) {
      menuMobile.textContent = "☰";
      menuMobile.setAttribute("aria-label", "Abrir menu");
    }
  }
});


// =========================================================
// SCROLL SUAVE PARA LINKS INTERNOS
// =========================================================

const linksInternos = document.querySelectorAll('a[href^="#"]');

linksInternos.forEach((link) => {
  link.addEventListener("click", function (event) {
    const destinoId = this.getAttribute("href");

    if (!destinoId || destinoId === "#") return;

    const destino = document.querySelector(destinoId);

    if (!destino) return;

    event.preventDefault();

    const alturaHeader =
      document.querySelector(".header")?.offsetHeight || 0;

    const posicao =
      destino.getBoundingClientRect().top +
      window.scrollY -
      alturaHeader -
      12;

    window.scrollTo({
      top: posicao,
      behavior: "smooth",
    });
  });
});


// =========================================================
// DESTACAR ITEM ATIVO DO MENU
// =========================================================

const secoes = document.querySelectorAll("main section[id]");

function atualizarMenuAtivo() {
  const posicaoScroll = window.scrollY + 140;

  secoes.forEach((secao) => {
    const topo = secao.offsetTop;
    const altura = secao.offsetHeight;
    const id = secao.getAttribute("id");

    const linkCorrespondente = document.querySelector(
      `.menu a[href="#${id}"]`
    );

    if (!linkCorrespondente) return;

    if (
      posicaoScroll >= topo &&
      posicaoScroll < topo + altura
    ) {
      linksMenu.forEach((link) => {
        link.classList.remove("ativo-scroll");
      });

      linkCorrespondente.classList.add("ativo-scroll");
    }
  });
}

window.addEventListener("scroll", atualizarMenuAtivo);
window.addEventListener("load", atualizarMenuAtivo);


// =========================================================
// ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
// =========================================================

const elementosAnimados = document.querySelectorAll(
  ".card, .produto, .info-card, .titulo-secao, .hero-conteudo, .hero-imagem"
);

elementosAnimados.forEach((elemento) => {
  elemento.classList.add("animar-entrada");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visivel");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

elementosAnimados.forEach((elemento) => {
  observer.observe(elemento);
});


// =========================================================
// BOTÕES DO WHATSAPP
// =========================================================

const botoesWhatsApp = document.querySelectorAll(
  'a[href*="wa.me"]'
);

botoesWhatsApp.forEach((botao) => {
  botao.addEventListener("click", () => {
    console.log("Usuário clicou no botão do WhatsApp");
  });
});


// =========================================================
// VOLTAR AO TOPO
// =========================================================

const botaoTopo = document.createElement("button");

botaoTopo.className = "botao-topo";
botaoTopo.setAttribute("aria-label", "Voltar ao topo");
botaoTopo.innerHTML = "↑";

document.body.appendChild(botaoTopo);

window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    botaoTopo.classList.add("mostrar");
  } else {
    botaoTopo.classList.remove("mostrar");
  }
});

botaoTopo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


// =========================================================
// ANO AUTOMÁTICO NO RODAPÉ
// =========================================================

const copyright = document.querySelector(".copyright");

if (copyright) {
  const anoAtual = new Date().getFullYear();

  copyright.innerHTML = `
    © ${anoAtual} Doce Sabor — Mais que doces,
    momentos especiais ♥
  `;
}


// =========================================================
// CARREGAMENTO DA PÁGINA
// =========================================================

window.addEventListener("load", () => {
  document.body.classList.add("pagina-carregada");
});
