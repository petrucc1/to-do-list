// Declarando constantes
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const toDoList = document.querySelector(".toDoList");
const deleteAllBtn  = document.querySelector(".pseudoFooter button");

inputBox.onkeyup = ()=>{
    let userEnteredValue = inputBox.value; // Obtendo valor inserido pelo usuário
    if (userEnteredValue.trim() != 0) { // Se os valores não forem apenas espaços
        addBtn.classList.add("active"); // Ativa o botão "adicionar"
    } else {
        addBtn.classList.remove("active"); // Desativa o botão "adicionar"
    }
}

    showTasks(); // Chamando função showTasks

// Se o usuário clicar em "adicionar"
addBtn.onclick = ()=>{
    let userEnteredValue = inputBox.value; // Obtendo valor inserido pelo usuário
    let getLocalStorageData = localStorage.getItem("Nova tarefa"); // Obtendo armazenamento local
    let listArray = []; // Criando "array" vazia
    if (getLocalStorageData == null) { // Se o armazenamento local for "null"
    } else {
        listArray = JSON.parse(getLocalStorageData); // Trocando uma "string" JSON para um objeto JS
    } 
    listArray.push(userEnteredValue); // Adicionando dados do usuário
    localStorage.setItem("Nova tarefa", JSON.stringify(listArray)); // Trocando um objeto JS para uma "string" JSON
    showTasks(); // Chamando função showTasks
    addBtn.classList.remove("active"); // Desativa o botão adicionar assim que uma tarefa for adicionada
}

// Função para adicionar lista de tarefas dentro da tag "ul"
function showTasks(){
    let getLocalStorageData = localStorage.getItem("Nova tarefa"); // Obtendo localStorage (armazenamento local)
    let listArray = []; // Criando "array" vazia
    if (getLocalStorageData == null) { // Se localStorage for "null"
    } else {
        listArray = JSON.parse(getLocalStorageData); // Trocando uma "string" JSON para um objeto JS
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArray.length; // Mostrando quantidade de tarefas pendentes
    if (listArray.length > 0) { // Se tamanho do "array" for maior do que 0
        deleteAllBtn.classList.add("active"); // Ativa o botão "limpar tudo"
    } else {
        deleteAllBtn.classList.remove("active"); // Desativa o botão "limpar tudo"
    }
    let newLiTag = "";
    listArray.forEach((element, index) =>{
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span>`
        toDoList.innerHTML = newLiTag; // Adicionando nova linha dentro da lista
    inputBox.value = ""; // Quando uma tarefa for adicionada, o campo de entrada ficará em branco
    });
    
}

// Função para deletar tarefas
function deleteTask(index){
    let getLocalStorageData = localStorage.getItem("Nova tarefa");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); // Deletar uma linha específica
    // Atualizando armazenamento local depois de remover uma linha da lista
    localStorage.setItem("Nova tarefa", JSON.stringify(listArray)); // Trocando um objeto JS para uma "string" JSON
    showTasks(); // Chamando função showTasks
}

// Função para deletar todas as tarefas
deleteAllBtn.onclick = ()=>{
    listArray = []; // Deixa "array" vazia
    // Atualizando armazenamento local depois de deletar todas as tarefas
    localStorage.setItem("New Todo", JSON.stringify(listArray)); // Trocando um objeto JS para uma "string" JSON
    showTasks(); // Chamando função showTasks
}