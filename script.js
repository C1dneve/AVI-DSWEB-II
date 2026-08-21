let pedidos =[];

function addPedido(){
    let InputCodigo = document.getElementById("codigo");
    let gasolina = document.getElementById("gasolina");
    let Selectregiao =  document.getElementById("regiao");
    let SelectRastreamento =  document.getElementById("rastreamento");
    let KmRodado = document.getElementById("km")
    let Inputpecas =  document.getElementById("pecas")

    let precoGasolina = Number(gasolina.value);
    let codigo =  InputCodigo.value.trim(); 
    let regiao = Selectregiao.value;
    let km = Number(KmRodado.value);
    let pecas = Number(Inputpecas.value)
    let rastreamento = SelectRastreamento.value; 

    if (!codigo || !regiao || km <= 0 || precoGasolina <= 0 || pecas <= 0 || rastreamento === "") {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if(pedidos.some((pedido => pedido.codigo === codigo))) // == compara só pelo valor e === compara pelo tipo e valor
    {
        alert("Já existe esse pedido no sistema");
        return;
    }

    let precoPeca = 0;
    let nomeRegiao = "";


    switch (regiao)
        {
        case "1":
            precoPeca = 1.20
            nomeRegiao = "Sudeste"
            break;

        case "2":
            precoPeca = 1.30
            nomeRegiao = "Sul"
            break;

        case "3":
            precoPeca = 1.50
            nomeRegiao = "Centro-Oeste"
            break;    
        }
    

    

    let valorPecas = 0;

    if(pecas > 1000){
        let normal = 1000;
        let excedente = pecas - 1000;
        valorPecas = (normal * precoPeca + ((excedente * precoPeca ) * 0.88))
    }
    else{
        valorPecas = pecas * precoPeca
    }
    
    let valorRastreamento = 0

    if (rastreamento === "S" )
    {
        valorRastreamento = 200
    }
    else
    {
        valorRastreamento = 0
    }

    let valorKm = km * precoGasolina

    let valorTotal = valorKm + valorPecas + valorRastreamento

    

    let pedido =
    {
        codigo: codigo,
        regiao: regiao,
        km: km,
        valorPecas: valorPecas,
        rastreamento: rastreamento,
        valorKm: valorKm,
        valorRastreamento: valorRastreamento,
        valorTotal: valorTotal,
        pecas: pecas

    };

    pedidos.push(pedido);
    console.log(pedidos);

    document.getElementById("freteLista").innerHTML += 
    `
    <div class="pedido">
        <h4>Pedido ${codigo}</h4>
        <p>Região: ${nomeRegiao}</p>
        <p>Peças: ${pecas}</p>
        <p>Distância: ${km} km</p>
        <p>Rastreamento: ${rastreamento === "S" ? "Sim" : "Não"}</p>
        <p>Valor das peças: R$ ${valorPecas.toFixed(2)}</p>
        <p>Valor por distância: R$ ${valorKm.toFixed(2)}</p>
        <p>Valor do rastreamento: R$ ${valorRastreamento.toFixed(2)}</p>
        <strong>Valor total: R$ ${valorTotal.toFixed(2)}</strong>
    </div>
    `;

    document.getElementById("freteMensagem").textContent =
    `Pedido ${codigo} cadastrado com sucesso!`;

}



function relatorio()
{
    if (pedidos.length === 0)
    {
        alert("Nenhum pedido cadastrado");
        return;
    }

    let totalPedidos = pedidos.length;
    let valorTotal = 0;

    let valorSul = 0;
    let valorSudeste = 0;
    let valorCentroOeste = 0;

    let maisCaro = pedidos[0];
    let maisBarato = pedidos[0];

    for (let i = 0; i < pedidos.length; i++) {

        valorTotal += pedidos[i].valorTotal;

        if (pedidos[i].regiao === "1") {
            valorSudeste += pedidos[i].valorTotal;
        }
        else if (pedidos[i].regiao === "2") {
            valorSul += pedidos[i].valorTotal;
        }
        else if (pedidos[i].regiao === "3") {
            valorCentroOeste += pedidos[i].valorTotal;
        }

        if (pedidos[i].valorTotal > maisCaro.valorTotal) {
            maisCaro = pedidos[i];
        }

        if (pedidos[i].valorTotal < maisBarato.valorTotal) {
            maisBarato = pedidos[i];
        }
    }

    let media = valorTotal / totalPedidos;

    document.getElementById("freteRelatorio").innerHTML = `
        <h4>Relatório Final</h4>

        <p>Total de pedidos: ${totalPedidos}</p>

        <p>Valor médio por pedido:
            R$ ${media.toFixed(2)}
        </p>

        <p>Total acumulado - Sudeste:
            R$ ${valorSudeste.toFixed(2)}
        </p>

        <p>Total acumulado - Sul:
            R$ ${valorSul.toFixed(2)}
        </p>

        <p>Total acumulado - Centro-Oeste:
            R$ ${valorCentroOeste.toFixed(2)}
        </p>

        <p>Pedido mais caro:
            ${maisCaro.codigo} -
            R$ ${maisCaro.valorTotal.toFixed(2)}
        </p>

        <p>Pedido mais barato:
            ${maisBarato.codigo} -
            R$ ${maisBarato.valorTotal.toFixed(2)}
        </p>
    `;
}

// Exercício 2 – Sistema Avançado de Folha de Pagamento com Bônus de Desempenho e Relatório Mensal 
function addFuncionario()
{
    let CodigoFuncionarioInput = document.getElementById("CodFuncionario");
    let HorasFuncionarioInput = document.getElementById("HorasMes");
    let CategoriaFuncionarioInput = document.getElementById("categoria");
    let TurnoFuncionarioInput = document.getElementById("turno");
    let AvalFuncionarioInput = document.getElementById("avalFuncionario");
    let ValorHoraInput = document.getElementById("valorHora");
    let SalarioMinInput = document.getElementById("salarioMin");
}

// Requisitos: 

// O programa deve permitir cadastrar múltiplos funcionários até que o usuário decida parar. 

// Para cada funcionário cadastrado, o usuário deve inserir as seguintes informações: 

// Código do funcionário (não pode ser repetido, o sistema deve validar isso). 

// Horas trabalhadas no mês. 

// Categoria:  

// Funcionário operacional (F) 

// Gerente (G) 

// Turno de trabalho:  

// Matutino (M) 

// Vespertino (V) 

// Noturno (N) 

// Avaliação de desempenho mensal do funcionário (nota de 0 a 10, sendo obrigatória a validação). 

// Valor da Hora Trabalhada (em % do salário mínimo): 

// Funcionário operacional (F):  

// M: 10% 

// V: 15% 

// N: 20% 

// Gerente (G):  

// M: 30% 

// V: 35% 

// N: 40% 

// Auxílio-Alimentação (calculado sobre o salário inicial): 

// Até R$ 800,00 → 25% 

// De R$ 800,01 até R$ 1200,00 → 20% 

// Acima de R$ 1200,00 → 15% 

// Cálculo do Bônus por desempenho: 

// Nota 9 a 10 → bônus de 10% sobre o salário inicial 

// Nota 7 a 8,99 → bônus de 5% sobre o salário inicial 

// Nota 5 a 6,99 → bônus de 2% sobre o salário inicial 

// Nota abaixo de 5 → sem bônus 

// O usuário deve informar o valor atual do salário mínimo no início do programa. 

// O salário final será calculado da seguinte forma: 

// Salário Final = Salário Inicial + Auxílio-Alimentação + Bônus de desempenho 

// Ao finalizar o cadastro, o sistema deverá exibir um relatório detalhado contendo: 

// Quantidade total de funcionários cadastrados. 

// Média salarial geral dos funcionários cadastrados (salário final). 

// Média salarial por categoria (Funcionários e Gerentes). 

// Maior e menor salário final, exibindo código, categoria, turno e valor recebido. 

// Quantidade de funcionários que receberam cada faixa de bônus (10%, 5%, 2% e nenhum bônus). 