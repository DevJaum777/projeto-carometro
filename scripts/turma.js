function voltar() {
    window.location.href = "InitialPage.html";
  }

  let graficoAtual = null;

  function mostrarDetalhes(nome, notas) {
    const media = notas.reduce((acc, val) => acc + val, 0);

    let desempenhoTexto = "";
    let cor = "";

    if (media >= 8) {
      desempenhoTexto = "😄 Muito Bom";
      cor = "green";
    } else if (media >= 5) {
      desempenhoTexto = "😐 Dá pra melhorar";
      cor = "goldenrod";
    } else {
      desempenhoTexto = "😡 Péssimo";
      cor = "crimson";
    }

    document.getElementById('alunoNome').textContent = nome;
    document.getElementById('alunoTurma').textContent = "Turma: 3º Ano B";
    const desempenhoEl = document.getElementById('desempenhoInfo');
    desempenhoEl.textContent = "Desempenho: " + desempenhoTexto;
    desempenhoEl.style.color = cor;

    document.getElementById('modal').style.display = 'flex';

    const ctx = document.getElementById("graficoEscolar").getContext("2d");

    if (graficoAtual) graficoAtual.destroy();

    graficoAtual = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Assiduidade', 'Participação', 'Frequência', 'Responsabilidade'],
        datasets: [{
          label: 'Nota',
          data: notas,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 2.5
          }
        }
      }
    });
  }

  function fecharModal() {
    document.getElementById("modal").style.display = "none";
  }

  const alunos = Array.from(document.querySelectorAll('.aluno'));
  const grid = document.getElementById('gridAlunos');
  const busca = document.getElementById('busca');
  const ordenar = document.getElementById('ordenar');

  function atualizarGrid() {
    const termo = busca.value.toLowerCase();
    const ordem = ordenar.value;

    let filtrados = alunos.filter(aluno =>
      aluno.textContent.trim().toLowerCase().startsWith(termo)
    );

    filtrados.sort((a, b) => {
      if (ordem === 'az' || ordem === 'za') {
        const nomeA = a.textContent.trim().toLowerCase();
        const nomeB = b.textContent.trim().toLowerCase();
        return ordem === 'az' ? nomeA.localeCompare(nomeB) : nomeB.localeCompare(nomeA);
      } else if (ordem === 'situacao') {
        const getScore = el => {
          const notas = JSON.parse(el.getAttribute('data-notas'));
          return notas.reduce((a, b) => a + b, 0);
        };
        return getScore(b) - getScore(a);
      }
    });

    grid.innerHTML = '';
    filtrados.forEach(el => grid.appendChild(el));
  }

  busca.addEventListener('input', atualizarGrid);
  ordenar.addEventListener('change', atualizarGrid);
  window.addEventListener('DOMContentLoaded', atualizarGrid);