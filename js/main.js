var projetos = data.projetos;
var atividades = data.atividades;

var itemSelecionado;
var itemSelecionadoAtividade;

const tabelaProjetos = document.getElementById("p-table");
const tabelaAtividades = document.getElementById("a-table");

const form = document.querySelector("form");
const bdelete = document.getElementById("b-delete");
const bcancel = document.getElementById("b-cancel");
const bsubmit = document.getElementById("b-submit");
const bsubmitActivity = document.getElementById("b-submit-a");
const finalized = document.getElementById("finalized");
const labelNome = document.getElementById("name");


init();

//Função para iniciar a página com projetos cadastrados e listener de eventos nos botões
function init() {
  clearForm();
  renderData();
  form.addEventListener("submit", onSubmitProject);
  bcancel.addEventListener("click", clearSelection);  
  bdelete.addEventListener("click", onDelete);
  bsubmitActivity.addEventListener("click", onSubmitActivity);
};

//Ao clicar, coleta dados do formulário para tabela de projetos, cadastrar ou atualizar
function onSubmitProject(evt) {
  evt.preventDefault();
  clearTableActivities();
  clearTableProject();
  if (itemSelecionado) {
    updateProject(itemSelecionado);
  } else {
      projetos.push({
        "id": 1 + parseInt(projetos[projetos.length -1].id),
        "nome": form.name.value,
        "dataInicio": form.initialData.value,
        "dataFim": form.finalData.value
      });
    };
  renderData();
  clearForm();
};

//Ao clicar, remove a seleção dos itens e reseta o formulário
function clearSelection() {
  itemSelecionado = undefined;
  const tr = tabelaProjetos.querySelector(".selected");
  if (tr) {
    tr.classList.remove("selected");
  }
  clearTableActivities();
  clearSelectionActivity();
  clearForm();
};

//Ao clicar, deleta o item selecionado (projeto ou atividade)
function onDelete() {
  if (itemSelecionado && !itemSelecionadoAtividade) {
    projetos.splice(projetos.indexOf(itemSelecionado), 1);
  }
  if (itemSelecionadoAtividade) {
    atividades.splice(atividades.indexOf(itemSelecionadoAtividade), 1);
  }
    clearTableActivities();
    clearTableProject();
    renderData();
    renderDataActivities();
    clearSelection();
    clearSelectionActivity();
    clearForm();
}

