// Função simples usada para mostrar valores em reais.
function dinheiro(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

// ====================
// EXERCÍCIO 1 - FRETE
// ====================

let pedidos = [];

function criarExercicio1() {
    document.querySelector("#exercicio1 .exercise-content").innerHTML = `
        <div class="configuracao"><label>Preço do litro do combustível <input id="freteCombustivel" type="number" min="0" step="0.01" placeholder="Ex.: 6.20"></label></div>
        <div class="campos">
            <input id="freteCodigo" placeholder="Código do pedido">
            <select id="freteRegiao"><option value="">Região</option><option value="1">1 - Sudeste</option><option value="2">2 - Sul</option><option value="3">3 - Centro-Oeste</option></select>
            <input id="freteKm" type="number" min="0" placeholder="Distância (km)">
            <input id="fretePecas" type="number" min="1" placeholder="Quantidade de peças">
            <select id="freteRastreamento"><option value="">Rastreamento?</option><option value="S">Sim</option><option value="N">Não</option></select>
        </div>
        <button onclick="adicionarPedido()">Adicionar pedido</button> <button class="secundario" onclick="relatorioFrete()">Gerar relatório</button>
        <p id="freteMensagem" class="mensagem"></p><div id="freteLista" class="lista"></div><div id="freteRelatorio" class="relatorio"></div>`;
}

function adicionarPedido() {
    let codigo = document.getElementById("freteCodigo").value.trim();
    let regiao = document.getElementById("freteRegiao").value;
    let km = Number(document.getElementById("freteKm").value);
    let pecas = Number(document.getElementById("fretePecas").value);
    let rastreamento = document.getElementById("freteRastreamento").value;
    let combustivel = Number(document.getElementById("freteCombustivel").value);
    let mensagem = document.getElementById("freteMensagem");
    let existe = false;

    for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].codigo === codigo) existe = true;
    }
    if (!codigo || !regiao || !rastreamento || km < 0 || pecas <= 0 || combustivel <= 0 || existe) {
        mensagem.textContent = existe ? "Esse código já foi cadastrado." : "Preencha todos os campos com valores válidos.";
        return;
    }

    let precoPeca = 0;
    let nomeRegiao = "";
    // O switch é usado para escolher o preço de cada região.
    switch (regiao) {
        case "1": precoPeca = 1.20; nomeRegiao = "Sudeste"; break;
        case "2": precoPeca = 1.30; nomeRegiao = "Sul"; break;
        case "3": precoPeca = 1.50; nomeRegiao = "Centro-Oeste"; break;
        default: mensagem.textContent = "Escolha uma região válida."; return;
    }
    let excedentes = pecas > 1000 ? pecas - 1000 : 0;
    let valorPecas = (pecas - excedentes) * precoPeca + excedentes * precoPeca * 0.88;
    let total = km * combustivel + valorPecas + (rastreamento === "S" ? 200 : 0);
    pedidos.push({ codigo: codigo, regiao: nomeRegiao, total: total });
    mensagem.textContent = "Pedido adicionado com sucesso.";
    mostrarPedidos();
}

function mostrarPedidos() {
    let texto = "<h4>Pedidos cadastrados</h4>";
    for (let i = 0; i < pedidos.length; i++) texto += `<p>${pedidos[i].codigo} - ${pedidos[i].regiao}: ${dinheiro(pedidos[i].total)}</p>`;
    document.getElementById("freteLista").innerHTML = texto;
}

function relatorioFrete() {
    if (pedidos.length === 0) { document.getElementById("freteRelatorio").textContent = "Cadastre ao menos um pedido."; return; }
    let total = 0, sudeste = 0, sul = 0, centro = 0, maior = pedidos[0], menor = pedidos[0];
    let i = 0;
    // O while percorre todos os pedidos cadastrados.
    while (i < pedidos.length) {
        let pedido = pedidos[i];
        total += pedido.total;
        if (pedido.regiao === "Sudeste") sudeste += pedido.total;
        else if (pedido.regiao === "Sul") sul += pedido.total;
        else centro += pedido.total;
        if (pedido.total > maior.total) maior = pedido;
        if (pedido.total < menor.total) menor = pedido;
        i++;
    }
    document.getElementById("freteRelatorio").innerHTML = `<h4>Relatório final</h4><p>Total de pedidos: ${pedidos.length}</p><p>Média: ${dinheiro(total / pedidos.length)}</p><p>Sudeste: ${dinheiro(sudeste)} | Sul: ${dinheiro(sul)} | Centro-Oeste: ${dinheiro(centro)}</p><p>Mais caro: ${maior.codigo} (${dinheiro(maior.total)})</p><p>Mais barato: ${menor.codigo} (${dinheiro(menor.total)})</p>`;
}

