var projetos = data.projetos;
var atividades = data.atividades;
var selectedItem;
var selectedItem2;
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
  bdelete.addEventListener("click", onDelete);
  bsubmitActivity.style.display = "none";
  finalized.style.display = "none";
  labelNome.textContent = "Nome do Projeto";
  clearForm();
};
init();


function onSubmit(evt) {
  evt.preventDefault();
  clearTableActivities();
  clearTableProject();
  if (selectedItem) {
    updateProject(selectedItem);
  } else {
    projetos.push({
      "id": 1 + parseInt([projetos][0][[projetos][0].length -1].id),
      "nome": form.name.value,
      "dataInicio": form.initialData.value,
      "dataFim": form.finalData.value
  })
  }  
  renderData();
  clearForm();
}

function onDelete(){
  if (selectedItem && !selectedItem2) {
    const i = projetos.indexOf(selectedItem);
    projetos.splice(i, 1);
  }

  if (selectedItem2) {
    const i = atividades.indexOf(selectedItem2);
    atividades.splice(i, 1);
  }
    clearTableActivities();
    clearTableProject();
    renderData();
    renderDataActivities();
    clearSelection();
    clearSelectionActivity();
    clearForm();
}

function onSubmitActivity(evt) {
  //evt.preventDefault();
  clearTableActivities();
  clearTableProject();
  if (form.finalized.checked == false) {
    form.finalized.value = "Não"
  } else {
    form.finalized.value = "Sim"
  }
  if (selectedItem2) {
    updateActivity(selectedItem2);
  } else {
    atividades.push({
      "id": 1 + parseInt([atividades][0][[atividades][0].length -1].id),
      "idProjeto": parseInt(selectedItemId),
      "nome": form.name.value,
      "dataInicio": form.initialData.value,
      "dataFim": form.finalData.value,
      "finalizada": form.finalized.value
  })
  }  
  renderDataActivities();
  renderData();
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
    completo.textContent = calculaPorcentagem(projeto, atividades);
    const atrasado = document.createElement("td");
    atrasado.textContent = conferirAtraso(projeto, atividades);
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
  bsubmitActivity.textContent = "Cadastrar atividade";
  bsubmit.textContent = "Atualizar";
  labelNome.textContent = "Nome da Atividade";
  preencheTabela(projeto);
};

function selectItemActivity(atividade, tr) {
  clearSelectionActivity();
  selectedItem2 = atividade;
  tr.classList.add("selected"); 
  bsubmitActivity.style.display = "inline";
  bsubmitActivity.textContent = "Atualizar";
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
  clearForm();
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
  clearForm();
};

function clearTableActivities() {
  var table = document.querySelectorAll(".new-table");
  table.remove()
  qtaAtividades = 0;
  atividadesFinalizadas = 0;
}

function clearTableProject() {
  var table1 = document.querySelectorAll(".new-table1");
  table1.remove();
}

function clearForm() {
  form.name.value = "";
  form.initialData.value = "";
  form.finalData.value = "";
  bsubmitActivity.style.display = "none";
  bsubmit.style.display = "inline";
  bsubmit.textContent = "Cadastrar projeto";
  labelNome.textContent = "Nome do Projeto";
  finalized.style.display = "none";
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
        finalizada.textContent = atividade.finalizada;
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

function calculaPorcentagem(projeto, atividades) {
  var qtaAtividades = 0;
  var atividadesFinalizadas = 0;
  for (item of atividades) {
    if (item.idProjeto == projeto.id) {
      qtaAtividades++;
      if (item.finalizada == "Sim") {
        atividadesFinalizadas++;
      }
    }
  }
  var porcentagem = (atividadesFinalizadas/qtaAtividades)*100;
  if (!porcentagem) {
    return("-");
  } else {
    return(`${porcentagem.toFixed(0)}%`);
  }   
}

function conferirAtraso(projeto, atividades) {
  if (calculaPorcentagem(projeto, atividades) != "100%") {
    var dataFinalProjeto = projeto.dataFim;
    dataFinalProjeto = dataFinalProjeto.replace(/-/g, "");
    for (item of atividades) {
      if (item.idProjeto == projeto.id && item.finalizada == "Não") {
        var dataFinalItem = item.dataFim;
        dataFinalItem = dataFinalItem.replace(/-/g, "");        
        if (parseInt(dataFinalItem) > parseInt(dataFinalProjeto)) {
          return("Sim")
        }
      } 
    }
  }
  return ("Não")
}

function updateProject(selectedItem) {
  for (projeto of projetos) {
    if (projeto.id == selectedItem.id) {
      selectedItem.nome = form.name.value;
      selectedItem.dataInicio = form.initialData.value;
      selectedItem.dataFim = form.finalData.value;
    }
  }
}

function updateActivity(selectedItem2) {
  for (atividade of atividades) {
    if (atividade.nome == selectedItem2.nome) {
      selectedItem2.nome = form.name.value;
      selectedItem2.dataInicio = form.initialData.value;
      selectedItem2.dataFim = form.finalData.value;
      selectedItem2.finalizada = form.finalized.value;
    } 
  }
}
