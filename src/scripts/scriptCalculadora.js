document.addEventListener('DOMContentLoaded', function () {

    const temaEstilos = document.getElementById('tema-estilos'); // estilos => style.css / animation.css
    var toggleSection = document.getElementById("toggle-icon") // section que guarda lua | sol

    const temaPreferido = localStorage.getItem('tema-preferido') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Aplicação dos estilos iniciais
    aplicarTema(temaPreferido);


    // Mudando e Guardando o tema escolhido
    toggleSection.onclick = () => {

        let novoTema = temaEstilos.dataset.tema === 'light' ? 'dark' : 'light';
        aplicarTema(novoTema);
        localStorage.setItem('tema-preferido', novoTema); // guardando o tema escolhido  

    };

    function aplicarTema(tema) {

        // Adicionar ou remover a classe conforme o tema
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(`${tema}`);

        // Atualizar o dataset para referência futura
        temaEstilos.dataset.tema = tema;
        adequarImagens(tema) //chama a função para adequar as imagens ao tema 

    }

    function adequarImagens(tema) {// adequa as imagens ao tema

        imgDel.src = `Imagens/icons-Direct/del-${tema}.png` 
        toBack.src = `Imagens/icons-Direct/toHome-${tema}-96.png`
    
    }

});

var firstInput = document.getElementById('firstInput') // primeiro input que vai aparecer para o usuário
var secondInput = document.getElementById('secondInput') // segundo input que vai aparecer para o usuário

let firstDisplay = '' //variável que vai armazionar dados para o primeiro input
let secondDisplay = '' //variável que vai armazionar dados para o segundo input

function atualizarFirstDisplay() { // fiunção de preenchimento do primeiro display (input)

    firstInput.value = firstDisplay //adiciona o valor atribuído ao primeiro input

}

function atualizarSecondDisplay() { // função pra preenchimento correto do segundo diplay (Input)

    //var formatedNumDig = formatedNumbers(Number(numerosDigitados))


    if (numerosDigitados !== '' && operador == '') {//apenas os numeros digitados sem o resultado e sem o operador

        secondInput.value = '= ' + parseFloat(numerosDigitados)

    } else if (operador !== '' && resultadoFinal == 0) { //apenas para mostrar o resultado antes de apertar igual

        secondInput.value = '= ' + parseFloat(resultadoParcial)

    } else if (ultimoOperador !== operador) {

        secondInput.value = '= ' + parseFloat(resultadoFinal)

    } else if (calculou == true) { // quando clicar em igual

        secondInput.value = '= ' + parseFloat(resultadoFinal)

    } else if (deletou == true && operador == '') {

        checkDels() // validar o que foi deletado

    }

}

function formatedNumbers(numero){

    //return numero.toFixed(1).replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")

}


let resultadoParcial = '' //numeros digitados apenas
let resultadoFinal = '' //resultado das operações
let checagemResultado = 0 // checagem de decimais
let checkDivisao = '' // checagem de divisões

function validacaoEntradasDeDados() { // função para verificar divisões erradas

    if (resultDivisao == 0 && operador == '/') { // verifica se o divisor é 0

        resultadoParcial = "0" // garante que ao ser dividido por zero seja em forma de string para não apagar o primeiro display por conta das validações presentes na recursividade do código

    }

}

