const contactIcon = document.querySelector('#div-icon-contact')
const shareIcon = document.querySelector('#div-icon-share');
const menuShare = document.querySelector('#menu-share')
const menuContact = document.querySelector('#menu-contact')
const menu = document.querySelector('#content-share')

//controle do Menu Share
shareIcon.onclick = () => { //ativar e desativar menu com clique

    if (menuShare.classList.contains('menu-off') || menuShare.classList.contains('recolhendo') || menuContact.classList.contains('exibindoTw')) {

        menuShare.classList.remove('recolhendo')
        menuShare.classList.remove('menu-off')
        menuShare.classList.add('exibindo')

        menuContact.classList.remove('exibindoTw')
        menuContact.classList.add('recolhendoTw')

    } else if (menuShare.classList.contains('exibindo')) {

        menuShare.classList.remove('exibindo')
        menuShare.classList.add('recolhendo')

    }

}

xMenu.onclick = () => { //ocultar menu pelo X

    menuShare.classList.remove('exibindo')
    menuShare.classList.add('recolhendo')

}

copyLinkIcon.onclick = () => { // Usando a API de área de transferência para copiar o texto

    // Texto que você deseja copiar
    const textoCopiar = 'https://ezequiellsantos.github.io/JavaScript/desafios/d015/';

    // Criando um elemento oculto para copiar
    const input = document.createElement('input');
    input.value = textoCopiar;
    document.body.appendChild(input);

    // Selecionando e copiando o texto
    input.select();
    input.setSelectionRange(0, 99999); // Para dispositivos móveis
    document.execCommand('copy');

    // Removendo o elemento de texto oculto
    document.body.removeChild(input);

    copyLinkIcon.innerHTML = 'Copiado'
    copyLinkIcon.classList.add('copyed')

}

//controle do menu contact
contactIcon.onclick = () => {
    if (menuContact.classList.contains('menu-off') || menuContact.classList.contains('recolhendoTw') || menuShare.classList.contains('exibindo')) {

        menuContact.classList.remove('menu-off')
        menuContact.classList.remove('recolhendoTw')
        menuContact.classList.add('exibindoTw')

        menuShare.classList.remove('exibindo')
        menuShare.classList.add('recolhendo')

    } else if (menuContact.classList.contains('exibindoTw')) {

        menuContact.classList.remove('exibindoTw')
        menuContact.classList.add('recolhendoTw')

    }
}

kMenu.onclick = () => {
    menuContact.classList.add('recolhendoTw')
    menuContact.classList.remove('exibindoTw')
}

var date = new Date() //coleta de data em dias, mês e ano

let day = date.getDay()
let dayMonth = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()
let intervaloRelogio;

switch (day) {

    case 0:
        day = "Domingo"
        break

    case 1:
        day = "Segunda-Feira"
        break

    case 2:
        day = "Terça-Feira"
        break

    case 3:
        day = "Quarta-Feira"
        break

    case 4:
        day = "Quinta-Feira"
        break

    case 5:
        day = "Sexta-Feira"
        break

    case 6:
        day = "Sábado"
        break

    default:
        window.alert("ERROR => day")
        break

}

switch (month) {

    case 0:
        month = "Jan"
        break

    case 1:
        month = "Fev"
        break

    case 2:
        month = "Mar"
        break

    case 3:
        month = "Abr"
        break

    case 4:
        month = "Mai"
        break

    case 5:
        month = "Jun"
        break

    case 6:
        month = "Jul"
        break

    case 7:
        month = "Ago"
        break

    case 8:
        month = "Set"
        break

    case 9:
        month = "Out"
        break

    case 10:
        month = "Nov"
        break

    case 11:
        month = "Dez"
        break
}

document.getElementById("date").innerHTML = `<p>${day} ${dayMonth} de ${month} ${year}</p>`


function atualizarRelogio() { //exibição do relógio com horas, minutos e segundos

    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    hora.innerHTML = `<p>${hour} : ${minutes} : <p id="p-fixo">${seconds}</p> </p>`;

}

 /* 

    configurações para otimização da página e evitar lentidão e excesso de memória utilizada
    pelo navegador 
    
*/

function iniciarRelogio() {

    intervaloRelogio = setInterval(atualizarRelogio, 1000); //atualização automática do relógio
    atualizarRelogio();

}

function pararRelogio() {

    clearInterval(intervaloRelogio);

}

/* 

    verificação para identificar se 
    o usuário está ou não na página

*/

function pageVisibility() {

    if (document.hidden) {

        pararRelogio();

    } else {

        iniciarRelogio();
        // titulo.innerHTML = 'Direct by Kiel'

    }

}

document.addEventListener('visibilitychange', pageVisibility)

