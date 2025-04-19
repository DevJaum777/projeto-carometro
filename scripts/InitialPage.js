function abrirCadastro() {
    document.getElementById("modalCadastro").style.display = "flex";
  }

  function fecharCadastro() {
    document.getElementById("modalCadastro").style.display = "none";
  }

  function irParaTurma(turma) {
    window.location.href = "turma.html";
  }

  function simularCadastro() {
    const turma = document.getElementById("turmaAluno").value;
    alert("Aluno cadastrado com sucesso na turma " + turma + "!");
    fecharCadastro();
    irParaTurma(turma);
  }

  function sair() {
    window.location.href = "loginPage.html";
  }