function mostrarResultadoAntecipado() { // quando acontecer qualquer operação, mesmo sem apertar igual deve aparecer o resultado no segundo display

    if (numerosDigitados !== '' && resultadoFinal == 0) { //  resultado parcial será calculado com o operador definido mais os resultados das contas das arrays feito a conta com os numeros digitados

        if (operador == ultimoOperador) { // caso o o antigo operador seja igual ao novo digitado pelo user

            switch (operador) {

                case '+':
                    checagemResultado = parseFloat(resultSoma) + parseFloat(numerosDigitados) // mostrar o resultado antecipado da operação digitada

                    checkDecimals() // verificar se tem muitas casas decimais

                    resultadoParcial = parseFloat(checagemResultado)

                    break

                case '-':

                    if (resultSubtra > numerosDigitados) { //se o resultado da subtração for maior que o numero digitado

                        checagemResultado = parseFloat(resultSubtra) - parseFloat(numerosDigitados)

                        checkDecimals() // verificar se tem muitas casas decimais

                        resultadoParcial = parseFloat(checagemResultado)

                    } else if (resultSubtra < numerosDigitados) {//se o resultado da subtração for menor que o numero digitado

                        checagemResultado = parseFloat(numerosDigitados) - parseFloat(resultSubtra)
                        checagemResultado = parseFloat(checagemResultado) * -1  //transformação do número em negativo

                        checkDecimals() // verificar se tem muitas casas decimais

                        resultadoParcial = parseFloat(checagemResultado)

                    } else if (resultSubtra = numerosDigitados) {

                        checagemResultado = 0

                        checkDecimals() // verificar se tem muitas casas decimais

                        resultadoParcial = parseFloat(checagemResultado)

                    }

                    break

                case '/':

                    checagemResultado = parseFloat(resultDivisao) / parseFloat(numerosDigitados)

                    checkDecimals()

                    checkDivisao = checagemResultado // variavel para fazer a verificação de divisão inválida

                    if (verificarInfinity(checkDivisao)) { // se o numero for dividido por 0

                        resultadoParcial = `Can't divide by zero`

                    } else { // senão

                        resultadoParcial = parseFloat(checagemResultado)
                        checkDivisao = ''

                    }

                    validacaoEntradasDeDados() // verificação se o divisor é igual a 0

                    break

                case 'x':

                    checagemResultado = parseFloat(resultMultipli) * parseFloat(numerosDigitados)

                    checkDecimals() // verificar se tem muitas casas decimais

                    resultadoParcial = parseFloat(checagemResultado)

                    break

                case '%':

                    checagemResultado = resultPorcent * numerosDigitados / 100

                    checkDecimals() // verificar se tem muitas casas decimais

                    resultadoParcial = parseFloat(checagemResultado)

                    break
            }

        }
    }

    atualizarSecondDisplay() // chama a função de atualizar para, finalmente mostrar

}

function verificarInfinity(checks) { // verificação para saber se possui infinidade nos resultados

    let checksString = checks.toString()

    if (checksString == 'Infinity') { // caso dividido por numeros positivos

        return true

    } else if (checksString == '-Infinity') { //caso seja dividido por numeros negativos

        return true

    } else { // não foi dividido por zero

        return false

    }

}

let numerosDigitados = '' //armazena números digitados
let meuAmorChamadoZero = '' //armazena o valor de 0 para verificações

function verficandoMeuAmorzinho() { // função para evitar erros ao tentar dar incio a uma nova conta apos o resultador ser igual a zero

    if (resultadoParcial === 0) {

        meuAmorChamadoZero = 0

    } else {

        meuAmorChamadoZero = ''

    }

}


function addNumber(number) { // função de adicionar numeros

    verficandoMeuAmorzinho() // chama a função de verificação caso o resultado final seja 0

    if (resultadoFinal == "" && !verificarInfinity(checkDivisao) && meuAmorChamadoZero !== 0) { // verificação para evitar erros com o numero 0 e respostas inválidas

        reporStyles() //repôe estilos
        firstDisplay += number //adiciona o numero
        resultadoParcial += number //adiciona apenas o numero digitado ao segundo input
        numerosDigitados += number //coloca os numeros digitados dentro da variavel de armazenamento

        atualizarFirstDisplay()
        atualizarSecondDisplay()
        mostrarResultadoAntecipado()

        calculou = false // (recursividae) para validar

    } else if (!verificarInfinity(checkDivisao) && meuAmorChamadoZero == 0) { // verificação para quando digitar igual e o usuário queira digitar um novo numero diferente do resultado final

        reporStyles() //repôe estilos
        limparDisplay() // limpa tudo que estava nos inputs
        firstDisplay = number //adiciona o numero
        resultadoParcial += number //adiciona apenas o numero digitado ao segundo input
        numerosDigitados += number //coloca os numeros digitados dentro da variavel de armazenamento

        atualizarFirstDisplay()
        atualizarSecondDisplay()
        mostrarResultadoAntecipado()

        calculou = false

    } else if (resultadoFinal == `Can't divide by zero`) { // validação para caso o usuário divida por 0

        reporStyles() // (recursividade) repôe estilos
        limparDisplay() // limpa tudo que estava nos inputs

        firstDisplay += number //adiciona o numero
        resultadoParcial += number //adiciona apenas o numero digitado ao segundo input
        numerosDigitados += number //coloca os numeros digitados dentro da variavel de armazenamento

        atualizarFirstDisplay()
        atualizarSecondDisplay()
        mostrarResultadoAntecipado()

        calculou = false

    }

}