//Com projeto selecionado, cadastra uma atividade a um projeto 
//Com um projeto e uma atividade selecionada, atualiza a atividade
function onSubmitActivity(evt) {
  clearTableActivities();
  clearTableProject();

  if (form.finalized.checked == false) {
    form.finalized.value = "Não"
  } else {
    form.finalized.value = "Sim"
  }

  if (itemSelecionadoAtividade) {
    updateActivity(itemSelecionadoAtividade);
  } else {
    atividades.push({
      "id": 1 + parseInt(atividades[atividades.length -1].id),
      "idProjeto": parseInt(itemSelecionadoId),
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

//Quando um projeto está selecionado, ao clicar, seus dados são atualizados
function updateProject(itemSelecionado) {
  for (projeto of projetos) {
    if (projeto.id == itemSelecionado.id) {
      itemSelecionado.nome = form.name.value;
      itemSelecionado.dataInicio = form.initialData.value;
      itemSelecionado.dataFim = form.finalData.value;
    }
  }
}

//Quando uma atividade está selecionada, ao clicar, seus dados são atualizados
function updateActivity(itemSelecionadoAtividade) {
  for (atividade of atividades) {
    if (atividade.id == itemSelecionadoAtividade.id) {
      itemSelecionadoAtividade.nome = form.name.value;
      itemSelecionadoAtividade.dataInicio = form.initialData.value;
      itemSelecionadoAtividade.dataFim = form.finalData.value;
      itemSelecionadoAtividade.finalizada = form.finalized.value;
    } 
  }
}

//Reseta o formulário para a versão inicial
function clearForm() {
  form.name.value = "";
  form.initialData.value = "";
  form.finalData.value = "";
  form.finalized.checked = false;
  bsubmitActivity.style.display = "none";
  bsubmit.style.display = "inline";
  bsubmit.textContent = "Cadastrar projeto";
  labelNome.textContent = "Nome do Projeto";
  finalized.style.display = "none";
}

//Atualiza o formulário com dados do item
function updateForm(elemento) {
  form.name.value = elemento.nome;
  form.initialData.value = elemento.dataInicio
  form.finalData.value = elemento.dataFim;
  if (elemento.finalizada == "Sim") {
    form.finalized.checked = true;
  }
}

//Auxilia na criação de uma tabela
function createTd(j, valor, tr) {
  var j = document.createElement("td");
  j.textContent = valor;
  return tr.appendChild(j);
}

//Insere valores na tabela de projetos (tr e td) e insere o listener de evento
function renderData() {
  for (const projeto of projetos) {
    const tr = document.createElement("tr");
    var tdId = createTd(tdId, projeto.id, tr);
    var tdNome = createTd(tdNome, projeto.nome, tr);
    var tdDateI = createTd(tdDateI, projeto.dataInicio, tr);
    var tdDateF = createTd(tdDateF, projeto.dataFim, tr);
    const completo = document.createElement("td");
    completo.textContent = calculaPorcentagem(projeto, atividades);
    tr.appendChild(completo);
    const atrasado = document.createElement("td");
    atrasado.textContent = conferirAtraso(projeto, atividades);
    tr.appendChild(atrasado);
    tr.classList.add("new-table1");
    tabelaProjetos.appendChild(tr);
    tr.addEventListener("click", () => selectItem(projeto, tr));
    }
};

//Insere valores na tabela de atividades (tr e td) para projeto selecionado e insere o listener de evento
function renderDataActivities() {
  for (const atividade of atividades) {  
    if (atividade.idProjeto == itemSelecionadoId){
      const trA = document.createElement("tr");
      const tdProjeto = document.createElement("td");
      tdProjeto.textContent = itemSelecionadoNome;
      trA.appendChild(tdProjeto);
      var tdNomeA = createTd(tdNomeA, atividade.nome, trA);
      var tdDateInitA = createTd(tdDateInitA, atividade.dataInicio, trA);
      var tdDateFinalA = createTd(tdDateFinalA, atividade.dataFim, trA);
      var finalizada = createTd(finalizada, atividade.finalizada, trA)
      trA.classList.add("new-table");
      tabelaAtividades.appendChild(trA);
      trA.addEventListener("click", () => selectItemActivity(atividade, trA));
      }
    }   
  
};

//Altera a propriedade do item projeto selecionado, apresenta suas atividades e atualiza form
function selectItem(projeto, tr) {
  clearSelection();
  itemSelecionado = projeto;
  itemSelecionadoId = projeto.id;
  itemSelecionadoNome = projeto.nome;
  tr.classList.add("selected");
  renderDataActivities(); 
  bsubmitActivity.style.display = "inline";
  bsubmitActivity.textContent = "Cadastrar atividade";
  bsubmit.textContent = "Atualizar";
  labelNome.textContent = "Nome da Atividade";
  updateForm(projeto);
};

//Altera a propriedade do item atividade selecionado e atualiza form
function selectItemActivity(atividade, tr) {
  clearSelectionActivity();
  itemSelecionadoAtividade = atividade;
  tr.classList.add("selected"); 
  bsubmitActivity.style.display = "inline";
  bsubmitActivity.textContent = "Atualizar";
  bsubmit.style.display = "none";
  finalized.style.display = "inline";
  labelNome.textContent = "Nome da Atividade";
  updateForm(atividade);
};

//Remove a seleção do item 
function clearSelectionActivity() {
  itemSelecionadoAtividade = undefined;
  const tra = tabelaAtividades.querySelector(".selected");
  if (tra) {
    tra.classList.remove("selected");
  }
  clearForm();
};

//Remove a tabela de atividades desatualizada
function clearTableActivities() {
  var table = document.querySelectorAll(".new-table");
  table.remove()
}

//Remove a tabela de projetos desatualizada
function clearTableProject() {
  var table1 = document.querySelectorAll(".new-table1");
  table1.remove();
}

//Método para remover o elemento pelo seu ID
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

//Calcula a porcentagem realizada do projeto
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

//Verifica se há atraso no projeto
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
};

