document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario === "admin" && senha === "admin") {
        window.location.href = "InitialPage.html"; // redireciona
    } else {
        alert("Usuário ou senha incorretos.");
    }
});