// ====================
// EXERCÍCIO 2 - FOLHA
// ====================

let funcionarios = [];

function criarExercicio2() {
    document.querySelector("#exercicio2 .exercise-content").innerHTML = `
        <div class="configuracao"><label>Salário mínimo atual <input id="folhaMinimo" type="number" min="0" step="0.01" placeholder="Ex.: 1518"></label></div>
        <div class="campos"><input id="folhaCodigo" placeholder="Código"><input id="folhaHoras" type="number" min="1" placeholder="Horas trabalhadas"><select id="folhaCategoria"><option value="">Categoria</option><option value="F">Funcionário</option><option value="G">Gerente</option></select><select id="folhaTurno"><option value="">Turno</option><option value="M">Matutino</option><option value="V">Vespertino</option><option value="N">Noturno</option></select><input id="folhaNota" type="number" min="0" max="10" step="0.1" placeholder="Nota (0 a 10)"></div>
        <button onclick="adicionarFuncionario()">Adicionar funcionário</button> <button class="secundario" onclick="relatorioFolha()">Gerar relatório</button><p id="folhaMensagem" class="mensagem"></p><div id="folhaLista" class="lista"></div><div id="folhaRelatorio" class="relatorio"></div>`;
}

function adicionarFuncionario() {
    let codigo = document.getElementById("folhaCodigo").value.trim(), horas = Number(document.getElementById("folhaHoras").value), categoria = document.getElementById("folhaCategoria").value, turno = document.getElementById("folhaTurno").value, nota = Number(document.getElementById("folhaNota").value), minimo = Number(document.getElementById("folhaMinimo").value), existe = false;
    for (let i = 0; i < funcionarios.length; i++) if (funcionarios[i].codigo === codigo) existe = true;
    if (!codigo || !categoria || !turno || horas <= 0 || minimo <= 0 || nota < 0 || nota > 10 || existe) { document.getElementById("folhaMensagem").textContent = existe ? "Esse código já existe." : "Preencha os dados corretamente."; return; }
    let percentualHora = 0;
    if (categoria === "F") { if (turno === "M") percentualHora = 0.10; else if (turno === "V") percentualHora = 0.15; else percentualHora = 0.20; }
    else { if (turno === "M") percentualHora = 0.30; else if (turno === "V") percentualHora = 0.35; else percentualHora = 0.40; }
    let inicial = horas * minimo * percentualHora;
    let auxilio = inicial <= 800 ? inicial * 0.25 : (inicial <= 1200 ? inicial * 0.20 : inicial * 0.15);
    let percentualBonus = nota >= 9 ? 0.10 : (nota >= 7 ? 0.05 : (nota >= 5 ? 0.02 : 0));
    let final = inicial + auxilio + inicial * percentualBonus;
    funcionarios.push({ codigo: codigo, categoria: categoria, turno: turno, final: final, bonus: percentualBonus });
    document.getElementById("folhaMensagem").textContent = "Funcionário adicionado."; mostrarFuncionarios();
}

function mostrarFuncionarios() { let texto = "<h4>Funcionários cadastrados</h4>"; for (let i = 0; i < funcionarios.length; i++) texto += `<p>${funcionarios[i].codigo} - ${funcionarios[i].categoria}/${funcionarios[i].turno}: ${dinheiro(funcionarios[i].final)}</p>`; document.getElementById("folhaLista").innerHTML = texto; }

