function adequarImagens(tema) {// adequa as imagens ao tema

  toBack.src = `Imagens/icons-Direct/toHome-${tema}-96.png`
  toUp.src = `./Imagens/icons-Direct/toUp-${tema}-96.png`

}

window.addEventListener('scroll', function() { // função para esconder ou mostrar o header

    var elementoSticky = document.getElementById('eloquio-header');
    var scrollTop = window.scrollY;
  
    if (scrollTop > 40) {  // verificando o quanto ja foi rolado a página para baixo

      elementoSticky.classList.add('oculto'); // deixar o header iculto

    } else {

      elementoSticky.classList.remove('oculto'); // mostra o header

    }


    var rolarParaCima = this.document.getElementById('toTop')
    rolarParaCima.style.opacity = this.window.scrollY > 1200 ? '1' : '0'

});

toTop.onclick = () => { // funçãi para quando clicar no botao, levar o usuário para o topo da página

    window.scrollTo({
        top: 100,
        behavior: 'smooth'
    })

}