const grid = document.querySelector(".grid");

let fila = [];

/* CRIA OS 36 ALUNOS */
const alunos = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  nome: `Aluno ${i + 1}`,
  foto: i === 0 ? "assets/alunos/aluno1.jpg" : null, // só o aluno 1 tem foto
  agua: 0,
  banheiro: 0,
  ausente: false
}));

function render() {
  grid.innerHTML = "";

  alunos.forEach(aluno => {
    const posicaoFila = fila.indexOf(aluno.id) + 1;

    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";

    const card = document.createElement("div");
    card.className = "student-card";
    if (aluno.ausente) card.classList.add("absente");

    card.innerHTML = `
      ${posicaoFila > 0 
        ? `<div class="queue-badge ${posicaoFila === 1 ? "first" : ""}">
            ${posicaoFila}
          </div>` 
        : ""
      }

      <div class="photo">
        ${
          aluno.foto
            ? `<img src="${aluno.foto}" alt="${aluno.nome}">`
            : `<span>👤</span>`
        }
      </div>

      <div class="name">${aluno.nome}</div>

      <div class="markers">
        <span>🚰 ${aluno.agua}</span>
        <span>🚽 ${aluno.banheiro}</span>
      </div>

      <div class="controls">
        <button onclick="entrarFila(${aluno.id}, 'agua')">Água</button>
        <button onclick="entrarFila(${aluno.id}, 'banheiro')">Banheiro</button>
      </div>
    `;

    const presence = document.createElement("div");
    presence.className = "presence";
    presence.innerHTML = `
      <button onclick="toggleAusente(${aluno.id})">
        ${aluno.ausente ? "Marcar presente" : "Marcar ausente"}
      </button>
    `;

    wrapper.appendChild(card);
    wrapper.appendChild(presence);
    grid.appendChild(wrapper);
  });
}

function entrarFila(id, tipo) {
  if (fila.includes(id)) return; // impede entrar duas vezes

  fila.push(id);

  if (tipo === "agua") alunos[id].agua++;
  if (tipo === "banheiro") alunos[id].banheiro++;

  render();
}

function proximoDaFila() {
  fila.shift();
  render();
}

function toggleAusente(id) {
  alunos[id].ausente = !alunos[id].ausente;
  render();
}

function enviarFrequencia() {
  const faltantes = alunos
    .filter(a => a.ausente)
    .map(a => a.nome)
    .join("\n");

  localStorage.setItem("frequencia_faltantes", faltantes);
  alert("Frequência salva no localStorage.");
}

function resetMarcacoes() {
  fila = [];
  alunos.forEach(a => {
    a.agua = 0;
    a.banheiro = 0;
  });
  render();
}

render();
