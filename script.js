function adicionarNumero(numero) {
    const dizima = document.getElementById('dizima');
    dizima.value += numero;
}

function apagar() {
    const dizima = document.getElementById('dizima');
    dizima.value = dizima.value.slice(0, -1);
}

function calcularFracao() {
    let dizima = document.getElementById('dizima').value;
    const resultado = document.getElementById('resultado');

    // Substituir vírgula por ponto
    dizima = dizima.replace(',', '.');

    // Verificar se a entrada contém parênteses
    if (dizima.includes('(') && dizima.includes(')')) {
        dizima = dizima.replace(/\(([^)]+)\)/g, '.$1');
    }

    const partes = dizima.split('.');

    if (partes.length === 2) {
        const inteiro = partes[0];
        const decimal = partes[1];

        const periodoInicio = identificarInicioPeriodo(decimal);
        if (periodoInicio === -1) {
            resultado.textContent = "Não foi possível identificar um período";
            return;
        }

        const parteNaoPeriodica = decimal.substring(0, periodoInicio);
        const partePeriodica = decimal.substring(periodoInicio);

        const numerador = calcularNumerador(inteiro, parteNaoPeriodica, partePeriodica);
        const denominador = calcularDenominador(parteNaoPeriodica.length, partePeriodica.length);

        const mdc = calcularMDC(numerador, denominador);
        const numeradorSimplificado = numerador / mdc;
        const denominadorSimplificado = denominador / mdc;

        resultado.textContent = `A fração geratriz é: ${numeradorSimplificado}/${denominadorSimplificado}`;
    } else {
        resultado.textContent = "Número inválido.";
    }
}

function identificarInicioPeriodo(decimal) {
    const length = decimal.length;

    for (let i = 1; i <= length / 2; i++) { // Garantir que o período não seja maior que a metade da string
        const periodo = decimal.substring(i, i + 1);
        const restante = decimal.substring(i + 1);

        if (restante.startsWith(periodo)) {
            return i;
        }
    }
    return -1;
}
function calcularNumerador(inteiro, parteNaoPeriodica, partePeriodica) {
    const semPeriodo = inteiro + parteNaoPeriodica;
    const comPeriodo = semPeriodo + partePeriodica;

    const numeradorComPeriodo = parseInt(comPeriodo, 10);
    const numeradorSemPeriodo = parseInt(semPeriodo, 10);

    return numeradorComPeriodo - numeradorSemPeriodo;
}

function calcularDenominador(tamanhoNaoPeriodico, tamanhoPeriodico) {
    const denominadorNaoPeriodico = Math.pow(10, tamanhoNaoPeriodico);
    const repeticoes = Math.pow(10, tamanhoPeriodico) - 1;

    return denominadorNaoPeriodico * repeticoes;
}

function calcularMDC(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Habilitar Enter para calcular a fração
document.getElementById('dizima').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calcularFracao();
    }
});
