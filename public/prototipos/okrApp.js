class OKRApp {
  constructor() {
    this.metas = [];
    this.equipes = [];
    this.membros = [];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateMetaPaiOptions();
    this.showSection('dashboard');
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.collapsible').collapsible();
  }

  setupEventListeners() {
    // Navegação pelo menu
    $(document).on('click', '.menu-link', (e) => {
      e.preventDefault();
      const target = $(e.currentTarget).data('target');
      this.showSection(target);
    });

    // Eventos de formulários
    $("#metaForm").submit((e) => {
      e.preventDefault();
      this.adicionarMeta();
    });

    $("#equipeForm").submit((e) => {
      e.preventDefault();
      this.adicionarEquipe();
    });

    $("#prioridade").on("change", () => {
      this.updatePrioridadeUI();
    });

    $("#metaPai").on("change", () => {
      this.toggleCamposMeta();
    });
  }

  showSection(sectionId) {
    $('.section').removeClass('active').hide();
    $('#' + sectionId).addClass('active').show();
  }

  updatePrioridadeUI() {
    // Não é mais necessário atualizar visualmente o valor, pois usamos um select
  }

  updateMetaPaiOptions() {
    const metaPaiSelect = $("#metaPai");
    metaPaiSelect.empty();
    metaPaiSelect.append('<option value="" selected>Nenhuma</option>');

    // Popula o select com metas que não são filhas
    this.metas.forEach((meta) => {
      if (!meta.metaPai) {
        metaPaiSelect.append(`<option value="${meta.id}">${meta.nome}</option>`);
      }
    });

    $('select').formSelect();
  }

  toggleCamposMeta() {
    const metaPaiId = $("#metaPai").val();
    if (metaPaiId) {
      // Se houver meta pai, esconder campos
      $("#campoRealizado").hide();
      $("#campoMetaPlanejada").hide();
      $("#realizado").val('');
      $("#meta").val('');
    } else {
      // Se não houver meta pai, mostrar campos
      $("#campoRealizado").show();
      $("#campoMetaPlanejada").show();
    }
  }

  adicionarMeta() {
    const nomeMeta = $("#nome_meta").val();
    const prioridade = parseInt($("#prioridade").val());
    const penalidade = $("#penalidade").prop('checked');
    const metaPaiId = $("#metaPai").val();

    let realizado = 0;
    let metaPlanejada = 0;

    if (!metaPaiId) {
      // Se não tiver meta pai, pega os valores de realizado e meta
      realizado = parseFloat($("#realizado").val());
      metaPlanejada = parseFloat($("#meta").val());

      if (!this.validateInput(nomeMeta, realizado, metaPlanejada, prioridade)) return;
    } else {
      // Se tiver meta pai, mantém realizado e meta como 0
      realizado = 0;
      metaPlanejada = 0;
    }

    const novaMeta = new Meta(nomeMeta, prioridade, realizado, metaPlanejada, penalidade);

    // Se houver meta pai, adiciona esta meta como filha
    if (metaPaiId) {
      const metaPai = this.metas.find((meta) => meta.id == metaPaiId);
      if (metaPai) {
        metaPai.adicionarMetaFilha(novaMeta);
        novaMeta.metaPai = metaPai;
      }
    }

    this.metas.push(novaMeta);

    this.atualizarUI();
    $("#metaForm")[0].reset();
    $('select').formSelect();
    this.toggleCamposMeta();
  }

  validateInput(nome, realizado, metaPlanejada, prioridade) {
    if (!nome || !prioridade) {
      M.toast({ html: "Por favor, preencha todos os campos obrigatórios.", classes: "red" });
      return false;
    }

    if (isNaN(realizado) || isNaN(metaPlanejada)) {
      M.toast({ html: "Os valores de realizado e meta planejada devem ser números.", classes: "red" });
      return false;
    }

    return true;
  }

  atualizarUI() {
    this.renderMetasList();
    this.renderDashboardCards();
    this.atualizarEquipesUI();
    this.atualizarMembrosList();
    this.atualizarRelatorios();
    this.updateMetaPaiOptions();
  }

  renderMetasList() {
    const listaMetas = $("#metasList");
    listaMetas.empty();

    this.metas.forEach((meta) => {
      const li = $(`
        <li class="collection-item">
          <span class="title"><strong>${meta.nome}</strong></span>
          <p>
            Realizado: ${meta.getTotalRealizado()} / Meta: ${meta.getTotalMeta()}<br/>
            Prioridade: ${meta.getPriorityLabel()}<br/>
            ${meta.penalidade ? '<span class="new badge red" data-badge-caption="Penalidade"></span>' : ''}
            ${meta.metaPai ? `<span class="new badge blue" data-badge-caption="Meta Pai: ${meta.metaPai.nome}"></span>` : ''}
          </p>
        </li>
      `);
      listaMetas.append(li);
    });
  }

  renderDashboardCards() {
    const dashboardCards = $("#dashboardCards");
    dashboardCards.empty();

    if (this.metas.length === 0) {
      dashboardCards.append('<p>Não há metas cadastradas.</p>');
      return;
    }

    this.metas.forEach(meta => {
      if (meta.metaPai) {
        return;
      }

      const desempenhoMeta =
        meta.getTotalMeta() !== 0
          ? ((meta.getTotalRealizado() / meta.getTotalMeta()) * 100).toFixed(2)
          : 0;

      const card = $(`
        <div class="col s12 m4">
          <div class="card blue accent-3">
            <div class="card-content white-text">
              <span class="card-title">${meta.nome}</span>
              <p>Status: ${desempenhoMeta >= 100 ? 'Concluída' : 'Ativa'}</p>
              <div class="progress white">
                <div class="determinate blue" style="width: ${desempenhoMeta}%;"></div>
              </div>
              <p>Desempenho atual: ${desempenhoMeta}%</p>
            </div>
            <div class="card-action">
              <a href="#" class="white-text meta-details" data-meta-id="${meta.id}">Ver Detalhes</a>
            </div>
          </div>
        </div>
      `);

      dashboardCards.append(card);
    });

    // Evento para "Ver Detalhes"
    $(document).on('click', '.meta-details', (e) => {
      e.preventDefault();
      const metaId = $(e.currentTarget).data('meta-id');
      this.showMetaDetails(metaId);
    });
  }

  showMetaDetails(metaId) {
    const meta = this.metas.find(m => m.id == metaId);
    if (!meta) return;

    let detalhes = `
      <h5>${meta.nome}</h5>
      <p>Prioridade: ${meta.getPriorityLabel()}</p>
      <p>Penalidade: ${meta.penalidade ? 'Sim' : 'Não'}</p>
      <p>Realizado: ${meta.getTotalRealizado()}</p>
      <p>Meta Planejada: ${meta.getTotalMeta()}</p>
    `;

    if (meta.metaFilhas.length > 0) {
      detalhes += '<h6>Metas Filhas:</h6><ul>';
      meta.metaFilhas.forEach(filha => {
        detalhes += `<li>${filha.nome} - Realizado: ${filha.realizado} / Meta: ${filha.meta}</li>`;
      });
      detalhes += '</ul>';
    }

    M.toast({ html: detalhes, displayLength: 6000 });
  }

  adicionarEquipe() {
    const nomeEquipe = $("#nome_equipe").val();
    const membrosInput = $("#membrosEquipe").val();

    if (!nomeEquipe || !membrosInput) {
      M.toast({
        html: "Por favor, preencha todos os campos da equipe.",
        classes: "red",
      });
      return;
    }

    const membrosList = membrosInput.split(',').map(item => {
      const [nome, cargo] = item.split('-').map(s => s.trim());
      return new Membro(nome, cargo);
    });

    const novaEquipe = new Equipe(nomeEquipe, membrosList);

    this.equipes.push(novaEquipe);

    this.atualizarUI();
    $("#equipeForm")[0].reset();
    $('select').formSelect();
  }

  atualizarEquipesUI() {
    const equipesList = $("#equipesList");
    equipesList.empty();

    this.equipes.forEach(equipe => {
      const li = $(`
        <li class="collection-item">
          <span class="title"><strong>${equipe.nome}</strong></span>
          <p>
            Membros e Cargos:<br/>
            ${equipe.membros.map(membro => `${membro.nome} - ${membro.cargo}`).join('<br/>')}
          </p>
        </li>
      `);
      equipesList.append(li);

      // Associar metas aos membros com base no cargo
      equipe.membros.forEach(membro => {
        const cargoMetas = this.getMetasPorCargo(membro.cargo);
        membro.setMetas(cargoMetas);

        // Adicionar membro à lista de membros gerais se ainda não estiver
        if (!this.membros.some(m => m.id === membro.id)) {
          this.membros.push(membro);
        }
      });
    });
  }

  getMetasPorCargo(cargo) {
    // Retorna as metas associadas a um cargo específico
    return this.metas.filter(meta => meta.nome.includes(cargo));
  }

  atualizarMembrosList() {
    const membrosList = $("#membrosList");
    membrosList.empty();

    if (this.membros.length === 0) {
      membrosList.append('<p>Não há membros cadastrados.</p>');
      return;
    }

    this.membros.forEach(membro => {
      const li = $(`
        <li class="collection-item">
          <span class="title"><strong>${membro.nome}</strong> - ${membro.cargo}</span>
          <p>
            Metas Associadas:<br/>
            ${membro.metas.map(meta => `${meta.nome}`).join('<br/>')}
          </p>
        </li>
      `);
      membrosList.append(li);
    });
  }

  atualizarRelatorios() {
    const relatoriosContent = $("#relatoriosContent");
    relatoriosContent.empty();

    // Relatório geral
    const desempenhoGeral = this.calcularDesempenhoGeral();
    relatoriosContent.append(`<h5>Desempenho Geral: ${desempenhoGeral.toFixed(2)}%</h5>`);

    // Relatório por membro
    this.membros.forEach(membro => {
      const desempenhoMembro = membro.calcularDesempenho();
      relatoriosContent.append(`
        <div>
          <h6>${membro.nome} (${membro.cargo}): ${desempenhoMembro.toFixed(2)}%</h6>
        </div>
      `);
    });
  }

  calcularDesempenhoGeral() {
    let totalPeso = 0;
    let totalRealizado = 0;

    this.metas.forEach(meta => {
      const metaPeso = meta.getTotalMeta();
      const metaRealizado = meta.getTotalRealizado();

      if (meta.penalidade) {
        totalPeso -= metaPeso;
        totalRealizado -= metaRealizado;
      } else {
        totalPeso += metaPeso;
        totalRealizado += metaRealizado;
      }
    });

    return totalPeso !== 0 ? (totalRealizado / totalPeso) * 100 : 0;
  }
}