function relatorioFolha() {
    if (!funcionarios.length) { document.getElementById("folhaRelatorio").textContent = "Cadastre ao menos um funcionário."; return; }
    let soma = 0, somaF = 0, somaG = 0, qtdF = 0, qtdG = 0, faixas = [0, 0, 0, 0], maior = funcionarios[0], menor = funcionarios[0];
    for (let i = 0; i < funcionarios.length; i++) { let f = funcionarios[i]; soma += f.final; if (f.categoria === "F") { somaF += f.final; qtdF++; } else { somaG += f.final; qtdG++; } if (f.bonus === 0.10) faixas[0]++; else if (f.bonus === 0.05) faixas[1]++; else if (f.bonus === 0.02) faixas[2]++; else faixas[3]++; if (f.final > maior.final) maior = f; if (f.final < menor.final) menor = f; }
    document.getElementById("folhaRelatorio").innerHTML = `<h4>Relatório final</h4><p>Funcionários: ${funcionarios.length} | Média geral: ${dinheiro(soma / funcionarios.length)}</p><p>Média operacional: ${qtdF ? dinheiro(somaF / qtdF) : "Não há"} | Média gerentes: ${qtdG ? dinheiro(somaG / qtdG) : "Não há"}</p><p>Maior: ${maior.codigo} (${maior.categoria}/${maior.turno}) - ${dinheiro(maior.final)}</p><p>Menor: ${menor.codigo} (${menor.categoria}/${menor.turno}) - ${dinheiro(menor.final)}</p><p>Bônus 10%: ${faixas[0]} | 5%: ${faixas[1]} | 2%: ${faixas[2]} | 0%: ${faixas[3]}</p>`;
}

// ====================
// EXERCÍCIO 3 - PRODUÇÃO
// ====================

let ordens = [];

function criarExercicio3() {
    document.querySelector("#exercicio3 .exercise-content").innerHTML = `<div class="campos"><input id="prodCodigo" placeholder="Código da ordem"><input id="prodProduto" placeholder="Código do produto"><select id="prodTipo"><option value="">Tipo</option><option value="1">1 - Padrão</option><option value="2">2 - Premium</option><option value="3">3 - Sob encomenda</option></select><input id="prodQuantidade" type="number" min="1" placeholder="Quantidade produzida"><input id="prodCusto" type="number" min="0" step="0.01" placeholder="Custo unitário"><input id="prodEstoque" type="number" min="0" placeholder="Estoque inicial"></div><button onclick="adicionarOrdem()">Adicionar ordem</button> <button class="secundario" onclick="relatorioProducao()">Gerar relatório</button><p id="prodMensagem" class="mensagem"></p><div id="prodLista" class="lista"></div><div id="prodRelatorio" class="relatorio"></div>`;
}

function adicionarOrdem() {
    let codigo = document.getElementById("prodCodigo").value.trim(), produto = document.getElementById("prodProduto").value.trim(), tipo = document.getElementById("prodTipo").value, quantidade = Number(document.getElementById("prodQuantidade").value), custo = Number(document.getElementById("prodCusto").value), estoque = Number(document.getElementById("prodEstoque").value), existe = false;
    for (let i = 0; i < ordens.length; i++) if (ordens[i].codigo === codigo) existe = true;
    if (!codigo || !produto || !tipo || quantidade <= 0 || custo < 0 || estoque < 0 || existe) { document.getElementById("prodMensagem").textContent = existe ? "Código da ordem repetido." : "Preencha os dados corretamente."; return; }
    let multiplicador = tipo === "1" ? 1 : (tipo === "2" ? 1.10 : 1.20), custoTotal = quantidade * custo * multiplicador, estoqueFinal = estoque + quantidade, alerta = estoqueFinal > 5000 ? "Estoque alto" : (estoqueFinal < 500 ? "Estoque crítico" : "Normal");
    ordens.push({ codigo: codigo, produto: produto, tipo: tipo, custo: custoTotal, estoque: estoqueFinal, alerta: alerta }); document.getElementById("prodMensagem").textContent = "Ordem adicionada."; mostrarOrdens();
}

function mostrarOrdens() { let texto = "<h4>Ordens cadastradas</h4>"; for (let i = 0; i < ordens.length; i++) texto += `<p>${ordens[i].codigo} - Produto ${ordens[i].produto}: ${dinheiro(ordens[i].custo)} (${ordens[i].alerta})</p>`; document.getElementById("prodLista").innerHTML = texto; }

