const API_URL = "http://localhost:5000/fruta";

// Função para obter uma fruta aleatória
function frutaAleatoria() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            document.getElementById("FrutaAleatoria").innerText = "Fruta: " + data.fruta;
        })
        .catch(error => console.error("Erro ao buscar fruta aleatória:", error));
}

// Função para buscar fruta por ID
function frutaPeloId() {
    let id = document.getElementById("frutaId").value;
    if (!id) {
        alert("Por favor, digite um ID válido!");
        return;
    }

    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("FrutaPorId").innerText = "Fruta: " + data.fruta;
        })
        .catch(error => console.error("Erro ao buscar fruta por ID:", error));
}

// Função para adicionar uma nova fruta
function adicionarFruta() {
    let frutaNome = document.getElementById("novaFruta").value.trim();
    if (!frutaNome) {
        alert("Por favor, digite o nome da fruta!");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fruta: frutaNome })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("resposta").innerText = "Sucesso: " + data.info;
    })
    .catch(error => console.error("Erro ao adicionar fruta:", error));
}

// Função para atualizar o nome de uma fruta
function atualizarFruta() {
    let id = document.getElementById("idFrutaAtualizar").value;
    let novoNome = document.getElementById("novoNomeFruta").value.trim();
    
    if (!id || !novoNome) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fruta: novoNome })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("respostaAtualizar").innerText = "Sucesso: " + data.info;
    })
    .catch(error => console.error("Erro ao atualizar fruta:", error));
}

// Função para remover uma fruta por ID
function removerFruta() {
    let id = document.getElementById("idFrutaRemover").value;
    if (!id) {
        alert("Por favor, digite um ID válido!");
        return;
    }

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            document.getElementById("respostaRemover").innerText = "Sucesso: " + data.info;
        })
        .catch(error => console.error("Erro ao remover fruta:", error));
}