window.addEventListener('blur', function () { // quando o usuário sai da página

    pararRelogio();
    // titulo.innerHTML = 'Direct by Kiel :('

})

window.addEventListener('focus', function () { //quando a aba ganha foco

    iniciarRelogio();

})

iniciarRelogio();

window.addEventListener('beforeunload', function () { //parar o relógio quando o user mudar de página ou minimizar

    pararRelogio();

})

/* 

    Gerenciamento do Tema do site

*/

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

    }


});

/* 

    Checagem de conteúdo, para atribuir ou retirar 
    o carregamento de conteúdo

*/

var contain = document.querySelectorAll('section-of-weather');
var grupo = document.querySelectorAll('.p-infor-weather');
var weatherWidget = document.querySelectorAll('#aside-weather');

function limparSkeleton() {

    grupo.forEach(function (grupo) { // Verifica se o grupo possui algum elemento filho e se possuir remove o skeleton
        if (grupo.hasChildNodes()) {

            grupo.classList.remove('skeleton')

        } else {

            grupo.classList.add('skeleton')

        }
    })

}

// controle do widget de clima

const key = 'adbe00f238877e96d2b64a528c71ebb2'

function limparSearch() { // limpar input

    nomeCidade.value = ''

}

botaoBusca.onclick = () => { // efetuar busca por clique no botao

    buscarCidade(nomeCidade.value)
    limparSearch()

}

nomeCidade.addEventListener("keydown", function (event) { // efetuar busca por tecla enter no input

    if (event.keyCode === 13) {

        buscarCidade(nomeCidade.value)
        limparSearch()

    }

})

async function buscarCidade(cidade) { // chamada de api e conversão dos seus dados para .json

    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json())

    consumirDados(dados)
    limparSkeleton()

}

function consumirDados(dados) {

    if (dados.cod == '404' || dados.cod == '400') { // verifcação de mensagens de erros

        inputError()

    } else { // preenchimento dos dados no front

        infoCidade.innerHTML = dados.name
        grauCelsius.innerHTML = dados.main.temp.toFixed(0) + "°C"
        infoClima.innerHTML = `<img id="img-weather" src="https://raw.githubusercontent.com/EzequiellSantos/JavaScript/main/desafios/d015/Imagens/icons-weather/${dados.weather[0].icon}.png">` + dados.weather[0].description
        umidade.innerHTML = 'umidade: ' + dados.main.humidity + '%'

        /* https://openweathermap.org/img/wn/${dados.weather[0].icon}.png */

        limparSkeleton()
        
    }

}

function inputError() { // erro ao digitar o nome errado | bucar cidade sem digitar nada

    infoCidade.innerHTML = 'Não Encontrado'
    grauCelsius.innerHTML = ''
    infoClima.innerHTML = ''
    umidade.innerHTML = ''

    limparSkeleton()

}

function exibirGradient(dados){

    var cor = dados.weather[0].icon;

    switch (cor){

        case "01d": 
            cor = "#7e7500, #7e6102"
            break

        case "01n":
            cor = "#433966"
            break

        case "02d":
            cor = "#999453"
            break

        case "02n":
            cor = "#716699"
            break

        case "03d":
            cor = '#9e9e9e'
            break

        case "03n":
            cor = '#8e849e'
            break

        case "04d":
            cor = '#6b6b6b' //clarear mais no tema claro
            break

        case "04n":
            cor = '#5b5a6d'
            break

        case "09d":
            cor = '#161d24'
            break

        case "09n":
            cor = '#6b7aac'
            break

        case "10d":
            cor = '#17456b'
            break

        case "10n":
            cor = '#202f63'
            break

        case "11d":
            cor = '#003249'
            break

        case "11n":
            cor = '#12032b77'
            break

        case "13d":
            cor = '#a1c0ce'
            break

        case "13n":
            cor = '#a1a6ce'
            break

        case "50d":
            cor = '#9faeb3'
            break

        case "50n":
            cor = '#a7a4b8'
            break

    }

    /* Possíveis configurações de adequação de background-color do widget de clima */

    var asideGradient = document.getElementById('icon-background');

    if(localStorage.getItem('tema-preferido') == "dark"){

        asideGradient.style.backgroundImage = `linear-gradient(to bottom, var(--color-background01)55%, ${cor})`

    }else if(localStorage.getItem('tema-preferido') == "light"){

        asideGradient.style.backgroundImage = `linear-gradient(to bottom, var(--color-background03)55%, ${cor})`

    }

}

var link = document.getElementById('linkInstagram')

if(window.innerWidth >= 772){

    link.href = 'https://www.instagram.com/ezequiellsantos.z/'

} else{

    link.href = 'instagram://user?username=ezequiellsantos.z'

}