let pontoPresenteNoNumero = false // variável para validações

function adicionarDecimal() { // função para adcionar decimais

    if (pontoPresenteNoNumero == false) {// verificação se ja existe um ponto nos numeros digitados

        if (firstDisplay == '') { // caso o usuário digite um ponto de início

            firstDisplay += '0.'
            numerosDigitados = '0.'
            atualizarFirstDisplay()
            atualizarSecondDisplay()
            pontoPresenteNoNumero = true // bloqueando a adição de mais de um ponto

        } else if (calculou == false && !verificarInfinity(checkDivisao)) { // caso ja tenha numeros digitados

            firstDisplay += '.'
            numerosDigitados += '.'
            atualizarFirstDisplay()
            atualizarSecondDisplay()
            pontoPresenteNoNumero = true // bloqueando a adição de mais de um ponto

        } else if (calculou == true && resultadoFinal != '' && !verificarInfinity(checkDivisao)) { // para caso o usuário adicione ponto logo após apertar igual

            limparDisplay()
            atualizarFirstDisplay()
            atualizarSecondDisplay()
            adicionarDecimal()

        }  else if (calculou == true && resultadoFinal == '' && !verificarInfinity(checkDivisao)) { // para caso o usuário adicione ponto logo após mudar o sinal de operação da conta de forma continua

            firstDisplay += '.'
            numerosDigitados += '.'
            atualizarFirstDisplay()
            atualizarSecondDisplay()
            pontoPresenteNoNumero = true

        }
    }

}

let ultimoOperador = '' // armazema o operador antigo 
let operador = '' // armazena o operador digitado

