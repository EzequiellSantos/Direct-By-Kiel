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

var data = new Date() 
var dia = data.getDay()
var mes = data.getMonth()
var ano = data.getFullYear()

const url = `https://liturgia.up.railway.app/`

fetch(url)
    .then(response => response.json())
    .then(data => {
        coletarLeiturasAPI(data)
        menuBackgroundInitial(liFirstReading)
        exibirLoad()
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
        salmosRefrao:'',
        
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
    textos.titulos.firstLiTitle = dados.primeiraLeitura.titulo
    textos.referencias.firstLiRef = dados.primeiraLeitura.referencia

    // salmos
    textos.leituras.salmos = dados.salmo.texto
    textos.titulos.salmosRefrao = dados.salmo.refrao
    textos.referencias.salmosRef = dados.salmo.referencia

    // second reading
    if (dados.segundaLeitura != 'Não há segunda leitura hoje!') {

        liSecondReading.style.display = 'block'
        textos.leituras.secondli = dados.segundaLeitura.texto
        textos.titulos.secondliTitle = dados.segundaLeitura.titulo
        textos.referencias.secondliRef = dados.segundaLeitura.referencia

    } else {

        ocultarSecondReading()
        console.log('não ha segunda leitura');

    }

    // gospel
    textos.leituras.evangelho = dados.evangelho.texto
    textos.titulos.evangelhoTitle = dados.evangelho.titulo
    textos.referencias.evangelhoRef = dados.evangelho.referencia

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

    containerTexto.innerHTML = containerTexto.innerHTML = `
    <h3><strong>Segunda Leitura (${textos.referencias.secondliRef})</strong></h2>
    <p>${textos.titulos.secondliTitle}</p>
    <p>${textos.leituras.secondli}</p>
    <p>- Palavra do Senhor.</p>
    <p><strong>- Graças a Deus.</strong></p>`

}

var liSalmos = document.getElementById('Salmos')
liSalmos.onclick = () => {

    let textoModificado = textos.leituras.salmos.replaceAll("—", "<br><br>—")

    containerTexto.innerHTML = `
    <h3>Responsório ${textos.referencias.salmosRef}</h3>
    <p>— ${textos.titulos.salmosRefrao}</p>
    <p>— <strong>${textos.titulos.salmosRefrao}</strong> ${textoModificado}</p>`

}

var liEvangelho = document.getElementById('liEvangelho')
liEvangelho.onclick = () => {

    containerTexto.innerHTML = containerTexto.innerHTML = `
    <h3>Evangelho (${textos.referencias.evangelhoRef})</h3>
    <p>${textos.titulos.evangelhoTitle}</p>
    <p><strong>- Glória a vós Senhor</strong></p>
    <p>${textos.leituras.evangelho}</p>
    <p>- Palavra da Salvação.</p>
    <p><strong>- Glória a vós, Senhor.</strong></p>`


}

var liFirstReading = document.getElementById('liOneLeitura')
liFirstReading.onclick = () => {

    gerarPrimeiraLeitura()

}

function gerarPrimeiraLeitura() {

    containerTexto.innerHTML = containerTexto.innerHTML = `
    <h3><strong>Primeira Leitura (${textos.referencias.firstLiRef})</strong></h3>
    <p>${textos.titulos.firstLiTitle}</p>
    <p>${textos.leituras.firstLi}</p>
    <p>- Palavra do Senhor.</p>
    <p><strong>- Graças a Deus.</strong></p>`


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