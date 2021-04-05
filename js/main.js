var projetos = data.projetos;
var atividades = data.atividades;
const listProject = document.getElementById("p-table");
const listActivities = document.getElementById("a-table");
const bdelete = document.getElementById("b-delete");
const bcancel = document.getElementById("b-cancel");
const bsubmit = document.getElementById("b-submit");
const form = document.querySelector("form");
const bsubmitActivity = document.getElementById("b-submit-a");
const finalized = document.getElementById("finalized");
const labelNome = document.getElementById("name");


function init() {
  renderData();
  bcancel.addEventListener("click", clearSelection);
  form.addEventListener("submit", onSubmit);
  bsubmitActivity.addEventListener("click", onSubmitActivity);
  //bdelete.addEventListener("click", onDelete);
  bsubmitActivity.style.display = "none";
  finalized.style.display = "none";
  labelNome.textContent = "Nome do Projeto";
};


function onSubmit(evt) {
  evt.preventDefault();
  clearTableActivities();
  clearTableProject();
  projetos.push({
      "id": 1 + parseInt([projetos][0][[projetos][0].length -1].id),
      "nome": form.name.value,
      "dataInicio": form.initialData.value,
      "dataFim": form.finalData.value
  })
  renderData();
  clearForm();
}

function onSubmitActivity(evt) {
  //evt.preventDefault();
  clearTableActivities();
  atividades.push({
    "id": 1 + parseInt([atividades][0][[atividades][0].length -1].id),
    "idProjeto": parseInt(selectedItemId),
    "nome": form.name.value,
    "dataInicio": form.initialData.value,
    "dataFim": form.finalData.value
})
  renderDataActivities();
  clearForm();
}


//Criar tabela de projetos
function renderData() {
  for (const projeto of projetos) {
    //let role = roles.find((role) => role.id == employee.role_id);
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    tdId.textContent = projeto.id;
    const tdName = document.createElement("td");
    tdName.textContent = projeto.nome;
    const tdDateI = document.createElement("td");
    tdDateI.textContent = projeto.dataInicio;
    const tdDateF = document.createElement("td");
    tdDateF.textContent = projeto.dataFim;
    const completo = document.createElement("td");
    completo.textContent = "100%";
    const atrasado = document.createElement("td");
    atrasado.textContent = "Sim";
    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdDateI);
    tr.appendChild(tdDateF);
    tr.appendChild(completo);
    tr.appendChild(atrasado);
    tr.classList.add("new-table1");
    listProject.appendChild(tr);
    tr.addEventListener("click", () => selectItem(projeto, tr));
  }
};

//alterar a propriedade do item selecionado e apresentar suas atividades
function selectItem(projeto, tr) {
  clearSelection();
  selectedItem = projeto;
  selectedItemId = projeto.id;
  selectedItemNome = projeto.nome;
  tr.classList.add("selected");
  renderDataActivities(); 
  bsubmitActivity.style.display = "inline";
  bsubmit.style.display = "none";
  labelNome.textContent = "Nome da Atividade";
};

function selectItemActivity(atividade, tr) {
  clearSelectionActivity();
  selectedItem2 = atividade;
  tr.classList.add("selected"); 
  bsubmitActivity.style.display = "inline";
  bsubmit.style.display = "none";
  finalized.style.display = "inline";
  labelNome.textContent = "Nome da Atividade";
  preencheTabela(atividade);
};

//remover seleção
function clearSelection() {
  selectedItem = undefined;
  const tr = listProject.querySelector(".selected");
  if (tr) {
    tr.classList.remove("selected");
  }
  clearTableActivities();
  bsubmitActivity.style.display = "none";
  bsubmit.style.display = "inline";
  labelNome.textContent = "Nome do Projeto";
  finalized.style.display = "none";
  limpaTabela()
};

function clearSelectionActivity() {
  selectedItem2 = undefined;
  const tr = listActivities.querySelector(".selected");
  if (tr) {
    tr.classList.remove("selected");
  }
  bsubmitActivity.style.display = "none";
  bsubmit.style.display = "inline";
  labelNome.textContent = "Nome do Projeto";
  finalized.style.display = "none";
  limpaTabela()
};

function clearTableActivities() {
  var table = document.querySelectorAll(".new-table");
  table.remove()
}

function clearTableProject() {
  var table1 = document.querySelectorAll(".new-table1");
  table1.remove();
}

function clearForm() {
  form.name.value = "";
  form.initialData.value = "";
  form.finalData.value = "";
}

//criar tabela de atividades para cada projeto
function renderDataActivities() {
  for (const atividade of atividades) {  
    if (atividade.idProjeto == selectedItemId){
      const trA = document.createElement("tr");
      const tdIdA = document.createElement("td");
      tdIdA.textContent = selectedItemNome;
      const tdNameA = document.createElement("td");
      tdNameA.textContent = atividade.nome;
      const tdDateInitA = document.createElement("td");
      tdDateInitA.textContent = atividade.dataInicio;
      const tdDateFinalA = document.createElement("td");
      tdDateFinalA.textContent = atividade.dataFim;
      const finalizada = document.createElement("td");
      finalizada.textContent = "Não";
      trA.appendChild(tdIdA);
      trA.appendChild(tdNameA);
      trA.appendChild(tdDateInitA);
      trA.appendChild(tdDateFinalA);
      trA.appendChild(finalizada);
      trA.classList.add("new-table");
      listActivities.appendChild(trA);
      trA.addEventListener("click", () => selectItemActivity(atividade, trA));
    } 
  }
};

//criando um método para remover o elemento pelo seu ID
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
      if(this[i] && this[i].parentElement) {
          this[i].parentElement.removeChild(this[i]);
      }
  }
}

function preencheTabela(elemento) {
  form.name.value = elemento.nome;
  form.initialData.value = elemento.dataInicio
  form.finalData.value = elemento.dataFim;
}

function limpaTabela() {
  form.name.value = "";
  form.initialData.value = "";
  form.finalData.value = "";
}

init();