/* adicionar um if, para caso o resultado parcial seja igual a can't divide by zero, ele não chamar a função */
function clicouOperador(op) {

    if (verificarResultAntecipado()) {

        let numeroAntesOp = 0 // numero presente antes do sinal atribuido

        operador = op // definindo o operador

        localStorage.setItem('operador', ultimoOperador) // armazena no local storage o ultimo operador utilizado

        if (numerosDigitados !== '' && !verificarInfinity(checkDivisao) && calculou == false) { // Enquanto a conta não for digitada igual

            reporStyles() // (Recursividade) repôe estilos

            pontoPresenteNoNumero = false //liberação da adição de um ponto

            if (operador == ultimoOperador || ultimoOperador == '') { // Enquanto o Operador For o MESMO

                switch (operador) {

                    case '+':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(numerosDigitados) //armazena os numeros antes do sinal, para limpar a array
                        somar.push(numeroAntesOp) //adiciona os números armazenados na array de soma
                        numerosDigitados = '' // limpa a variável


                        efetuarSoma() //vai efetuar a soma dos itens dentro da array Soma
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case '-':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(numerosDigitados) //armazena os numeros antes do sinal, para limpar a variável e receber novos números
                        diminuir.push(numeroAntesOp) //adiciona os números armazenados na array de diminuir
                        numerosDigitados = '' // limpa a variável


                        efetuarSubtracao() //vai efetuar a subtraçao dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case '/':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(numerosDigitados) //armazena os numeros antes do sinal, para limpar a variável e receber novos números
                        dividir.push(numeroAntesOp) //adiciona os números armazenados na array de dividir
                        numerosDigitados = '' // limpa a variável

                        efetuarDivisao() //vai efetuar a divisão dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case 'x':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(numerosDigitados) //armazena os numeros antes do sinal, limpa a variável e receber novos números
                        multiplicar.push(numeroAntesOp) //adiciona os números armazenados na array de multiplicar
                        numerosDigitados = '' // limpa a variável

                        efetuarMultiplicação() //vai efetuar a subtração dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case '%':

                        if (firstDisplay.indexOf('%') == -1) { // caso não tenha um operador antes

                            firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                            numeroAntesOp = parseFloat(numerosDigitados) //armazena os numeros antes do sinal, limpa a variável e receber novos números
                            porcentagem.push(numeroAntesOp) //adiciona os números armazenados na array de saber a porcentagem
                            numerosDigitados = '' // limpa a variável

                            efetuarPorcentagem() //vai efetuar a subtração dos itens dentro da array subtraçao
                            atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        }

                        break
                }

            } else if (operador !== ultimoOperador) { // quando o operador digitado for Diferente do Anterior

                calcularResultado() // (Recursividade) chama a função calcular resultado para finalizar a conta do operador antigo
                reporStyles() // (recursividade) repõe os estilos iniciais dos inputs

                firstDisplay = parseFloat(resultadoFinal) // armazena o resultado da antiga conta no primeiro input 
                resultadoFinal = '' // retira os valores do resultado final pois nao foi calculado nenhum igual
                pontoPresenteNoNumero = false //liberação da adição de um ponto

                switch (operador) {

                    case '+':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a array
                        somar.push(numeroAntesOp) //adiciona os números armazenados na array de soma
                        numerosDigitados = '' // limpa a variável

                        efetuarSoma() //vai efetuar a soma dos itens dentro da array Soma
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal         

                        break

                    case '-':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a variável e receber novos números
                        diminuir.push(numeroAntesOp) //adiciona os números armazenados na array de diminuir
                        numerosDigitados = '' // limpa a variável


                        efetuarSubtracao() //vai efetuar a subtraçao dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case '/':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a variável e receber novos números
                        dividir.push(numeroAntesOp) //adiciona os números armazenados na array de dividir
                        numerosDigitados = '' // limpa a variável

                        efetuarDivisao() //vai efetuar a divisão dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case 'x':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, limpa a variável e receber novos números
                        multiplicar.push(numeroAntesOp) //adiciona os números armazenados na array de multiplicar
                        numerosDigitados = '' // limpa a variável

                        efetuarMultiplicação() //vai efetuar a subtração dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case '%':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, limpa a variável e receber novos números
                        porcentagem.push(numeroAntesOp) //adiciona os números armazenados na array de saber a porcentagem
                        numerosDigitados = '' // limpa a variável

                        efetuarPorcentagem() //vai efetuar a subtração dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal         

                        break
                }

            }

        } else if (!verificarInfinity(checkDivisao)) { // pra caso depois de calcular o resultado o usuário queira dar seguinte com o resultado

            checkchanges() // chama a funçao para validar a recursividade com as mudanças de sinais

            if (numerosDigitados !== '' && calculou == true && mudarSinal == false) { //dando seguinte a conta depois de calcular o resultado, adicionando um sinal normal como de inicio

                limparArrays() // chama a funçao para validar a recursividade com as mudanças de sinais
                reporStyles() // repoe os estilos iniciais

                firstDisplay = parseFloat(resultadoFinal) //coloca o resultado final como primeiro display para fazer contas
                resultadoFinal = 0 // retira os valores do resultado final pois nao foi calculado nenhum igual
                pontoPresenteNoNumero = false //liberação da adição de um ponto

                switch (operador) {

                    case '+':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a array
                        somar.push(numeroAntesOp) //adiciona os números armazenados na array de soma
                        numerosDigitados = '' // limpa a variável


                        efetuarSoma() //vai efetuar a soma dos itens dentro da array Soma
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal    

                        break

                    case '-':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a variável e receber novos números
                        diminuir.push(numeroAntesOp) //adiciona os números armazenados na array de diminuir
                        numerosDigitados = '' // limpa a variável


                        efetuarSubtracao() //vai efetuar a subtraçao dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case '/':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a variável e receber novos números
                        dividir.push(numeroAntesOp) //adiciona os números armazenados na array de dividir
                        numerosDigitados = '' // limpa a variável

                        efetuarDivisao() //vai efetuar a divisão dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case 'x':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, limpa a variável e receber novos números
                        multiplicar.push(numeroAntesOp) //adiciona os números armazenados na array de multiplicar
                        numerosDigitados = '' // limpa a variável

                        efetuarMultiplicação() //vai efetuar a subtração dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case '%':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, limpa a variável e receber novos números
                        porcentagem.push(numeroAntesOp) //adiciona os números armazenados na array de saber a porcentagem
                        numerosDigitados = '' // limpa a variável

                        efetuarPorcentagem() //vai efetuar a subtração dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal         

                        break

                }

            } else if (mudarSinal == true  && resultadoFinal !== '') { // caso o usuário mude o sinal na execução simples

                checkchanges() // chama a funçao para validar a recursividade com as mudanças de sinais
                limparArrays() // limpa arrays pra n efetuar contas so alternando os operdores
                firstDisplay = parseFloat(atuaisContas)
                firstDisplay += operador
                pontoPresenteNoNumero = false //liberação da adição de um ponto

                switch (operador) {

                    case '+':

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a array
                        somar.push(numeroAntesOp) //adiciona os números armazenados na array de soma
                        numerosDigitados = '' // limpa a variável


                        efetuarSoma() //vai efetuar a soma dos itens dentro da array Soma
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal    

                        break

                    case '-':

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a variável e receber novos números
                        diminuir.push(numeroAntesOp) //adiciona os números armazenados na array de diminuir
                        numerosDigitados = '' // limpa a variável


                        efetuarSubtracao() //vai efetuar a subtraçao dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case '/':

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a variável e receber novos números
                        dividir.push(numeroAntesOp) //adiciona os números armazenados na array de dividir
                        numerosDigitados = '' // limpa a variável

                        efetuarDivisao() //vai efetuar a divisão dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case 'x':

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, limpa a variável e receber novos números
                        multiplicar.push(numeroAntesOp) //adiciona os números armazenados na array de multiplicar
                        numerosDigitados = '' // limpa a variável

                        efetuarMultiplicação() //vai efetuar a subtração dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case '%':

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, limpa a variável e receber novos números
                        porcentagem.push(numeroAntesOp) //adiciona os números armazenados na array de saber a porcentagem
                        numerosDigitados = '' // limpa a variável

                        efetuarPorcentagem() //vai efetuar a subtração dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal         

                        break

                }

                atualizarFirstDisplay()
                atualizarSecondDisplay()
                mostrarResultadoAntecipado()

            } else { // caso o usuário mude o sinal apos executar a igualdade da conta

                limparArrays() // faz a validação de recursividade
                reporStyles() // faz a validação de recursividade

                firstDisplay = parseFloat(atuaisContas) //coloca o resultado final como primeiro display para fazer contas

                pontoPresenteNoNumero = false //liberação da adição de um ponto

                switch (operador) {

                    case '+':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a array
                        somar.push(numeroAntesOp) //adiciona os números armazenados na array de soma


                        efetuarSoma() //vai efetuar a soma dos itens dentro da array Soma
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal    

                        break

                    case '-':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a variável e receber novos números
                        diminuir.push(numeroAntesOp) //adiciona os números armazenados na array de diminuir
                        numerosDigitados = '' // limpa a variável


                        efetuarSubtracao() //vai efetuar a subtraçao dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case '/':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, para limpar a variável e receber novos números
                        dividir.push(numeroAntesOp) //adiciona os números armazenados na array de dividir
                        numerosDigitados = '' // limpa a variável

                        efetuarDivisao() //vai efetuar a divisão dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case 'x':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, limpa a variável e receber novos números
                        multiplicar.push(numeroAntesOp) //adiciona os números armazenados na array de multiplicar
                        numerosDigitados = '' // limpa a variável

                        efetuarMultiplicação() //vai efetuar a subtração dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal

                        break

                    case '%':

                        firstDisplay += `${op}` //adicionando o operador em forma de string no primeiro display

                        numeroAntesOp = parseFloat(firstDisplay) //armazena os numeros antes do sinal, limpa a variável e receber novos números
                        porcentagem.push(numeroAntesOp) //adiciona os números armazenados na array de saber a porcentagem
                        numerosDigitados = '' // limpa a variável

                        efetuarPorcentagem() //vai efetuar a subtração dos itens dentro da array subtraçao
                        atualizarFirstDisplay() //vai atualizar o first display adicionando o sinal         

                        break

                }

                calculou = false // faz a validação de recursividade
                resultadoFinal = '' // faz a validação de recursividade
            }

        }

    } else { // encerra a função para não adicionar operadores invalidos

        return

    }
}

