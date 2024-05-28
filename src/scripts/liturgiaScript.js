function adequarImagens(tema) {// adequa as imagens ao tema

    toBack.src = `Imagens/icons-Direct/toHome-${tema}-96.png`

}

var itensLi = document.querySelectorAll('#menuLeituras li')
var background = document.getElementById('background')
var itemVar = ''

itensLi.forEach((item) => {

    document.addEventListener('DOMContentLoaded', () => {

        menuBackgroundInitial(liFirstReading)

    })

    item.addEventListener('click', () => {

        itemVar = item
        menuBackground(item)

    })

})

function menuBackground(item) {

    let initiaLeft = background.offsetLeft

    background.style.left = initiaLeft < item.offsetLeft ? item.offsetLeft + 10 + 'px' : item.offsetLeft - 10 + 'px'
    background.style.width = item.offsetWidth * 1.08 + 'px'
    setTimeout(menuBackgroundDelay, 450)

}

function menuBackgroundDelay() {

    background.style.left = itemVar.offsetLeft * 0.99 + 'px'

}

function menuBackgroundInitial(liFirstReading) {

    background.style.width = liFirstReading.offsetWidth + 'px'
    background.style.left = liFirstReading.offsetLeft + 'px'

}

const url = 'https://liturgiadiaria.site/'

fetch(url)
    .then(response => response.json())
    .then(data => {
        coletarLeiturasAPI(data)
        menuBackgroundInitial(liFirstReading)
        exibirLoad()

        console.log(data.evangelho.texto);
    })
    .catch(error => {
        console.error('Erro ao com a API; ', error);
    })

var textos = {
    leituras: {
        salmos: '',
        firstLi: '',
        secondli: '',
        evangelho: ''
    },
    titulos: {
        dayTitle: '',
        data: '',
        evangelhoTitle: '',
        firstLiTitle: '',
        secondliTitle: '',
        salmosTitle:'',
        
    },
    referencias: {
        evangelhoRef: '',
        firstLiRef: '',
        secondliRef: '',
        salmosRef:'',
    }
}

function coletarLeiturasAPI(dados) {

    date.innerHTML = dados.data

    tempoLiturgico.innerHTML = dados.liturgia

    // first reading
    textos.leituras.firstLi = dados.primeiraLeitura.texto
    textos.titulos.firstLiTitle = dados.primeiraLeitura.titulos
    textos.referencias.firstLiRef = dados.primeiraLeitura.referencia

    // salmos
    textos.leituras.salmos = dados.salmo.texto

    // second reading
    if (dados.segundaLeitura != 'Não há segunda leitura hoje!') {

        liSecondReading.style.display = 'block'
        textos.leituras.secondli = dados.segundaLeitura.texto

    } else {

        ocultarSecondReading()
        console.log('não ha segunda leitura');

    }

    // gospel
    textos.leituras.evangelho = dados.evangelho.texto

    // create first reading
    gerarPrimeiraLeitura()

    liFirstReading.textContent = '1° Leitura'
    liSalmos.textContent = 'Salmos'
    liSecondReading.textContent = '2° Leitura'
    liEvangelho.textContent = 'Evangelho'

}

var containerTexto = document.getElementById('texto')

var liSecondReading = document.getElementById('liTwoLeitura')
liSecondReading.onclick = () => {

    containerTexto.innerHTML = textos.leituras.secondli

}

var liSalmos = document.getElementById('Salmos')
liSalmos.onclick = () => {

    containerTexto.innerHTML = textos.leituras.salmos

}

var liEvangelho = document.getElementById('liEvangelho')
liEvangelho.onclick = () => {

    containerTexto.innerHTML = textos.leituras.evangelho

}

var liFirstReading = document.getElementById('liOneLeitura')
liFirstReading.onclick = () => {

    gerarPrimeiraLeitura()

}

function gerarPrimeiraLeitura() {

    containerTexto.innerHTML = textos.leituras.firstLi

}

function ocultarSecondReading() {

    liSecondReading.style.display = 'none'

}

var contain = document.getElementById('container')
var texto = document.getElementById('texto')
var loader = document.querySelectorAll('#child')

function exibirLoad(){

    if(texto.hasChildNodes()){

        contain.classList.remove('loader')

    }else{

        contain.classList.add('loader')

    }

}
exibirLoad()

window.addEventListener('scroll', function(){
    var elemento = this.document.getElementById('liturgia-header')
    var scrollTop = this.window.scrollY

    if(scrollTop > 30){

        elemento.style.opacity = '0'

    } else{

        elemento.style.opacity = '1'

    }

})