function relatorioProducao() {
    if (!ordens.length) { document.getElementById("prodRelatorio").textContent = "Cadastre ao menos uma ordem."; return; }
    let soma = 0, porTipo = [0, 0, 0], alto = 0, critico = 0, maior = ordens[0], menor = ordens[0], produtos = {};
    for (let i = 0; i < ordens.length; i++) { let o = ordens[i]; soma += o.custo; porTipo[Number(o.tipo) - 1] += o.estoque; if (o.alerta === "Estoque alto") alto++; if (o.alerta === "Estoque crítico") critico++; if (o.custo > maior.custo) maior = o; if (o.custo < menor.custo) menor = o; if (!produtos[o.produto]) produtos[o.produto] = { estoque: 0, valor: 0 }; produtos[o.produto].estoque += o.estoque; produtos[o.produto].valor += o.custo; }
    let consolidado = ""; for (let produto in produtos) consolidado += `<p>Produto ${produto}: estoque ${produtos[produto].estoque} | investido ${dinheiro(produtos[produto].valor)}</p>`;
    document.getElementById("prodRelatorio").innerHTML = `<h4>Relatório final</h4><p>Ordens: ${ordens.length} | Média de custo: ${dinheiro(soma / ordens.length)}</p><p>Estoque por tipo - Padrão: ${porTipo[0]} | Premium: ${porTipo[1]} | Sob encomenda: ${porTipo[2]}</p><p>Mais cara: ${maior.codigo} | Mais barata: ${menor.codigo}</p><p>Alertas: alto ${alto} | crítico ${critico}</p>${consolidado}`;
}

// ====================
// EXERCÍCIO 4 - HOTEL
// ====================

let reservas = [];

function criarExercicio4() {
    document.querySelector("#exercicio4 .exercise-content").innerHTML = `<div class="configuracao"><label>Diária base <input id="hotelDiaria" type="number" min="0" step="0.01"></label><label>Café por hóspede/dia <input id="hotelCafe" type="number" min="0" step="0.01"></label></div><div class="campos"><input id="hotelCodigo" placeholder="Código da reserva"><select id="hotelTipo"><option value="">Tipo</option><option value="S">Standard</option><option value="L">Luxo</option><option value="P">Premium</option></select><select id="hotelTemporada"><option value="">Temporada</option><option value="B">Baixa</option><option value="A">Alta</option><option value="F">Feriado</option></select><input id="hotelDiarias" type="number" min="1" placeholder="Diárias"><input id="hotelHospedes" type="number" min="1" placeholder="Hóspedes"><select id="hotelIncluso"><option value="">Café incluso?</option><option value="S">Sim</option><option value="N">Não</option></select></div><button onclick="adicionarReserva()">Adicionar reserva</button> <button class="secundario" onclick="relatorioHotel()">Gerar relatório</button><p id="hotelMensagem" class="mensagem"></p><div id="hotelLista" class="lista"></div><div id="hotelRelatorio" class="relatorio"></div>`;
}

function adicionarReserva() {
    let codigo = document.getElementById("hotelCodigo").value.trim(), tipo = document.getElementById("hotelTipo").value, temporada = document.getElementById("hotelTemporada").value, diarias = Number(document.getElementById("hotelDiarias").value), hospedes = Number(document.getElementById("hotelHospedes").value), incluso = document.getElementById("hotelIncluso").value, base = Number(document.getElementById("hotelDiaria").value), cafe = Number(document.getElementById("hotelCafe").value), existe = false;
    for (let i = 0; i < reservas.length; i++) if (reservas[i].codigo === codigo) existe = true;
    if (!codigo || !tipo || !temporada || !incluso || diarias <= 0 || hospedes <= 0 || base <= 0 || cafe < 0 || existe) { document.getElementById("hotelMensagem").textContent = existe ? "Código da reserva repetido." : "Preencha os dados corretamente."; return; }
    let multiTipo = tipo === "S" ? 1 : (tipo === "L" ? 1.5 : 2), adicional = temporada === "B" ? 0 : (temporada === "A" ? 0.25 : 0.40), total = base * multiTipo * (1 + adicional) * diarias;
    if (incluso === "S") total += cafe * hospedes * diarias;
    reservas.push({ codigo: codigo, tipo: tipo, temporada: temporada, hospedes: hospedes, total: total, cafe: incluso }); document.getElementById("hotelMensagem").textContent = "Reserva adicionada."; mostrarReservas();
}

function mostrarReservas() { let texto = "<h4>Reservas cadastradas</h4>"; for (let i = 0; i < reservas.length; i++) texto += `<p>${reservas[i].codigo} - ${reservas[i].tipo}/${reservas[i].temporada}: ${dinheiro(reservas[i].total)}</p>`; document.getElementById("hotelLista").innerHTML = texto; }