function verificarResultAntecipado() {

    if (resultadoParcial == "Can't divide by zero") {

        return false

    } else {

        return true

    }

}

let atuaisContas = 0 // armazena a resposta da ultima conta feita

let resultSoma = 0 // variavel para armazenar o resultado das somas
let somar = [] //array para efetuar somas

function efetuarSoma() { //efetuação da soma dos itens dentro da array e armazena o resultado na resultSoma

    let SomaInArray = 0 // variavel para armazenar o resultado da array

    for (var i = 0; i < somar.length; i++) { //loop para percorrer cada item da array de soma e soma-los
        SomaInArray += somar[i]
    }

    resultSoma = SomaInArray //armazenando os resultados

    ultimoOperador = '+' //define o ultimo operador utilizado
    atuaisContas = resultSoma // definindo a conta mais recente feita

}

let resultSubtra = 0 // variavel para armazenar o resultado das subtrações
let diminuir = [] //array para efetuar as subtrações

function efetuarSubtracao() { //efetuação da subtração dos itens dentro da array e armazena o resultado na resultSubtra

    let subtracaoInArray = 0 // variavel para armazenar o resultado da array

    subtracaoInArray = diminuir.reduce(function (a, b) { //metodo reduce percorre os itens dentro da array e subtrai ele
        return a - b
    })

    resultSubtra = subtracaoInArray //armazenando os resultados

    ultimoOperador = '-'//define o ultimo operador utilizado
    atuaisContas = resultSubtra // definindo a conta mais recente feita
}

