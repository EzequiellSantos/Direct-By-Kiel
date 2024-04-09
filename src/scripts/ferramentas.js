function adequarImagens(tema) {// adequa as imagens ao tema

    toBack.src = `Imagens/icons-Direct/toHome-${tema}-96.png`

}

var item = document.getElementById('header-icon-x')

function clicou() {
    item.style.animation = ''
    item.style.animation = 'click 7s ease-in-out'

    setInterval(limpar, 7000)
}

function limpar() {
    item.style.animation = ''
    item.style.animation = 'rotate 7s infinite ease-in-out'
}

limpar()