function relatorioHotel() {
    if (!reservas.length) { document.getElementById("hotelRelatorio").textContent = "Cadastre ao menos uma reserva."; return; }
    let soma = 0, tipos = { S: 0, L: 0, P: 0 }, temporadas = { B: 0, A: 0, F: 0 }, comCafe = 0, hospedes = 0, maior = reservas[0], menor = reservas[0];
    for (let i = 0; i < reservas.length; i++) { let r = reservas[i]; soma += r.total; tipos[r.tipo] += r.total; temporadas[r.temporada] += r.total; hospedes += r.hospedes; if (r.cafe === "S") comCafe++; if (r.total > maior.total) maior = r; if (r.total < menor.total) menor = r; }
    document.getElementById("hotelRelatorio").innerHTML = `<h4>Relatório final</h4><p>Reservas: ${reservas.length} | Média: ${dinheiro(soma / reservas.length)}</p><p>Por tipo - S: ${dinheiro(tipos.S)} | L: ${dinheiro(tipos.L)} | P: ${dinheiro(tipos.P)}</p><p>Por temporada - Baixa: ${dinheiro(temporadas.B)} | Alta: ${dinheiro(temporadas.A)} | Feriado: ${dinheiro(temporadas.F)}</p><p>Mais cara: ${maior.codigo} | Mais barata: ${menor.codigo}</p><p>Com café: ${comCafe} | Sem café: ${reservas.length - comCafe} | Ocupação: ${hospedes} hóspedes | Média por hóspede: ${dinheiro(soma / hospedes)}</p>`;
}

// ====================
// EXERCÍCIO 5 - TREINOS
// ====================

let treinos = [];

function criarExercicio5() {
    document.querySelector("#exercicio5 .exercise-content").innerHTML = `<div class="configuracao"><label>Carga máxima semanal <input id="treinoLimite" type="number" min="0" step="0.1" placeholder="Ex.: 100"></label></div><div class="campos"><input id="treinoCodigo" placeholder="Código do treino"><input id="treinoJogador" placeholder="Nome do jogador"><select id="treinoPosicao"><option value="">Posição</option><option value="G">Goleiro</option><option value="Z">Zagueiro</option><option value="M">Meio-campo</option><option value="A">Atacante</option></select><select id="treinoTipo"><option value="">Tipo</option><option value="F">Físico</option><option value="T">Técnico</option><option value="E">Estratégico</option></select><input id="treinoDuracao" type="number" min="1" placeholder="Duração (minutos)"><input id="treinoIntensidade" type="number" min="1" max="10" placeholder="Intensidade (1 a 10)"></div><button onclick="adicionarTreino()">Adicionar treino</button> <button class="secundario" onclick="relatorioTreinos()">Gerar relatório</button><p id="treinoMensagem" class="mensagem"></p><div id="treinoLista" class="lista"></div><div id="treinoRelatorio" class="relatorio"></div>`;
}

function adicionarTreino() {
    let codigo = document.getElementById("treinoCodigo").value.trim(), jogador = document.getElementById("treinoJogador").value.trim(), posicao = document.getElementById("treinoPosicao").value, tipo = document.getElementById("treinoTipo").value, duracao = Number(document.getElementById("treinoDuracao").value), intensidade = Number(document.getElementById("treinoIntensidade").value), limite = Number(document.getElementById("treinoLimite").value), existe = false;
    for (let i = 0; i < treinos.length; i++) if (treinos[i].codigo === codigo) existe = true;
    if (!codigo || !jogador || !posicao || !tipo || duracao <= 0 || intensidade < 1 || intensidade > 10 || limite <= 0 || existe) { document.getElementById("treinoMensagem").textContent = existe ? "Código do treino repetido." : "Preencha os dados corretamente."; return; }
    let multiplicador = tipo === "F" ? 1.5 : (tipo === "T" ? 1.2 : 1), carga = (duracao / 10) * intensidade * multiplicador;
    treinos.push({ codigo: codigo, jogador: jogador, posicao: posicao, tipo: tipo, carga: carga }); document.getElementById("treinoMensagem").textContent = "Treino adicionado."; mostrarTreinos();
}

function mostrarTreinos() { let texto = "<h4>Treinos cadastrados</h4>"; for (let i = 0; i < treinos.length; i++) texto += `<p>${treinos[i].codigo} - ${treinos[i].jogador}: carga ${treinos[i].carga.toFixed(1)}</p>`; document.getElementById("treinoLista").innerHTML = texto; }