let resultDivisao = 0 // variavel para armazenar o resultado das divisões
let dividir = [] //array para efetuar divisões

function efetuarDivisao() { // efetua a divisão dos itens dentro da array com os numeros digitados e armazena o valor na resultDivisão

    let divisaoInArray = 0 // variavel pra armazenar somente a divisão dentro da array

    divisaoInArray = dividir.reduce(function (a, b) {// metodo reduce percorre os itens na array e divide-os
        return a / b
    })

    resultDivisao = divisaoInArray //armazenando os resultados

    ultimoOperador = '/'//define o ultimo operador utilizado
    atuaisContas = resultDivisao // definindo a conta mais recente feita

}

let resultMultipli = 0 // variavel para armazenar o resultado das dvisões
let multiplicar = [] // array para efetuar multiplicações

function efetuarMultiplicação() { // efetua a multiplicação dos itens dentro da array multiplicar 

    let multiplicacaoInArray = 0 // variavel para armazenar o resultado da conta dentro da array

    multiplicacaoInArray = multiplicar.reduce(function (a, b) { // multiplicando os itens dentro da array

        return a * b

    })

    resultMultipli = multiplicacaoInArray //armazenando os resultados

    ultimoOperador = 'x'//define o ultimo operador utilizado
    atuaisContas = resultMultipli // definindo a conta mais recente feita

}

let resultPorcent = 0 // variavel para armazenar o resultado das porcentagens
let porcentagem = []

function efetuarPorcentagem() { // efetua o calculo da porcentagem

    let porcentagemInArray = 0 // variável para armazenar o resultado da soma dos itens dentro da array porcentagem

    porcentagemInArray = porcentagem.reduce(function (a, b) { // soma os itens dentro da array porcentagem
        return a + b
    })

    resultPorcent = porcentagemInArray //armazenando os resultados

    ultimoOperador = '%'//define o ultimo operador utilizado
    atuaisContas = resultPorcent // definindo a conta mais recente feita

}

let calculou = false
function calcularResultado() { //quando o usuário apertou igual

    inverterStyles() // inverte os estilos dos inputs
    pontoPresenteNoNumero = false

    if (verificarInfinity(checkDivisao)) {

        resultadoFinal = resultadoParcial
        operador = ''

        limparArrays()
        limparStorage()
        calculou = true

    } else {

        resultadoFinal = resultadoParcial
        ultimoOperador = ''
        limparArrays()
        limparStorage()

        calculou = true
    }


}

let deletou = false

function deletarLetter() { //quando o usuário acionar o botão de backspace

    if(verificarUltimaLetra(firstDisplay, '.')){

        deletLastCaractere()
        pontoPresenteNoNumero = false

    } else if (verificarUltimaLetra(firstDisplay, operador) || calculou === true) { // quando o ultima letra é igual ao operador ou o usuário digitou a conta

        return; // parar função

    } else if (!verificarUltimaLetra(firstDisplay, operador) && resultadoParcial == "Can't divide by zero") { //para quando dividir por zero o usuário consiga apagar o zero antes de apertar igual

        checkDels() // fazer as alterações válidas

    } else if (resultadoParcial !== "Can't divide by zero" && !verificarInfinity(checkDivisao)) { // quando a operação nao for divida por zero

        deletLastCaractere()

    }

}


