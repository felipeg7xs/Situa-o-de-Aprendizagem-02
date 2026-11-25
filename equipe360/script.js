/*
  Descrição: Scripts da interface - validação do login, proteção das páginas, dados do perfil e filtro da tabela.
  Nome do arquivo: script.js
  Nome do exercício: Situação de Aprendizagem - Interface Web do Sistema (Login, Perfil e Consulta)
  Nome do aluno: Felipe Gabriel de Oliveira
  E-mail: felipe.oliveira139@aluno.cps.sp.gov.br
  Turma: WEBI-ISWO28-A
*/

// Usuário de demonstração (simulação, sem servidor)
const USUARIO_DEMO = {
  email: "mariana.costa@equipe360.com",
  senha: "123456",
  nome: "Mariana Costa",
  cargo: "Analista de Recursos Humanos",
  departamento: "Gestão de Pessoas",
  telefone: "(11) 91234-5678",
  admissao: "10/03/2022"
};

// ---------- LOGIN ----------
const formLogin = document.getElementById("form-login");
if (formLogin) {
  formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("erro-login");

    if (!formLogin.checkValidity()) {
      formLogin.classList.add("was-validated");
      return;
    }
    if (email === USUARIO_DEMO.email && senha === USUARIO_DEMO.senha) {
      sessionStorage.setItem("usuarioLogado", JSON.stringify(USUARIO_DEMO));
      window.location.href = "perfil.html";
    } else {
      erro.classList.remove("d-none");
    }
  });
}

// ---------- PROTEÇÃO DAS PÁGINAS INTERNAS ----------
const paginaInterna = document.body.dataset.interna === "true";
if (paginaInterna && !sessionStorage.getItem("usuarioLogado")) {
  window.location.href = "index.html";
}

// ---------- SAIR ----------
const botaoSair = document.getElementById("btn-sair");
if (botaoSair) {
  botaoSair.addEventListener("click", function () {
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
  });
}

// ---------- PERFIL ----------
const dadosPerfil = document.querySelectorAll("[data-perfil]");
if (dadosPerfil.length > 0) {
  const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado") || "{}");
  dadosPerfil.forEach(function (campo) {
    campo.textContent = usuario[campo.dataset.perfil] || "-";
  });
}

// ---------- CONSULTA (filtro visual) ----------
const campoBusca = document.getElementById("busca");
if (campoBusca) {
  const linhas = document.querySelectorAll("#tabela-colaboradores tbody tr");
  const aviso = document.getElementById("sem-resultado");
  const contador = document.getElementById("contador");

  function filtrar() {
    const termo = campoBusca.value.trim().toLowerCase();
    let visiveis = 0;
    linhas.forEach(function (linha) {
      const combina = linha.textContent.toLowerCase().includes(termo);
      linha.classList.toggle("d-none", !combina);
      if (combina) visiveis++;
    });
    aviso.classList.toggle("d-none", visiveis > 0);
    contador.textContent = visiveis + " de " + linhas.length + " colaboradores";
  }

  campoBusca.addEventListener("input", filtrar);
  filtrar();
}