function relatorioTreinos() {
    if (!treinos.length) { document.getElementById("treinoRelatorio").textContent = "Cadastre ao menos um treino."; return; }
    let jogadores = {}, tipos = { F: { soma: 0, qtd: 0 }, T: { soma: 0, qtd: 0 }, E: { soma: 0, qtd: 0 } }, posicoes = { G: { soma: 0, qtd: 0 }, Z: { soma: 0, qtd: 0 }, M: { soma: 0, qtd: 0 }, A: { soma: 0, qtd: 0 } };
    for (let i = 0; i < treinos.length; i++) { let t = treinos[i]; if (!jogadores[t.jogador]) jogadores[t.jogador] = { carga: 0, qtd: 0 }; jogadores[t.jogador].carga += t.carga; jogadores[t.jogador].qtd++; tipos[t.tipo].soma += t.carga; tipos[t.tipo].qtd++; posicoes[t.posicao].soma += t.carga; posicoes[t.posicao].qtd++; }
    let limite = Number(document.getElementById("treinoLimite").value), nomes = Object.keys(jogadores), maior = nomes[0], menor = nomes[0], risco = 0, lista = "";
    for (let i = 0; i < nomes.length; i++) { let nome = nomes[i], dado = jogadores[nome]; if (dado.carga > jogadores[maior].carga) maior = nome; if (dado.carga < jogadores[menor].carga) menor = nome; if (dado.carga > limite) risco++; lista += `<p>${nome}: carga ${dado.carga.toFixed(1)}, ${dado.qtd} treino(s)${dado.carga > limite ? " - risco de lesão" : ""}</p>`; }
    let mediaTipo = `Físico: ${(tipos.F.soma / tipos.F.qtd || 0).toFixed(1)} | Técnico: ${(tipos.T.soma / tipos.T.qtd || 0).toFixed(1)} | Estratégico: ${(tipos.E.soma / tipos.E.qtd || 0).toFixed(1)}`;
    let mediaPosicao = `G: ${posicoes.G.qtd} treino(s), média ${(posicoes.G.soma / posicoes.G.qtd || 0).toFixed(1)} | Z: ${posicoes.Z.qtd}, ${(posicoes.Z.soma / posicoes.Z.qtd || 0).toFixed(1)} | M: ${posicoes.M.qtd}, ${(posicoes.M.soma / posicoes.M.qtd || 0).toFixed(1)} | A: ${posicoes.A.qtd}, ${(posicoes.A.soma / posicoes.A.qtd || 0).toFixed(1)}`;
    document.getElementById("treinoRelatorio").innerHTML = `<h4>Relatório final</h4><p>Total de treinos: ${treinos.length}</p>${lista}<p>Maior carga: ${maior} | Menor carga: ${menor} | Jogadores em risco: ${risco}</p><p>Carga média por tipo: ${mediaTipo}</p><p>Por posição (treinos e carga média): ${mediaPosicao}</p>`;
}

// ====================
// EXERCÍCIO 6 - VENDAS
// ====================

let vendas = [];

function criarExercicio6() {
    document.querySelector("#exercicio6 .exercise-content").innerHTML = `<div class="configuracao"><label>Meta mensal por vendedor <input id="vendaMeta" type="number" min="0" step="0.01"></label><label>Comissão base (%) <input id="vendaPercentual" type="number" min="0" step="0.1" placeholder="Ex.: 5"></label></div><div class="campos"><input id="vendaCodigo" placeholder="Código da venda"><input id="vendaVendedor" placeholder="Código do vendedor"><select id="vendaRegiao"><option value="">Região</option><option value="1">1 - Norte</option><option value="2">2 - Nordeste</option><option value="3">3 - Sudeste</option><option value="4">4 - Sul</option></select><input id="vendaValor" type="number" min="0" step="0.01" placeholder="Valor da venda"><select id="vendaCliente"><option value="">Tipo de cliente</option><option value="PF">PF</option><option value="PJ">PJ</option></select></div><button onclick="adicionarVenda()">Adicionar venda</button> <button class="secundario" onclick="relatorioVendas()">Gerar relatório</button><p id="vendaMensagem" class="mensagem"></p><div id="vendaLista" class="lista"></div><div id="vendaRelatorio" class="relatorio"></div>`;
}