function deletLastCaractere(){ // deletar numeros

    firstDisplay = firstDisplay.slice(0, -1)
    resultadoParcial = secondDisplay.slice(0, -1)
    numerosDigitados = numerosDigitados.slice(0, -1)
    deletou = true
    checkDels() // fazer as alterações válidas
    checkDisplays() // verificar e preencher os displays
    mostrarResultadoAntecipado() /* atualizar os displays*/
    atualizarFirstDisplay()
    atualizarSecondDisplay()

}

function verificarUltimaLetra(string, letra) { // verificação se a ultima letra do input é um operador

    const ultimaletra = string.slice(-1);
    return ultimaletra === letra

}

function checkDels() { //função para verificar o que foi deletado


    if (calculou == true) {

        return;

    } else {

        if (deletou == true && operador == '') {

            secondInput.value = '= ' + firstDisplay
            checkDisplays()

        } else if (resultadoParcial == "Can't divide by zero") {

            checkDivisao = ''
            deletLastCaractere()

        } else if (deletou == true && operador == '' && firstInput.value.length == 0) {

            secondInput.value = ''
            checkDisplays()

        } else if (verificarUltimaLetra(firstDisplay, operador)) {

            resultadoParcial = atuaisContas

            checagemResultado = atuaisContas

        }

    }


}

function checkDecimals() { //verifica se o numero real é muito grande e limita-o

    contarDecimais(checagemResultado)
    

    if (comprimentoDecimal > 8) {

        checagemResultado = checagemResultado.toFixed(8)

    } else {

        return

    }


}

let comprimentoDecimal = 0
function contarDecimais(number) { // contagem de quantos numeros decimais ha depois da virgula

    let numberString = number.toString()

    let posicaoDecimal = numberString.indexOf('.')

    if (posicaoDecimal === -1) {

        return 0

    }

    comprimentoDecimal = numberString.length - posicaoDecimal - 1

    return comprimentoDecimal


}

function checkDisplays() { //quando o usuário entrar na página ou limpar o input

    if (secondInput.value == '') { //verifica se o segundo input está vazio e coloca um zero 

        secondInput.value = 0

    } else if (firstInput.value == '') { //verifica se o primeiro input está vazio e coloca um zero

        secondInput.value = 0

    }

}

checkDisplays() //verifica quando o documento carrega, para prencher corretamente o secondDislay

let mudarSinal = true
function checkchanges() {

    if (calculou == true) {

        mudarSinal = false

    } else {

        mudarSinal = true

    }

}

function limparDisplay() { // quando o usuário clicar em clean

    resultadoParcial = ''
    resultadoFinal = ''
    numerosDigitados = ''
    checagemResultado = 0
    checkDivisao = ''
    atuaisContas = 0

    operador = ''
    numeroAntesOp = 0
    pontoPresenteNoNumero = false
    calculou = false

    firstDisplay = ''
    secondDisplay = ''
    firstInput.value = ''
    secondInput.value = ''

    checkDisplays() // chama a função de checagem de preenchimento dos displays
    reporStyles() // repoe os estilos iniciais
    limparArrays() // limpa todas as arrays de armazenamento
    limparStorage() // limpa os dados armazenados no localSotarage
}

function limparStorage() { // função para limpar o localStorage do usuário

    localStorage.removeItem(operador)
    ultimoOperador = ''

}

limparStorage()

function inverterStyles() { // add estilos quando apertar igual

    firstInput.classList.add('segundo')
    firstInput.classList.remove('primeiro')

    secondInput.classList.add('primeiro')
    secondInput.classList.remove('segundo')


}

function reporStyles() { // repoe os estilos iniciais

    firstInput.classList.add('primeiro')
    firstInput.classList.remove('segundo')

    secondInput.classList.add('segundo')
    secondInput.classList.remove('primeiro')

}

function limparArrays() { // limpa as arrays com resultados 

    dividir = []
    multiplicar = []
    porcentagem = []
    somar = []
    diminuir = []

}

function tst(inputValue) {
    firstInput.value = inputValue
    atualizarFirstDisplay()
    atualizarSecondDisplay()
    mostrarResultadoAntecipado()
}