// Classes auxiliares
class Meta {
  constructor(nome, prioridade, realizado, metaPlanejada, penalidade = false) {
    this.id = Date.now() + Math.random();
    this.nome = nome;
    this.prioridade = prioridade;
    this.realizado = realizado;
    this.meta = metaPlanejada;
    this.penalidade = penalidade;
    this.metaPai = null;
    this.metaFilhas = [];
  }

  adicionarMetaFilha(metaFilha) {
    this.metaFilhas.push(metaFilha);
  }

  getTotalMeta() {
    let totalMeta = this.metaFilhas.reduce((sum, meta) => sum + meta.getTotalMeta(), 0);
    return totalMeta + (this.meta || 0);
  }

  getTotalRealizado() {
    let totalRealizado = this.metaFilhas.reduce((sum, meta) => sum + meta.getTotalRealizado(), 0);
    return totalRealizado + (this.realizado || 0);
  }

  getPriorityLabel() {
    switch (this.prioridade) {
      case 1:
        return "Alta";
      case 2:
        return "Média";
      case 3:
        return "Baixa";
      default:
        return "N/A";
    }
  }

  getPriorityClass() {
    switch (this.prioridade) {
      case 1:
        return "priority-high";
      case 2:
        return "priority-medium";
      case 3:
        return "priority-low";
      default:
        return "";
    }
  }
}

class Equipe {
  constructor(nome, membros) {
    this.id = Date.now();
    this.nome = nome;
    this.membros = membros;
  }
}

class Membro {
  constructor(nome, cargo) {
    this.id = Date.now() + Math.random();
    this.nome = nome;
    this.cargo = cargo;
    this.metas = [];
  }

  setMetas(metas) {
    this.metas = metas;
  }

  calcularDesempenho() {
    let totalPeso = 0;
    let totalRealizado = 0;

    this.metas.forEach(meta => {
      totalPeso += meta.meta || 0;
      totalRealizado += meta.realizado || 0;
    });

    return totalPeso !== 0 ? (totalRealizado / totalPeso) * 100 : 0;
  }
}

// Inicializar a aplicação
$(document).ready(() => {
  window.app = new OKRApp();
});