function adicionarVenda() {
    let codigo = document.getElementById("vendaCodigo").value.trim(), vendedor = document.getElementById("vendaVendedor").value.trim(), regiao = document.getElementById("vendaRegiao").value, valor = Number(document.getElementById("vendaValor").value), cliente = document.getElementById("vendaCliente").value, percentual = Number(document.getElementById("vendaPercentual").value), existe = false;
    for (let i = 0; i < vendas.length; i++) if (vendas[i].codigo === codigo) existe = true;
    if (!codigo || !vendedor || !regiao || !cliente || valor <= 0 || percentual < 0 || existe) { document.getElementById("vendaMensagem").textContent = existe ? "Código da venda repetido." : "Preencha os dados corretamente."; return; }
    let bonusCliente = cliente === "PF" ? 0.02 : 0.03, bonusRegiao = regiao === "1" || regiao === "2" ? 0.01 : (regiao === "4" ? 0.005 : 0), comissao = valor * (percentual / 100 + bonusCliente + bonusRegiao);
    vendas.push({ codigo: codigo, vendedor: vendedor, regiao: regiao, valor: valor, cliente: cliente, comissao: comissao }); document.getElementById("vendaMensagem").textContent = "Venda adicionada."; mostrarVendas();
}

function mostrarVendas() { let texto = "<h4>Vendas cadastradas</h4>"; for (let i = 0; i < vendas.length; i++) texto += `<p>${vendas[i].codigo} - Vendedor ${vendas[i].vendedor}: ${dinheiro(vendas[i].valor)} | comissão ${dinheiro(vendas[i].comissao)}</p>`; document.getElementById("vendaLista").innerHTML = texto; }

function relatorioVendas() {
    if (!vendas.length) { document.getElementById("vendaRelatorio").textContent = "Cadastre ao menos uma venda."; return; }
    let regioes = [0, 0, 0, 0], clientes = { PF: 0, PJ: 0 }, vendedores = {}, somaComissao = 0, comissaoRegiao = [0, 0, 0, 0], qtdRegiao = [0, 0, 0, 0];
    for (let i = 0; i < vendas.length; i++) { let v = vendas[i], indice = Number(v.regiao) - 1; regioes[indice] += v.valor; clientes[v.cliente] += v.valor; somaComissao += v.comissao; comissaoRegiao[indice] += v.comissao; qtdRegiao[indice]++; if (!vendedores[v.vendedor]) vendedores[v.vendedor] = { vendas: 0, comissao: 0 }; vendedores[v.vendedor].vendas += v.valor; vendedores[v.vendedor].comissao += v.comissao; }
    let codigos = Object.keys(vendedores), maiorVenda = codigos[0], maiorComissao = codigos[0], meta = Number(document.getElementById("vendaMeta").value), atingiram = 0;
    for (let i = 0; i < codigos.length; i++) { let codigo = codigos[i]; if (vendedores[codigo].vendas > vendedores[maiorVenda].vendas) maiorVenda = codigo; if (vendedores[codigo].comissao > vendedores[maiorComissao].comissao) maiorComissao = codigo; if (vendedores[codigo].vendas >= meta) atingiram++; }
    document.getElementById("vendaRelatorio").innerHTML = `<h4>Relatório final</h4><p>Total de vendas: ${vendas.length}</p><p>Por região - Norte: ${dinheiro(regioes[0])} | Nordeste: ${dinheiro(regioes[1])} | Sudeste: ${dinheiro(regioes[2])} | Sul: ${dinheiro(regioes[3])}</p><p>Por cliente - PF: ${dinheiro(clientes.PF)} | PJ: ${dinheiro(clientes.PJ)}</p><p>Maior valor vendido: ${maiorVenda} (${dinheiro(vendedores[maiorVenda].vendas)}) | Maior comissão: ${maiorComissao} (${dinheiro(vendedores[maiorComissao].comissao)})</p><p>Vendedores que atingiram a meta: ${atingiram} | Comissão média geral: ${dinheiro(somaComissao / vendas.length)}</p><p>Comissão média por região - Norte: ${dinheiro(comissaoRegiao[0] / qtdRegiao[0] || 0)} | Nordeste: ${dinheiro(comissaoRegiao[1] / qtdRegiao[1] || 0)} | Sudeste: ${dinheiro(comissaoRegiao[2] / qtdRegiao[2] || 0)} | Sul: ${dinheiro(comissaoRegiao[3] / qtdRegiao[3] || 0)}</p>`;
}

// Cria as seis interfaces quando a página terminar de carregar.
criarExercicio1();
criarExercicio2();
criarExercicio3();
criarExercicio4();
criarExercicio5();
criarExercicio6();
